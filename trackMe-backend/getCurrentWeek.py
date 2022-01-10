import datetime 
import calendar 

monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"]


def getMonthData(dateObj):

    firstDay = datetime.date(dateObj.year, dateObj.month, 1)
    last = calendar.monthrange(dateObj.year, dateObj.month)[1]
    lastDay = datetime.date(dateObj.year, dateObj.month, last ) 

    return ( firstDay, lastDay )


def getYearData(dateObj):

    firstDay = datetime.date(dateObj.year, 1, 1)
    lastDay = datetime.date(dateObj.year, 12, 31)

    return ( firstDay, lastDay )


def getLastDatePrevMonth(dateObj):
    return calendar.monthrange(dateObj.year, dateObj.month - 1)[1]


def getCurrentWeek():

    dateObj = datetime.datetime.now()

    # first day and last day of the current month and current year
    monthData = getMonthData(dateObj)
    yearData = getYearData(dateObj)

    # difference to first day of week and last day of week
    differences = [ dateObj.weekday(), 6 - dateObj.weekday() ]

    startDate = datetime.datetime.now()
    endDate = datetime.datetime.now()

    while differences[0] > 0 or differences[1] > 0:

        if differences[0] > 0:

            currDate = datetime.date(startDate.year, startDate.month, startDate.day)

            if currDate == yearData[0]:
                startDate = datetime.date(currDate.year - 1, 12, 31)

            elif currDate == monthData[0]:
                startDate = datetime.date(currDate.year, currDate.month - 1, getLastDatePrevMonth(currDate))

            else: 
                startDate = datetime.date(currDate.year, currDate.month, currDate.day - 1)
            
            differences[0] -= 1

        if differences[1] > 0:

            currDate = datetime.date(endDate.year, endDate.month, endDate.day)

            if currDate == yearData[1]:
                endDate = datetime.date(currDate.year + 1, 1, 1)
            
            elif currDate == monthData[1]:
                endDate = datetime.date(currDate.year, endDate.month + 1, 1)
            
            else:
                endDate = datetime.date(currDate.year, currDate.month, currDate.day + 1)

            differences[1] -= 1


    if startDate.year != dateObj.year or endDate.year != dateObj.year:
        return f"{monthNames[startDate.month - 1]} {startDate.day}, {startDate.year} - {monthNames[endDate.month - 1]} {endDate.day}, {endDate.year}" 

    elif startDate.month != dateObj.month or endDate.month != dateObj.month:
        return f"{monthNames[startDate.month - 1]} {startDate.day} - {monthNames[endDate.month - 1]} {endDate.day}, {dateObj.year}"

    return f"{monthNames[dateObj.month - 1]} {startDate.day} - {endDate.day}, {dateObj.year}"

