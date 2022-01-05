
def createNewTermItem(cursor, db, classId, studentId):
    
    term_data = {
        "class_id": classId,
        "student_id": studentId
    }
    query = (
        "INSERT INTO term "
        "VALUES (%(class_id)s, %(student_id)s) "
    )
    cursor.execute(query, term_data)
    db.commit()


def deleteTermItem(cursor, db, classId, studentId):

    term_data = {
        "class_id": classId,
        "student_id": studentId
    }
    query = (
        "DELETE FROM term "
        "WHERE term.class_id = %(class_id)s "
        "AND term.student_id = %(student_id)s "
    )
    cursor.execute(query, term_data)
    db.commit()
