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

# if __name__ == "__main__":
#     EMA12 = EMA(12, 0.27, 1.5124)
#     EMA26 = EMA(26, 0.27, 1.71988)
#     print(EMA12, EMA26, DIFF(EMA12, EMA26), DEA(-0.15253, DIFF(EMA12, EMA26)), MACD(DIFF(EMA12, EMA26), DEA(-0.15253, DIFF(EMA12, EMA26))))