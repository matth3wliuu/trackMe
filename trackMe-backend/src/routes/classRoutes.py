from src.Helpers.classHelpers import generateClassId
from src.constants import classIdRegex
from datetime import datetime, timedelta


def createNewClass(cursor, db, data):
    
    # Get all the preexisting class_ids that start the same as the new one
    query = (
        "SELECT class_id "
        "FROM classes "
        "WHERE class_id REGEXP %(regexp)s "
    )
    cursor.execute(query, {"regexp": classIdRegex(data["subject_id"])})
    class_ids = cursor.fetchall()

    class_id = generateClassId(class_ids, data["first_name"], data["last_name"], data["subject_id"])

    class_data = {
        "class_id": class_id, 
        "tutor_id": data["tutor_id"],
        "subject_id": data["subject_id"],
        "grade": data["grade"], 
        "day": data["day"], 
        "start_time": data["start_time"],
        "duration": data["duration"],
        "room": data["room"]
    }
    query = (
        "INSERT INTO classes "
        "VALUES (%(class_id)s, %(tutor_id)s, %(subject_id)s, %(grade)s, %(day)s, %(start_time)s, %(duration)s, %(room)s) "
    )
    cursor.execute(query, class_data)
    db.commit()


def getClassCap(cursor, classId):

    class_data = { 
        "class_id": classId
    }
    query = (
        "SELECT COUNT(term.student_id) "
        "FROM term "
        "WHERE term.class_id = %(class_id)s "
    )
    cursor.execute(query, class_data)
    return cursor.fetchone()[0]


def RemoveClass(cursor, db, classId):

    query = ( 
        "DELETE from classes "
        "WHERE classes.class_id = %(class_id)s "
    )
    cursor.execute(query, {"class_id": classId})
    db.commit()


def updateClassTutor(cursor, db, classId, newTutorId):
    
    class_data = {
        "class_id": classId, 
        "tutor_id": newTutorId
    }
    query = (
        "UPDATE classes "
        "SET classes.tutor_id = %(tutor_id)s "
        "WHERE classes.class_id = %(class_id)s "
    )
    cursor.execute(query, class_data)
    db.commit()


def updateClassDay(cursor, db, classId, newDay): 
    
    class_data = { 
        "class_id": classId, 
        "day": newDay
    }
    query = (
        "UPDATE classes "
        "SET classes.day = %(day)s "
        "WHERE classes.class_id = %(class_id)s "
    )
    cursor.execute(query, class_data)
    db.commit()


def updateClassStartTime(cursor, db, classId, newTime): 

    class_data = { 
        "class_id": classId, 
        "start_time": newTime
    }
    query = (
        "UPDATE classes "
        "SET classes.start_time = %(start_time)s "
        "WHERE classes.class_id = %(class_id)s "
    )
    cursor.execute(query, class_data)
    db.commit()


def updateClassDuration(cursor, db, classId, newDuration):

    class_data = { 
        "class_id": classId, 
        "duration": newDuration
    }
    query = (
        "UPDATE classes "
        "SET classes.duration = %(duration)s "
        "WHERE classes.class_id = %(class_id)s "
    )
    cursor.execute(query, class_data)
    db.commit()


def getClassPermission(cursor, classId, uId):

    data = {
        "class_id": classId, 
        "u_id": uId
    }
    query = (
        "SELECT class_id "
        "FROM classes "
        "WHERE class_id = %(class_id)s "
        "AND "
        "tutor_id = ( "
        "   SELECT tutor_id "
        "   FROM tutors "
        "   WHERE u_id = %(u_id)s "
        ") " 
    )
    cursor.execute(query, data)
    res = cursor.fetchone()

    return None if res is None else res[0]


def getClassData(cursor, classId):

    data = {
        "class_id": classId 
    }
    query = (
        "SELECT * "
        "FROM classes "
        "WHERE classes.class_id = %(class_id)s "
        "LIMIT 1"
    )
    cursor.execute(query, data)
    res = list(cursor.fetchone())

    endTime = res[5] + timedelta(hours = float(res[6]))

    data = {
        "subject_id": res[2]
    }
    query = (
        "SELECT subject_name "
        "FROM subjects "
        "WHERE subject_id = %(subject_id)s "
    )
    cursor.execute(query, data)

    res[2] = cursor.fetchone()[0]
    res[5] = str(res[5]) + " am" if str(res[5]) < "12:00" else " pm"
    res[6] = str(endTime) 
    res[6] += " am" if str(endTime) < "12:00" else " pm"

    return res


def getClassStudents(cursor, classId):
    
    data = {
        "class_id": classId
    }
    
    query = (
        "SELECT student_id, first_name, last_name, grade "
        "FROM students "
        "WHERE student_id IN ( "
        "   SELECT student_id "
        "   FROM term "
        "   WHERE class_id = %(class_id)s "
        "); "
    )
    cursor.execute(query, data)
    return cursor.fetchall()


