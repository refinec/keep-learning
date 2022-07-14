import baostock as bs
import pandas as pd
from utils.mysqlConnect import sqlEngine, sessionmaker, declarative_base, Column, Integer, String, Text

#### 登陆系统 ####
lg = bs.login()
# 显示登陆返回信息
print('login respond error_code:' + lg.error_code)
print('login respond  error_msg:' + lg.error_msg)

#### 获取历史K线数据 ####
# 详细指标参数，参见“历史行情指标参数”章节
rs = bs.query_history_k_data_plus("sz.000611",
                                  "date,code,open,high,low,close,preclose,volume,amount,adjustflag,turn,tradestatus,pctChg,peTTM,pbMRQ,psTTM,pcfNcfTTM,isST",
                                  start_date='2022-05-26', end_date='2022-05-26',
                                  frequency="d", adjustflag="2")  # frequency="d"取日k线，adjustflag="3"默认不复权
print('query_history_k_data_plus respond error_code:' + rs.error_code)
print('query_history_k_data_plus respond error_msg:' + rs.error_msg)

#### 打印结果集 ####
data_list = []
while (rs.error_code == '0') & rs.next():
    # 获取一条记录，将记录合并在一起
    data_list.append(rs.get_row_data())
result = pd.DataFrame(data_list, columns=rs.fields)
#### 结果集输出到csv文件 ####
# result.to_csv("./history_k_data.csv", encoding="gbk", index=False)
# result.to_sql('000858_history', sqlEngine, if_exists='replace')
print(result)

#### 登出系统 ####
bs.logout()



# # 获取行业分类数据
# rs = bs.query_stock_industry()
# # rs = bs.query_stock_basic(code_name="浦发银行")
# print('query_stock_industry error_code:'+rs.error_code)
# print('query_stock_industry respond  error_msg:'+rs.error_msg)
#
# # 打印结果集
# industry_list = []
# while (rs.error_code == '0') & rs.next():
#     # 获取一条记录，将记录合并在一起
#     industry_list.append(rs.get_row_data())
# result = pd.DataFrame(industry_list, columns=rs.fields)
# # 结果集输出到csv文件
# # result.to_csv("D:/stock_industry.csv", encoding="gbk", index=False)
# result.to_sql('stock_industry', sqlEngine, if_exists='replace')
# # print(result)
#
# # 登出系统
# bs.logout()