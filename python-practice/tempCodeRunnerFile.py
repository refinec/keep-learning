# from urllib.request import urlopen
#
# url = urlopen("https://www.runoob.com/python3/python-urllib.html")
# print(url.getcode())
import urllib
import tushare as ts
# print(ts.get_hist_data('000858', start='2022-05-19', end='2022-05-20')) #一次性获取全部数据

# df = ts.get_hist_data('000858')
# df.to_json('./000858.json', orient='records')

toplist = ts.top_list();
toplist.to_json("./toplist.json")
print()