


def addNewRequest(db, cursor, data):

    tutor_id = data["tutor"]

    if len(tutor_id) != 0:

        name = tutor_id.split(" ")
        query = (
            "SELECT tutor_id "
            "FROM tutors "
            "WHERE first_name = %(first_name)s "
            "AND last_name = %(last_name)s "
        )
        cursor.execute(query, {"first_name": name[0], "last_name": name[1]})

        tutor_id = cursor.fetchone()[0]

    query = (
        "SELECT COUNT(*) "
        "FROM requests "
    )
    cursor.execute(query)

    requestData = {
        "request_id": f"req{cursor.fetchone()[0]}", 
        "type": data["type"],
        "date": data["date"],
        "duration": data["duration"],
        "tutor_id": tutor_id,
        "reason": data["reason"],
        "status": "processing"
    }

    query = ( 
        "INSERT into requests "
        "VALUES (%(request_id)s, %(type)s, %(date)s, %(duration)s, %(tutor_id)s, %(reason)s, %(status)s) "
    )
    cursor.execute(query, requestData)
    db.commit()
