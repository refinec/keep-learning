import tushare as ts
import baostock as bs
import pandas as pd
import re
import json
import time

from utils.mysqlConnect import sqlEngine, sessionmaker, declarative_base, automap_base, Column, Integer, FLOAT, String, \
    Text
from utils.MACDCalculate import EMA, DIFF, DEA, MACD
from baostockAPI.index import bs_history_k_data, bs_last_history_k_data
from tushareProAPI.index import get_all_stock, stk_factor

# from tushareAPI.index import

Base = declarative_base(sqlEngine)  # SQLORM基类
# 反射存在的表
MapBase = automap_base()
MapBase.prepare(sqlEngine, reflect=True)


def download_all_stock(table_name="all_stock", exist_type="replace"):
    """
    下载所有上市股票
    :param table_name:
    :param exist_type:
    :return:
    """
    all_stock = get_all_stock()
    all_stock.to_sql(table_name, sqlEngine, if_exists=exist_type)  # 如果表名已存在的处理方式:fail, replace, append


def download_history_k_data(session=None):
    """
    下载所有股票的历史行情
    :param session:
    :return:
    """
    if session:
        compiler = re.compile(r"[a-zA-Z]+")
        row = session.execute("SELECT ts_code, symbol FROM all_stock WHERE market = '主板'")
        # result = pd.DataFrame(row)
        # result.to_csv("./tt.csv", encoding="gbk", index=False)

        row = list(row)
        # rows = row[row.index(('001270.SZ', '001270')):]
        # print(rows)
        bs.login()
        for r in row:
            print("当前下载==>", r)
            bs_history_k_data(num_name=r[1],
                              stock=compiler.findall(r[0])[0].lower() + "." + r[1],
                              start_date="1970-12-19",
                              end_date="")
        bs.logout()


def download_today_history_k_data(session=None):
    """
    下载股票当天的行情
    :return:
    """
    if session:
        row = session.execute("SELECT ts_code, symbol FROM all_stock WHERE market = '主板'")
        compiler = re.compile(r"[a-zA-Z]+")
        last_date = time.strftime('%Y-%m-%d', time.gmtime())
        # last_date = "2022-07-05"
        row = list(row)
        bs.login()
        for r in row:  # row[row.index(('600606.SH', '600606')):]
            print(f"下载股票{last_date}的行情==>", r)
            bs_last_history_k_data(num_name=r[1], stock=compiler.findall(r[0])[0].lower() + "." + r[1],
                                   last_date=last_date)
        bs.logout()


def cal_all_main_board_factor(session):
    """
    计算所有股票的 MACD 指标
    :param session:
    :return:
    """
    row = session.execute("SELECT ts_code, symbol, name, area, industry, market FROM all_stock WHERE market = '主板'")
    row = list(row.fetchall())
    # print(row[469:])
    # print(row.index(('001270.SZ', '001270')))
    for r in row:
        factor_list = []
        tablename = r[1] + '_factor'

        class Factor(Base):
            __tablename__ = tablename
            index = Column(Integer, primary_key=True, autoincrement=True)
            date = Column(String(50))
            name = Column(String(100))
            code = Column(String(50))
            area = Column(String(20))
            industry = Column(String(50))
            market = Column(String(15))
            close = Column(FLOAT)
            preclose = Column(FLOAT)
            isST = Column(Integer)
            EMA12 = Column(FLOAT)
            EMA26 = Column(FLOAT)
            DIFF = Column(FLOAT)
            DEA = Column(FLOAT)
            MACD = Column(FLOAT)

        Base.metadata.create_all()  # 将模型映射到数据库中

        his = session.execute(f"SELECT date, code, close, preclose, isST FROM {r[1]}_history")
        his = list(his)
        if len(his) == 0:
            continue
        # 上市第一天EMA为第一天收盘价
        factor_list.append(Factor(date=his[0][0],
                                  name=r[2],
                                  code=his[0][1],
                                  area=r[3],
                                  industry=r[4],
                                  market=r[5],
                                  close=his[0][2],
                                  preclose=his[0][3],
                                  isST=his[0][4],
                                  EMA12=his[0][2],
                                  EMA26=his[0][2],
                                  DIFF=0,
                                  DEA=0,
                                  MACD=0)
                           )
        EMA12 = float(his[0][2])
        EMA26 = float(his[0][2])
        dea = 0
        for h in his[1:]:
            EMA12 = EMA(12, float(h[2]), EMA12)
            EMA26 = EMA(26, float(h[2]), EMA26)
            DIF = DIFF(EMA12, EMA26)
            dea = DEA(dea, DIF)
            macd = MACD(DIF, dea)
            factor_list.append(
                Factor(date=h[0],
                       name=r[2],
                       code=h[1],
                       area=r[3],
                       industry=r[4],
                       market=r[5],
                       close=h[2],
                       preclose=h[3],
                       isST=h[4],
                       EMA12=EMA12,
                       EMA26=EMA26,
                       DIFF=DIF,
                       DEA=dea,
                       MACD=macd
                       )
            )
        session.add_all(factor_list)
        session.commit()  # 提交到数据库
        print(r[1])


