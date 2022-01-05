
uIDLength = 28
tutorIdRegex = r"^t[0-9]{8,8}$"
nameRegex = r"^[A-Z][a-zA-Z]{2,19}$"
emailRegex = r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)"
timeRegex = r"^([01]\d|2[0-3]):([0-5]/d)$"
weekdayRegex = r"^(Mon|Tues|Wednes|Thurs|Fri|Satur|Sun)day$"
durationRegex = r"^[0-9]:[0-9]{2,2}$"
studentIdRegex = r"^s[0-9]{8,8}$"

def classIdRegex(subjectId):
    return fr"\A{subjectId}-"


baseURL = "http://localhost:8080/"

