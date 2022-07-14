"""
这里放所有付费版tushare API
"""
import tushare as ts

ts_pro = ts.pro_api('7766792268e1fd8eee2c4dfbe552f73ab7098a56c3422ce4bfffee85')


def get_all_stock():
    """
    :return: 下载所有上市的股票
    """
    return ts_pro.stock_basic(**{
        "ts_code": "",  # TS股票代码
        "name": "",  # 名称
        "exchange": "",  # 交易所： SSE上交所 SZSE深交所 BSE北交所
        "market": "",  # 市场类别 （主板/创业板/科创板/CDR/北交所）
        "is_hs": "",  # 是否沪深港通标的：N否 H沪股通 S深股通
        "list_status": "L",  # 上市状态：L上市 D退市 P暂停上市，默认是L
        "limit": "",
        "offset": ""
    }, fields=[  # 输出参数
        "ts_code",  # TS代码
        "symbol",  # 股票代码
        "name",  # 股票名称
        "area",  # 地域
        "market",  # 市场类型（主板/创业板/科创板/CDR）
        "industry",  # 所属行业
        "list_status",  # 上市状态 L上市 D退市 P暂停上市
        "list_date",  # 上市日期
        "delist_date",  # 退市日期
        "is_hs",  # 是否沪深港通标的，N否 H沪股通 S深股通
        "fullname",  # 股票全称
        "enname",  # 英文全称
        "cnspell",  # 拼音缩写
        "exchange",  # 交易所代码
        "curr_type",  # 交易货币
    ])


def stk_factor(ts_code="", start_date="", end_date=""):
    """
    获取股票每日技术面因子数据，用于跟踪股票当前走势情况
    :param ts_code: 股票代码
    :param start_date: 开始日期
    :param end_date: 结束日期
    :return:
    """
    return ts_pro.stk_factor(ts_code=ts_code, start_date=start_date, end_date=end_date,
                             fields=[
                                 "ts_code",  # 股票代码
                                 "trade_date",  # 交易日期
                                 "open",  # 开盘价
                                 "close",  # 收盘价
                                 "high",  # 最高价
                                 "low",  # 最低价
                                 "pre_close",  # 昨收价
                                 "change",  # 涨跌额
                                 "pct_change",  # 涨跌幅
                                 "vol",  # 成交量 （手）
                                 "amount",  # 成交额 （千元）
                                 "mcad_dif",  # MCAD_DIF
                                 "mcad_dea",  # MCAD_DEA
                                 "mcad",  # MCAD
                                 "kdj_k",  # KDJ_K
                                 "kdj_d",  # KDJ_D
                                 "kdj_j",  # KDJ_J
                                 "rsi_6",  # RSI_6
                                 "rsi_12",  # RSI_12
                                 "rsi_24",  # RSI_24
                                 "boll_upper",  # BOLL_UPPER
                                 "boll_mid",  # BOLL_MID
                                 "boll_lower",  # BOLL_LOWER
                                 "cci",  # CCI
                                 "adj_factor",  # 复权因子
                                 "open_qfq",  # 开盘价前复权
                                 "open_hfq",  # 开盘价后复权
                                 "close_qfq",  # 收盘价前复权
                                 "close_hfq",  # 收盘价后复权
                                 "high_qfq",  # 最高价前复权
                                 "high_hfq",  # 最高价后复权
                                 "low_qfq",  # 最低价前复权
                                 "low_hfq",  # 最低价后复权
                                 "pre_close_hfq",  # 昨收价后复权
                                 "pre_close_qfq",  # 昨收价前复权
                             ])


# if __name__ == "__main__":

    """
    row = session.execute("SELECT ts_code, symbol FROM all_stock WHERE market = '主板'")
    # print(row.fetchone())
    # print(row.fetchmany())
    # print(row.fetchall()[0][0])
    
    for r in row:
       stk_factor = stk_factor(ts_code=r[0], start_date="", end_date="20220520")
       stk_factor.to_sql(f'{r[1]}_factor', sqlEngine, if_exists='replace')  # 如果表名已存在的处理方式:fail, replace, append
       print('row==>', r[0], r[1])
    """