def cal_today_main_board_factor(session):
    '''
    计算所有股票当天的 MACD 指标
    :param session:
    :return:
    '''
    row = session.execute("SELECT ts_code, symbol, name, area, industry, market FROM all_stock WHERE market = '主板'")
    row = list(row.fetchall())
    # print(row[337:])
    # print(row.index(('000584.SZ', '000584')))
    for r in row:
        # yesterday = "'2022-07-01'"  # 上一个交易日
        today = f"'{time.strftime('%Y-%m-%d', time.gmtime())}'"  # 今天
        # today = "'2022-07-05'"

        factor = session.execute(
            f"SELECT date, code, close, preclose, EMA12, EMA26, DIFF, DEA, MACD FROM {r[1]}_factor order by date desc limit 1")
        fac = list(factor)

        his = session.execute(f"SELECT date, code, close, preclose, isST FROM {r[1]}_history WHERE date={today}")  # 今天
        his = list(his)

        if len(his) == 1 and len(fac) == 0:  # 新上市股票
            tablename = r[1] + '_factor'
            # 反射得到orm
            mapTable = MapBase.classes[tablename]
            his = his[0]
            h = mapTable(date=his[0],
                         name=r[2],
                         code=his[1],
                         area=r[3],
                         industry=r[4],
                         market=r[5],
                         close=his[2],
                         preclose=his[3],
                         isST=his[4],
                         EMA12=his[2],
                         EMA26=his[2],
                         DIFF=0,
                         DEA=0,
                         MACD=0
                         )
            session.add(h)
            session.commit()  # 提交到数据库
            print("新上市股票>>", r[1])
            continue
        if len(his) > 0 and len(fac) > 0:
            tablename = r[1] + '_factor'
            # 反射得到orm
            mapTable = MapBase.classes[tablename]

            fac = fac[0]
            EMA12 = float(fac[4])
            EMA26 = float(fac[5])
            dea = float(fac[7])

            his = his[0]
            EMA12 = EMA(12, float(his[2]), EMA12)
            EMA26 = EMA(26, float(his[2]), EMA26)
            DIF = DIFF(EMA12, EMA26)
            dea = DEA(dea, DIF)
            macd = MACD(DIF, dea)

            h = mapTable(date=his[0],
                         name=r[2],
                         code=his[1],
                         area=r[3],
                         industry=r[4],
                         market=r[5],
                         close=his[2],
                         preclose=his[3],
                         isST=his[4],
                         EMA12=EMA12,
                         EMA26=EMA26,
                         DIFF=DIF,
                         DEA=dea,
                         MACD=macd
                         )
            session.add(h)
            session.commit()  # 提交到数据库
            print(r[1])
        # break
        pass


