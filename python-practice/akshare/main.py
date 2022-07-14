# import akshare as ak
#
# print(ak.__version__)

def EMA(type=12, todayClose=0, yesterdayEMA=0):
    """
    计算EMA12和EMA26，新上市的股票第一天的EMA为0
    :param type:
    :param todayClose:
    :param yesterdayEMA:
    :return:
    """
    if type == 12:
        return round(((2 * todayClose) / (12 + 1)) + ((11 * yesterdayEMA) / (12 + 1)), 5)
    elif type == 26:
        return round(((2 * todayClose) / (26 + 1)) + ((25 * yesterdayEMA) / (26 + 1)), 5)


def DIFF(EMA12=0, EMA26=0):
    return round(EMA12 - EMA26, 5)


def DEA(yesterdayDEA=0, todayDIFF=0):
    return round((yesterdayDEA * 8 / 10) + (todayDIFF * 2 / 10), 5)


def MACD(DIFF=0, DEA=0):
    """
    柱状值BAR 即 MACD终值
    :return:
    """
    return 2 * (DIFF - DEA)


if __name__ == "__main__":
    # EMA12 = EMA(12, 19.27, 17.52)
    # EMA26 = EMA(26, 19.27, 17.52)
    # EMA12 = EMA(12, 21.20, 17.78923)
    # EMA26 = EMA(26, 21.20, 17.64963)
    EMA12 = EMA(12, 23.32, 18.31396)
    EMA26 = EMA(26, 23.32, 17.91262)

    DIF = DIFF(EMA12, EMA26)

    # dea = DEA(0, DIF)
    # dea = DEA(0.02792, DIF)
    dea = DEA(0.1026, DIF)

    macd = MACD(DIF, dea)
    print("EMA12=", EMA12, "EMA26=", EMA26, "DIF=", DIF, "dea=", dea, "macd=", macd)
