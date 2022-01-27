from src.routes.classRoutes import getClassCap

def getAllClasses(cursor):

    query = (
        "SELECT * FROM classes"
    )
    cursor.execute(query)
    res = cursor.fetchall()

    for idx, item in enumerate(res):
        res[idx] = list(item)
        res[idx][5] = str(item[5])
        res[idx][6] = str(item[6])
        res[idx].append(getClassCap(cursor, item[0]))

    return res

def getAllTutors(cursor):
    
    query = (
        "SELECT * FROM tutors "
    )
    cursor.execute(query)
    res = cursor.fetchall()

    for idx, item in enumerate(res):
        res[idx] = list(item)
        res[idx][6] = str(item[6])

    return res

def getAllRequests(cursor):

    query = (
        "SELECT * FROM requests "
        "ORDER by date "
        "DESC"
    )

    cursor.execute(query)
    res = cursor.fetchall()

    for idx, item in enumerate(res):
        res[idx] = list(item)
        res[idx][2] = str(item[2])
        res[idx][3] = str(item[3])

    return res

def getAllSubjects(cursor):

    query = ( 
        "SELECT * FROM subjects "
    )
    cursor.execute(query)
    res = cursor.fetchall()

    return res


def getAllRooms(cursor):

    query = (
        "SELECT * FROM rooms "
    )
    cursor.execute(query)
    res = cursor.fetchall()

    return res