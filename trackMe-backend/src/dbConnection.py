import mysql.connector
from mysql.connector import errorcode
from src.config import dbConfig


def dbConnect():

    try: 
        myDb = mysql.connector.connect(**dbConfig)
        myCursor = myDb.cursor(buffered = True)
        
        return myDb, myCursor

    except mysql.connector.Error as e:  

        if e.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Incorrect username or password")
        elif e.errno == errorcode.ER_BAD_DB_ERROR:
            print("Database does not exist")
        else: print(e)

        return None, None


def dbDisconnect(cursor, db):
    cursor.close()
    db.close()
