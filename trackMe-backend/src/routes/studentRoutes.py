
def createNewStudent(cursor, db, data):

    student_data = {
        "u_id": data["u_id"],
        "student_id": data["student_id"],
        "first_name": data["first_name"], 
        "last_name": data["last_name"],
        "grade": data["grade"]
    }
    query = (
        "INSERT INTO students "
        "VALUES (%(u_id)s, %(student_id)s, %(first_name)s, %(last_name)s, %(grade)s) "
    )
    cursor.execute(query, student_data)
    db.commit()


def deleteStudent(cursor, db, studentId):

    query = (
        "DELETE FROM students "
        "WHERE u_id = %(student_id)s "
    )
    cursor.execute(query, {"studentId": studentId})
    db.commit()