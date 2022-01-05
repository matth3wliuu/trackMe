import datetime 
from src.constants import weekdays

def getStartGridPos(t):
    t -= datetime.timedelta(hours = 9)
    return int(t.total_seconds() // 60 // 15 + 2)


def getGridColPos(day):
    return weekdays[day]
