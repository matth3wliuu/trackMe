import datetime
from datetime import date
from src.routes.classRoutes import getClassCap
from src.Helpers.tutorHelpers import getStartGridPos, getGridColPos

def doAddNewTutor(cursor, db, data):

    query = (
        "INSERT INTO tutors "
        "VALUES (%(tutor_id)s, %(u_id)s, %(first_name)s, %(last_name)s, %(rate_id)s, %(email)s) "
    )
    tutorData = { 
        "tutor_id": data["tutor_id"],
        "u_id": data["u_id"], 
        "first_name": data["first_name"],
        "last_name": data["last_name"],
        "rate_id": data["rate_id"], 
        "email": data["email"], 
        "start_date": date.today().isoformat()
    }
    cursor.execute(query, tutorData)
    db.commit()


def getTutorPayrate(cursor, u_id):

    query = (
        "SELECT pay_rates.rate "
        "FROM pay_rates "
        "WHERE pay_rates.rate_id = ( "
        "SELECT rate_id "
        "FROM tutors "
        "WHERE u_id = %(u_id)s )"
    )
    cursor.execute(query, {"u_id": u_id })
    return cursor.fetchone()


def getTutorClasses(cursor, uId):
    
    # query returns an array ["class_id", "tutor_id", "subject_id", "grade", "day", "start_time", "duration"]
    query = (
        "SELECT * "
        "FROM classes "
        "WHERE classes.tutor_id = ( "
        "   SELECT tutor_id  "
        "   FROM tutors "
        "   WHERE u_id = %(u_id)s "
        ") "
    )
    cursor.execute(query, {"u_id": uId})
    classesData = [ list(classData) for classData in cursor.fetchall() ]

    for classData in classesData:

        # query returns the subject name in English
        query = ( 
            "SELECT subject_name "
            "FROM subjects "
            "WHERE subject_id = %(subject_id)s"
        )
        subject_id = classData[2]
        cursor.execute(query, {"subject_id": subject_id})
        subject_name = cursor.fetchone()[0]

        classCap = getClassCap(cursor, classData[0])

        classData[1] = subject_name
        classData[2] = classCap

        # Convert weekday string to integer index 
        classData[4] = getGridColPos(classData[4])

        # convert datetime delta object into an integer as the starting position of the item on grid
        classData[5] = getStartGridPos(classData[5])
        
        # convert decimal object into a float then multiplying by 4 to get duration on grid
        classData[6] = 4 * float(str(classData[6])) + classData[5]

    return classesData


def getTutorId(cursor, u_id):

    query = ( 
        "SELECT tutor_id "
        "FROM tutors "
        "WHERE u_id = %(u_id)s"
    )
    cursor.execute(query, {"u_id": u_id})
    return cursor.fetchone()


def getTutorProfile(cursor, uId):

    query = (
        "SELECT tutor_id, first_name, last_name, rate_id, email, start_date, admin "
        "FROM tutors "
        "WHERE tutors.u_id = %(u_id)s "
    )
    cursor.execute(query, {"u_id": uId})
    profile = list(cursor.fetchone())
    profile[5] = str(profile[5])

    return profile


def UpdateTutorPayrate(cursor, db, tutorId, newRateId):

    query = (
        "UPDATE tutors "
        "SET rate_id = %(rate_id)s "
        "WHERE tutors.tutor_id = %(tutor_id)s"
    )
    tutor_info = {
        "tutor_id": tutorId,
        "rate_id": newRateId
    }
    cursor.execute(query, tutor_info)
    db.commit()


def updateTutorFirstName(cursor, db, newFirstName, tutorId):
    
    query = (
        "UPDATE tutors "
        "SET first_name = %(first_name)s "
        "WHERE tutors.tutor_id = %(tutor_id)s "
    )
    tutor_info = { 
        "first_name": newFirstName,
        "tutor_id": tutorId
    }
    cursor.execute(query, tutor_info)
    db.commit()


def updateTutorLastName(cursor, db, newLastName, tutorId):

    query = (
        "UPDATE tutors "
        "SET first_name = %(first_name)s "
        "WHERE tutors.tutor_id = %(tutor_id)s "
    )
    tutor_info = { 
        "first_name": newLastName,
        "tutor_id": tutorId
    }
    cursor.execute(query, tutor_info)
    db.commit()


def updateTutorEmail(cursor, db, newEmail, tutorId):

    query = ( 
        "UPDATE tutors "
        "SET email = %(email)s "
        "WHERE tutors.tutor_id = %(tutor_id)s " 
    )
    tutor_info = { 
        "email": newEmail,
        "tutor_id": tutorId
    }
    cursor.execute(query, tutor_info)
    db.commit()

def getTutorRequests(cursor, tutorId):

    query = ( 
        "SELECT request_id, type, date, status from requests "
        "WHERE requests.tutor_id = %(tutor_id)s"
    )
    cursor.execute(query, {"tutor_id": tutorId})
    res = cursor.fetchall()

    for idx, request in enumerate(res):
        res[idx] = list(request)
        res[idx][2] = str(request[2])

    return res


def checkCurrentTerm(cursor, termId, tutorId):

    query = ( 
        "SELECT * "
        "FROM roster "
        "WHERE tutor_id = %(tutor_id)s "
        "AND term_id = %(term_id)s "
    )
    cursor.execute(query, { "tutor_id": tutorId, "term_id": termId } )
    return cursor.fetchone() != None

def createTermJSON(db, cursor, termId, tutorId, dumps):

    newJSON = dumps({
        "class": { }, 
        "marking": { },
        "workshop": { },
        "other": { } 
    })

    query = ( 
        "INSERT into roster "
        "VALUES ( %(tutor_id)s, %(term_id)s, %(term_data)s ) "
    )
    data = {
        "tutor_id": tutorId, 
        "term_id": termId, 
        "term_data": newJSON 
    }
    cursor.execute(query, data)
    db.commit()


def getTermJSON(db, cursor, termId, tutorId, loads):

    query = ( 
        "SELECT term_data "
        "FROM roster "
        "WHERE term_id = %(term_id)s "
        "AND tutor_id = %(tutor_id)s "
    )
    queryData = {
        "term_id": termId, 
        "tutor_id": tutorId
    }
    cursor.execute(query, queryData)

    return loads(cursor.fetchone()[0])


def modifyTermJson(db, cursor, data, dumps, loads):

    query = (
        "SELECT term_data "
        "FROM roster "
        "WHERE term_id = %(term_id)s "
        "AND tutor_id = %(tutor_id)s "
    )
    queryData = {
        "term_id": data["term_id"],
        "tutor_id": data["tutor_id"]
    }
    cursor.execute(query, queryData)
    jsonData = cursor.fetchone()
    d = loads(jsonData)

    week = data["week"]
    newValue = data["hours"]
    work_type = data["work_type"]

    d[work_type][week] = newValue

    query = ( 
        "UPDATE roster "
        "SET term_data = %(term_data)s "
        "WHERE term_id = %(term_id)s "
        "AND tutor_id = %(tutor_id)s "
    )
    queryData = { 
        "term_data": dumps(d),
        "term_id": data["term_id"],
        "tutor_id": data["tutor_id"]
    }
    cursor.execute(query, queryData)
    db.commit()

