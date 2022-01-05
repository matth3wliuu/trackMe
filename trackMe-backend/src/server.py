from flask import Flask, request
from json import dumps
from flask_cors import CORS
from src.dbConnection import dbConnect
from src.error import InputError, AccessError
from src.validate import validateUidLength, validateTutorIdFormat, validateUserNameFormat, validateRateId, validateEmail, validateWeekday, validateTime, validateDuration, validateStudentIdFormat, validateGradeFormat, validateClassExists, validateStudentExists, validateAdmin
from src.routes.tutorsRoutes import getTutorsUid, getTutorsId, getTutorsEmail
from src.routes.tutorRoutes import doAddNewTutor, getTutorPayrate, getTutorId ,getTutorClasses, getTutorProfile, UpdateTutorPayrate, updateTutorFirstName, updateTutorLastName, updateTutorEmail
from src.routes.classRoutes import createNewClass, getClassCap, RemoveClass, updateClassStartTime, updateClassTutor, updateClassDay, updateClassDuration
from src.routes.studentRoutes import createNewStudent, deleteStudent
from src.routes.termRoutes import createNewTermItem, deleteTermItem

APP = Flask(__name__)
CORS(APP)

def testDbFn(): 
    query = (
        "SELECT pay_rates.rate "
        "FROM pay_rates "
        "WHERE pay_rates.rate_id = ( "
        "SELECT rate_id "
        "FROM tutors "
        "WHERE u_id = 'bXH635wpflTLcObbSbh8CTh31M33' )"
    )

    myCursor.execute(query)
    res = myCursor.fetchone()
    print(res[0])


# Decorator to check admin privileges
def validateCaller(fnc):

    def wrapper(*args, **kwargs):

        if not validateAdmin(myCursor, kwargs["u_id"]):
            raise AccessError(description = "tutor does not have admin privileges")

        else:
            return fnc(*args, **kwargs)

    return wrapper


# * TUTORS ROUTES ==============================================================

@APP.route("/tutors/uid", methods = ["GET"]) 
def tutorsUid(u_id):

    """
    Retrieves the u_id of all tutors (ADMIN ONLY)

    Returns:
        dictionary of list of lists
    """

    return dumps({"u_ids": getTutorsUid(myCursor)})


@APP.route("/tutors/id", methods = ["GET"])
def tutorsId():

    """
    Retrieves the tutor_id of all tutors

    Returns:
        dictionary of list of lists
    """

    return dumps({"tutor_ids": getTutorsId(myCursor)})
    

@APP.route("/tutors/email", methods = ["GET"])
def tutorsEmail():
    
    """
    Retrieves the email of all tutors

    Returns:
        dictionary of list of lists
    """

    return dumps({"emails": getTutorsEmail(myCursor)})


# * TUTOR ROUTES ===============================================================

@APP.route("/tutor/add/<u_id>", methods = ["POST"])
@validateCaller
def newTutor(u_id):

    """
    Allow an ADMIN to add a new tutor (ADMIN ONLY)

    Raises:
        AccessError: [non-admin permissions]
        InputError: [invalid u_id]
        InputError: [invalid tutor_id]
        InputError: [invalid first or last names]
        InputError: [invalid rate_id]
        InputError: [invalid email]
    """

    data = request.get_json()

    # error checking 
    if not validateUidLength(data["u_id"]):
        raise InputError(description = "u_id is of incorrect length")
    elif not validateTutorIdFormat(data["tutor_id"]):
        raise InputError(description = "tutor_id is of incorrect format")
    elif not validateUserNameFormat(data["first_name"], data["last_name"]):
        raise InputError(description = "first name or last name is of incorrect format")
    elif not validateRateId(data["rate_id"]):
        raise InputError(description = "rate id is of incorrect format")
    elif not validateEmail(data["email"]):
        raise InputError(description = "email is of incorrect format")

    doAddNewTutor(myCursor, myDb, data)

    return dumps({})


@APP.route("/tutor/tutor_id", methods = ['GET'])
def tutorId():

    data = request.args 
    print(getTutorId(myCursor, data["u_id"])[0])
    return dumps({"tutor_id": getTutorId(myCursor, data["u_id"])})


@APP.route('/tutor/payrate', methods = ["GET"])
def tutorPayrate():

    """
    Retrieves a tutor's payrate 

    Returns:
        dictionary
    """
    
    data = request.args
    return dumps({"rate": getTutorPayrate(myCursor, data["u_id"])})


@APP.route("/tutor/classes", methods = ["GET"])
def tutorClasses():

    """
    Retrieves data about all the classes taught by a tutor  

    Returns: dictionary of list of lists
    """

    data = request.args
    return dumps({"classes": getTutorClasses(myCursor, data["tutor_id"])})


@APP.route("/tutor/profile", methods = ["GET"])
def tutorProfile():
    
    """
    Retrieves the first_name, last_name, email and start_date of a tutor

    Returns: dictionary of a list
    """

    data = request.args
    return dumps({"profile": getTutorProfile(myCursor, data["tutor_id"])})


@APP.route("/tutor/update/payrate/<u_id>", methods = ["PUT"])
def tutorUpdatePayrate(u_id):

    """
    Allow a admin to update the payrate of a tutor (ADMIN ONLY)

    Returns: none
    """

    data = request.get_json()
    UpdateTutorPayrate(myCursor, myDb, data["tutor_id"], data["rate_id"])
    return dumps({})


