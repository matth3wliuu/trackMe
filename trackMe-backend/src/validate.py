import re
from src.constants import uIDLength, tutorIdRegex, nameRegex, emailRegex, weekdayRegex, timeRegex, durationRegex, studentIdRegex

# write a decorator to validate admin permissions 

def validateUidLength(uID): 
    return len(uID) == uIDLength

def validateTutorIdFormat(tutorID):
    return bool(re.match(tutorIdRegex, tutorID))

def validateUserNameFormat(firstName, lastName):
    return bool(re.match(nameRegex, firstName)) and bool(re.match(nameRegex, lastName))

def validateRateId(rateId):
    return 0 <= rateId <= 4

def validateEmail(email):
    return bool(re.match(emailRegex, email))

def validateWeekday(day):
    return bool(re.match(weekdayRegex, day))

def validateTime(time):
    return bool(re.match(timeRegex, time))

def validateDuration(duration):
    return bool(re.match(durationRegex, duration))

def validateStudentIdFormat(studentID):
    return bool(re.match(studentIdRegex, studentID))

def validateGradeFormat(grade):
    return 7 <= grade <= 12

def validateClassExists(cursor, classId):

    query = (
        "SELECT * "
        "FROM classes "
        "WHERE classes.class_id = %(class_id)s "
    )
    cursor.execute(query, {"class_id": classId})
    return len(cursor.fetchall()) > 0 


def validateStudentExists(cursor, studentId):

    query = (
        "SELECT * "
        "FROM students "
        "WHERE students.student_id = %(student_id)s "
    )
    cursor.execute(query, {"student_id": studentId})
    return len(cursor.fetchall()) > 0 


def validateAdmin(cursor, u_id):

    query = (
        "SELECT admin "
        "FROM tutors "
        "WHERE tutors.u_id = %(u_id)s "
    )
    cursor.execute(query, { "u_id": u_id })
    return cursor.fetchone()[0]


