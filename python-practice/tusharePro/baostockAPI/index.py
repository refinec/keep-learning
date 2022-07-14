"""
这里放所有 baostack 的 API
"""
import sys
sys.path.append("../")
import baostock as bs
import pandas as pd
from utils.mysqlConnect import sqlEngine


def bs_history_k_data(num_name=0, stock="sz.000858", start_date='1970-12-19', end_date=""):
    """
    下载股票的历史行情
    :param num_name:
    :param stock:
    :param start_date:
    :param end_date:
    :return:
    """
    # bs.login()
    rs = bs.query_history_k_data_plus(stock,
                                      "date,code,open,high,low,close,preclose,volume,amount,adjustflag,turn,tradestatus,pctChg,peTTM,pbMRQ,psTTM,pcfNcfTTM,isST",
                                      start_date=start_date, end_date=end_date,
                                      frequency="d", adjustflag="2")  # frequency="d"取日k线，adjustflag="3"默认不复权
    data_list = []
    while (rs.error_code == '0') & rs.next():
        # 获取一条记录，将记录合并在一起
        data_list.append(rs.get_row_data())
    if len(data_list) == 0:
        return
    result = pd.DataFrame(data_list, columns=rs.fields)
    # result.to_csv("./history_k_data.csv", encoding="gbk", index=False)
    result.to_sql(f'{num_name}_history', sqlEngine, if_exists='replace')
    # bs.logout()


def bs_last_history_k_data(num_name=0, stock="sz.000858", last_date=''):
    """
    下载股票具体日期的历史行情
    :param num_name:
    :param stock:
    :param last_date:
    :return:
    """
    rs = bs.query_history_k_data_plus(stock,
                                      "date,code,open,high,low,close,preclose,volume,amount,adjustflag,turn,tradestatus,pctChg,peTTM,pbMRQ,psTTM,pcfNcfTTM,isST",
                                      start_date=last_date, end_date=last_date,
                                      frequency="d", adjustflag="2")  # frequency="d"取日k线，adjustflag="3"默认不复权
    data_list = []
    while (rs.error_code == '0') & rs.next():
        # 获取一条记录，将记录合并在一起
        data_list.append(rs.get_row_data())
    if len(data_list) > 0 and data_list[0][7]:
        result = pd.DataFrame(data_list, columns=rs.fields)
        result.to_sql(f'{num_name}_history', sqlEngine, if_exists='append')
    # print(result)


# if __name__ == "__main__":
    # bs.login()
    # bs_last_history_k_data(num_name="000001", stock="sz.000001", last_date="2022-05-24")
    # bs.logout()