def search_macd(session):
    result = []
    stock = session.execute("SELECT ts_code, symbol FROM all_stock WHERE market = '主板'")
    # today = f"'{time.strftime('%Y-%m-%d', time.gmtime())}'"  # 今天
    # today = "'2022-06-06'"
    for s in stock:
        # isST = list(session.execute(f"SELECT isST FROM {s[1]}_history WHERE date={today}"))
        # if len(isST) == 0 or (len(isST) > 0 and isST[0][0] == '1'):
        #     continue

        hen_s = hen_stock(s, 30)
        if hen_s:
            result.append(hen_s)

        """
        row = session.execute(f"SELECT date, name, code, area, industry, market, close, isST, DIFF, DEA, MACD FROM {s[1]}_factor order by date desc limit 3;")
        fac = list(row)
        if len(fac) < 3:  # 排除新上市
            continue
        if fac[0][7] == 1:  # 排除退市风险
            continue
        if fac[0][6] < 5:  # 排除股票价格低于5元
            continue
        
        first = {'code': fac[0][2], 'dif': fac[0][8], 'dea': fac[0][9], 'macd': fac[0][10], 'price': fac[0][6]}
        second = {'dif': fac[1][8], 'dea': fac[1][9], 'macd': fac[1][10]}
        third = {'dif': fac[2][8], 'dea': fac[2][9], 'macd': fac[2][10]}
        if third['dif'] > 0 and first['dif'] > first['dea'] and third['dif'] > second['dif'] and second['dif'] > first['dif']:
            continue
        if third['dif'] < 0 and first['dif'] < first['dea'] and third['dif'] > second['dif'] and second['dif'] > first['dif']:
            continue
        if 0.08 >= abs(first['dif'] - first['dea']) and first['dif'] > -0.02:
            print("code=", first['code'], "dif=", first['dif'], "dea=", first['dea'], "macd=", first['macd'])
            d = {
                'key': s[1],
                'name': fac[0][1],
                'area': fac[0][3],
                'industry': fac[0][4],
                'market': fac[0][5],
                'url': "https://xueqiu.com/S/" + re.sub(f'\W', '', first['code'], 1).upper(),
                'price': first['price']
            }
            result.append(d)
        """
        # isHengPan = 0
        # total = 0
        # for average in fac:
        #     total = total + average[7]
        # average = round(total / len(fac), 2)
        # for m in fac:
        #     code = m[2]
        #     dif = m[7]
        #     dea = m[8]
        #     macd = m[9]

        # if macd >= 0:
        #     print("code=", code, "dif=", dif, "dea=", dea, "macd=", macd)
        #     result.append("https://xueqiu.com/S/" + re.sub(f'\W', '', code, 1).upper())
        # if 0.1 >= macd and macd >= -0.1:
        #     print("code=", code, "dif=", dif, "dea=", dea, "macd=", macd)
        #     result.append("https://xueqiu.com/S/" + re.sub(f'\W', '', code, 1).upper())
        # if dif >= 0 and 0.1 >= abs(dif - dea) and 0.08 >= abs(macd):
        #     print("code=", code, "dif=", dif, "dea=", dea, "macd=", macd)
        #     d = {
        #         'key': s[1],
        #         'name': s[2],
        #         'industry': s[3],
        #         'url': "https://xueqiu.com/S/" + re.sub(f'\W', '', code, 1).upper(),
        #         'price': m[3]
        #     }
        #     result.append(d)
        # if abs(m[7] - average) <= 0.1:
        #     isHengPan = isHengPan + 1
        #     if (0.05 >= (dif - dea) and (dif - dea) >= -0.05) and (0.08 >= macd and macd >= -0.08):
        #         isHengPan = isHengPan + 1
        # if isHengPan >= 15:
        #     print(s[2], "-", s[1],"==>", isHengPan)
        #     d = {
        #         'key': s[1],
        #         'name': s[2],
        #         'industry': s[3],
        #         'url': "https://xueqiu.com/S/" + re.sub(f'\W', '', fac[0][2], 1).upper(),
        #         'price': fac[0][3]
        #     }
        #     result.append(d)
        # break
        # 保存数据为json格式
    try:
        print("共输出" + str(len(result)) + "条")
        with open('difdea.json', 'a', encoding="utf-8") as f:
            f.write(json.dumps(result, ensure_ascii=False))  # ensure_ascii=False，则返回值可以包含非ascii值
    except IOError as e:
        print(str(e))
    # pd.DataFrame(result).to_json("./difdea.json")

def hen_stock(stock, days = 30):
    row = session.execute(
        f"SELECT date, name, code, area, industry, market, close, isST, DIFF, DEA, MACD FROM {stock[1]}_factor order by date desc limit {days};")
    fac = list(row)
    if len(fac) < 3:  # 排除新上市
        return
    if fac[0][7] == 1:  # 排除退市风险
        return
    if fac[0][6] < 5:  # 排除股票价格低于5元
        return
    isHengPan = 0
    for m in fac:
        code = m[2]
        dif = m[8]
        dea = m[9]
        macd = m[10]
        if abs(dif - dea) <= 0.04:
            isHengPan = isHengPan + 1
    if isHengPan >= 15:
        print(fac[0][1], "-", fac[0][2],"==>", isHengPan)
        d = {
            'key': stock[1],
            'name': fac[0][1],
            'area': fac[0][3],
            'industry': fac[0][4],
            'market': fac[0][5],
            'url': "https://xueqiu.com/S/" + re.sub(f'\W', '', fac[0][2], 1).upper(),
            'price': fac[0][5]
        }
        return d
    return None

if __name__ == "__main__":
    session = sessionmaker(sqlEngine)()  # 构建session对象
    
    # download_all_stock(table_name="all_stock", exist_type="replace")  # 1. 下载所有上市股票
    # download_history_k_data(session)  # 2. 下载所有上市股票的历史行情
    # cal_all_main_board_factor(session)  # 3. 从头计算股票MACD

    # download_today_history_k_data(session)  # 1. 下载所有股票当天历史数据
    cal_today_main_board_factor(session)  # 2. 计算当天股票MACD

    # search_macd(session)
