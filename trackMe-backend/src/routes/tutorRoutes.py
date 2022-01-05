from datetime import date

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


def getTutorClasses(cursor, tutorId):

    query = (
        "SELECT * "
        "FROM classes "
        "WHERE classes.tutor_id = %(tutorId)s "
    )
    cursor.execute(query, {"tutorId": tutorId})
    classesData = [ list(classData) for classData in cursor.fetchall() ]

    for classData in classesData:
        classData[5] = str(classData[5])
        classData[6] = str(classData[6])

    return classesData

def getTutorId(cursor, u_id):

    query = ( 
        "SELECT tutor_id "
        "FROM tutors "
        "WHERE u_id = %(u_id)s"
    )
    cursor.execute(query, {"u_id": u_id})
    return cursor.fetchone()

def getTutorProfile(cursor, tutorId):

    query = (
        "SELECT first_name, last_name, email, start_date "
        "FROM tutors "
        "WHERE tutors.tutor_id = %(tutor_id)s " 
    )
    cursor.execute(query, {"tutor_id": tutorId})
    profile = list(cursor.fetchone())
    profile[3] = str(profile[3])

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