import tushare as ts
from utils.mysqlConnect import sqlEngine

# df = ts.get_tick_data('000858', date='2022-5-20')
# toplist = ts.top_list()

# try:
#     industry = ts.get_industry_classified()
#     print(industry)
#     # toplist.to_sql('top_list', sqlEngine, if_exists='replace') # 如果表名已存在的处理方式:fail, replace, append
# except ValueError as ve:
#     print("valueerror:", ve)


data = ts.get_h_data("000858")
print("data", data)
# data.to_sql('000858_data', sqlEngine, if_exists='replace')