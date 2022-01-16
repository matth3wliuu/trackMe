
def getTutorsUid(cursor):
    
    query = (
        "SELECT u_id "
        "FROM tutors "
    )

    cursor.execute(query)
    return cursor.fetchall()


def getTutorsId(cursor):

    query = (
        "SELECT tutor_id "
        "FROM tutors "
    )

    cursor.execute(query)
    return cursor.fetchall()


def getTutorsEmail(cursor):
    
    query = (
        "SELECT email "
        "FROM tutors "
    )

    cursor.execute(query)
    return cursor.fetchall()

def getTutorsInfo(cursor):

    query = (
        "SELECT tutor_id, first_name, last_name "
        "FROM tutors "
    )
    cursor.execute(query)
    return cursor.fetchall()