@APP.route("/tutor/profile/firstname", methods = ["PUT"])
def tutorFirstName():

    """
    Allow a tutor to update their first name 

    Returns: none
    """

    data = request.get_json()
    updateTutorFirstName(myCursor, myDb, data["first_name"], data["tutor_id"])
    return dumps({})


@APP.route("/tutor/profile/lastname", methods = ["PUT"])
def tutorLastName():

    """
    Allow a tutor to update their last name 

    Returns: none
    """
    
    data = request.get_json()
    updateTutorLastName(myCursor, myDb, data["last_name"], data["tutor_id"])
    return dumps({})


@APP.route("/tutor/profile/email", methods = ["PUT"])
def tutorEmail(): 
    
    """
    Allow a tutor to update their email 

    Returns: none
    """

    data = request.get_json()
    updateTutorEmail(myCursor, myDb, data["email"], data["tutor_id"])
    return dumps({})


# * CLASS ROUTES ===============================================================

@APP.route("/class/add/<u_id>", methods = ["POST"])
def classNew(u_id):

    """
    Allow an ADMIN to create a new class (ADMIN ONLY)

    Returns: none
    """

    data = request.get_json()
    createNewClass(myCursor, myDb, data)
    return dumps({})


@APP.route("/class/capacity", methods = ["GET"])
def classCapacity():

    """
    Retrieves the current capacity of a class

    Returns: dictionary of an integer
    """

    data = request.args
    return dumps({"class_capacity": getClassCap(myCursor, data["class_id"])})


# check caller perms
@APP.route("/class/remove", methods = ["DELETE"])
def classRemove():

    """
    Allow an ADMIN to remove a class and subsequently remove all students from the class in the terms table 

    Returns: none
    """

    data = request.get_json()
    RemoveClass(myCursor, myDb, data["class_id"])
    return dumps({})


@APP.route("/class/tutor/<u_id>", methods = ["PUT"])
def classUpdateTutor(u_id):

    """
    Allow an ADMIN to update the tutor of a class

    Returns: none
    """

    data = request.get_json()
    updateClassTutor(myCursor, myDb, data["class_id"], data["tutor_id"])
    return dumps({})


@APP.route("/class/weekday/<u_id>", methods = ["PUT"])
def classUpdateDay(u_id):

    """
    Allow an ADMIN to update the day of a class

    Returns: none
    """

    data = request.get_json()

    if not validateWeekday(data["day"]):
        raise InputError(description = "weekday is not of correct format")

    updateClassDay(myCursor, myDb, data["class_id"], data["day"])
    return dumps({})


@APP.route("/class/time/<u_id>", methods = ["PUT"])
def classUpdateTime(u_id):

    """
    Allow an ADMIN to update the start time of a class
    """

    data = request.get_json()

    if not validateTime(data["start_time"]):
        raise InputError(description = "start_time is of incorrect format")

    updateClassStartTime(myCursor, myDb, data["class_id"], data["start_time"])
    return dumps({})


@APP.route("/class/duration/<u_id>", methods = ["PUT"])
def classUpdateDuration(u_id):

    data = request.get_json()

    if not validateDuration(data["duration"]):
        raise InputError(description = "duration is of incorrect format")
    
    updateClassDuration(myCursor, myDb, data["class_id"], data["duration"])
    return dumps({})


# * STUDENT ROUTES =============================================================

# check caller perms
@APP.route("/student/add/<u_id>", methods = ["POST"])
def newStudent(u_id):

    data = request.get_json()

    if not validateUidLength(data["u_id"]):
        raise InputError(description = "u_id is of incorrect format")
    elif not validateStudentIdFormat(data["student_id"]):
        raise InputError(description = "student_id is of incorrect format")
    elif not validateUserNameFormat(data["first_name"], data["last_name"]):
        raise InputError(description = "first or last name is of incorrect format")
    elif not validateGradeFormat(data["grade"]):
        raise InputError(description = "grade is of incorrect format")

    createNewStudent(myCursor, myDb, data)
    return dumps({})


@APP.route("/student/remove/<u_id>", methods = ["DELETE"])
def removeStudent(u_id):

    data = request.get_json()

    if not validateStudentIdFormat(data["student_id"]):
        raise InputError(description = "student_id is of incorrect format")

    deleteStudent(myCursor, myDb, data["student_id"])
    return dumps({})


# * TERM ROUTES ================================================================ 

@APP.route("/term/add/<u_id>", methods = ["POST"])
def newTermItem(u_id):

    data = request.get_json()

    if not validateStudentExists(myCursor, data["student_id"]):
        raise InputError(description = "student does not exist")
    elif not validateClassExists(myCursor, data["class_id"]):
        raise InputError(description = "class does not exist")

    createNewTermItem(myCursor, myDb, data["student_id"], data["class_id"])
    return dumps({})


@APP.route("/term/remove/<u_id>", methods = ["DELETE"])
def removeTermItem(u_id):

    data = request.get_json()

    if not validateStudentExists(myCursor, data["student_id"]):
        raise InputError(description = "student does not exist")
    elif not validateClassExists(myCursor, data["class_id"]):
        raise InputError(description = "class does not exist")
    
    deleteTermItem(myCursor, myDb, data["student_id"], data["term_id"])
    return dumps({})



# ==============================================================================

if __name__ == '__main__':
    myDb, myCursor = dbConnect()
    APP.run(port = 8080, threaded = True, debug = True)