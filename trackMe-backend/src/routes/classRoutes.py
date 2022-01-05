from src.Helpers.classHelpers import generateClassId
from src.constants import classIdRegex


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
        "duration": data["duration"]
    }
    query = (
        "INSERT INTO classes "
        "VALUES (%(class_id)s, %(tutor_id)s, %(subject_id)s, %(grade)s, %(day)s, %(start_time)s, %(duration)s ) "
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