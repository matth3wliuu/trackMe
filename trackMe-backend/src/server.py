from flask import Flask, request, jsonify
from functools import wraps
from json import dumps, loads
from flask_cors import CORS
from src.dbConnection import dbConnect, dbDisconnect
from src.error import InputError, AccessError
from src.validate import validateUidLength, validateTutorIdFormat, validateUserNameFormat, validateRateId, validateEmail, validateWeekday, validateTime, validateDuration, validateStudentIdFormat, validateGradeFormat, validateClassExists, validateStudentExists, validateAdmin
from src.routes.tutorsRoutes import getTutorsInfo
from src.routes.tutorRoutes import doAddNewTutor, getTutorPayrate, getTutorId ,getTutorClasses, getTutorProfile, UpdateTutorPayrate, updateTutorFirstName, updateTutorLastName, updateTutorEmail, getTutorRequests, checkCurrentTerm, createTermJSON, modifyTermJson, getTermJSON
from src.routes.classRoutes import createNewClass, getClassCap, RemoveClass, updateClassStartTime, updateClassTutor, updateClassDay, updateClassDuration, getClassPermission, getClassData, getClassStudents
from src.routes.studentRoutes import createNewStudent, deleteStudent
from src.routes.termRoutes import createNewTermItem, deleteTermItem
from src.routes.uiRoutes import getCurrentWeek
from src.routes.requestRoutes import addNewRequest
from src.routes.adminRoutes import getAllClasses, getAllTutors, getAllRequests, getAllSubjects, getAllRooms


APP = Flask(__name__)
CORS(APP)

def testDbFn(): 

    myCursor, myDb = dbConnect()

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

    dbDisconnect(myCursor, myDb)


# Decorator to check admin privileges
def validateCaller(fnc):

    @wraps(fnc)
    def wrapper(*args, **kwargs):

        myDb, myCursor = dbConnect()
        res = None 

        if not validateAdmin(myCursor, kwargs["u_id"]):
            raise AccessError(description = "tutor does not have admin privileges")

        res = fnc(*args, **kwargs)
 
        dbDisconnect(myCursor, myDb)
        return res

    return wrapper


# * UI ROUTES ==================================================================

@APP.route("/ui/current_week", methods = ["GET"])
def weekString():

    """
    Returns: a string based on the current weekdays 
    """

    return dumps({"current_week": getCurrentWeek()})


# * ADMIN RUOUTES ==============================================================

@APP.route("/admin/classes/<u_id>", methods = ["GET"])
@validateCaller
def allClasses(u_id):

    myDb, myCursor = dbConnect()
    res = getAllClasses(myCursor)

    dbDisconnect(myCursor, myDb)
    return dumps({"classes": res})


@APP.route("/admin/tutors/<u_id>", methods = ["GET"])
@validateCaller
def allTutors(u_id):

    myDb, myCursor = dbConnect()
    res = getAllTutors(myCursor)

    dbDisconnect(myCursor, myDb)
    return dumps({"tutors": res})


@APP.route("/admin/requests/<u_id>", methods = ["GET"])
@validateCaller
def AllRequests(u_id):
    
    myDb, myCursor = dbConnect()
    res = getAllRequests(myCursor)

    dbDisconnect(myCursor, myDb)
    return dumps({"requests": res})


@APP.route("/admin/subjects/<u_id>", methods = ["GET"])
@validateCaller
def allSubjects(u_id):
    myDb, myCursor = dbConnect()
    res = getAllSubjects(myCursor)

    dbDisconnect(myCursor, myDb)
    return dumps({"subjects": res})


@APP.route("/admin/rooms/<u_id>", methods = ["GET"])
@validateCaller
def allRooms(u_id):
    myDb, myCursor = dbConnect()
    res = getAllRooms(myCursor)

    dbDisconnect(myCursor, myDb)
    return dumps({"rooms": res})


# * TUTORS ROUTES ==============================================================

@APP.route("/tutors/info", methods = ["GET"])
def tutorsInfo():
    myDb, myCursor = dbConnect()

    res = getTutorsInfo(myCursor)
    dbDisconnect(myCursor, myDb)
    return dumps({"tutors_info": res})


# * TUTOR ROUTES ===============================================================

@APP.route("/tutor/add/<u_id>", methods = ["POST"])
@validateCaller
def newTutor(u_id):

    myDb, myCursor = dbConnect()

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

    dbDisconnect(myCursor, myDb)
    return dumps({})


@APP.route("/tutor/tutor_id", methods = ['GET'])
def tutorId():

    myDb, myCursor = dbConnect()
    data = request.args 

    res = getTutorId(myCursor, data["u_id"])

    dbDisconnect(myCursor, myDb)
    return dumps({"tutor_id": res})


@APP.route('/tutor/payrate', methods = ["GET"])
def tutorPayrate():

    """
    Retrieves a tutor's payrate 

    Returns:
        dictionary
    """

    myDb, myCursor = dbConnect()
    data = request.args

    res = getTutorPayrate(myCursor, data["u_id"])
    
    dbDisconnect(myCursor, myDb)
    return dumps({"rate": res})


@APP.route("/tutor/classes", methods = ["GET"])
def tutorClasses():

    """
    Retrieves data about all the classes taught by a tutor  

    Returns: dictionary of list of lists
    """

    myDb, myCursor = dbConnect()
    data = request.args

    res = getTutorClasses(myCursor, data["u_id"])

    dbDisconnect(myCursor, myDb)
    return dumps({"classes": res})


@APP.route("/tutor/profile", methods = ["GET"])
def tutorProfile():
    
    """
    Retrieves the first_name, last_name, email and start_date of a tutor

    Returns: dictionary of a list
    """
    myDb, myCursor = dbConnect()
    data = request.args

    res = getTutorProfile(myCursor, data["u_id"])

    dbDisconnect(myCursor, myDb)
    return dumps({"profile": res})


@APP.route("/tutor/requests", methods = ["GET"])
def tutorRequests():

    myDb, myCursor = dbConnect()
    data = request.args
    
    res = getTutorRequests(myCursor, data["tutor_id"])
    print(res)
    return dumps({"requests": res})


@APP.route("/tutor/update/payrate/<u_id>", methods = ["PUT"])
def tutorUpdatePayrate(u_id):

    """
    Allow a admin to update the payrate of a tutor (ADMIN ONLY)

    Returns: none
    """
    myDb, myCursor = dbConnect()
    data = request.get_json()

    UpdateTutorPayrate(myCursor, myDb, data["tutor_id"], data["rate_id"])
    
    dbDisconnect(myCursor, myDb)
    return dumps({})


@APP.route("/tutor/profile/firstname", methods = ["PUT"])
def tutorFirstName():

    """
    Allow a tutor to update their first name 

    Returns: none
    """

    myDb, myCursor = dbConnect()
    data = request.get_json()

    updateTutorFirstName(myCursor, myDb, data["first_name"], data["tutor_id"])

    dbDisconnect(myCursor, myDb)
    return dumps({})


@APP.route("/tutor/profile/lastname", methods = ["PUT"])
def tutorLastName():

    """
    Allow a tutor to update their last name 

    Returns: none
    """

    myDb, myCursor = dbConnect()
    data = request.get_json()

    updateTutorLastName(myCursor, myDb, data["last_name"], data["tutor_id"])
    
    dbDisconnect(myCursor, myDb)
    return dumps({})


@APP.route("/tutor/profile/email", methods = ["PUT"])
def tutorEmail(): 
    
    """
    Allow a tutor to update their email 

    Returns: none
    """

    myDb, myCursor = dbConnect()
    data = request.get_json()

    updateTutorEmail(myCursor, myDb, data["email"], data["tutor_id"])
    
    dbDisconnect(myCursor, myDb)
    return dumps({})


@APP.route("/tutor/payment", methods = ["GET"])
def tutorPayment():

    myDb, myCursor = dbConnect()
    data = request.args 

    inSystem = checkCurrentTerm(myCursor, data["term_id"], data["tutor_id"])
    if not inSystem:
        createTermJSON(myDb, myCursor, data["term_id"], data["tutor_id"], dumps)

    res = getTermJSON(myDb, myCursor, data["term_id"], data["tutor_id"], loads)

    dbDisconnect(myCursor, myDb)
    return dumps({"term_data": res})


@APP.route("/tutor/payment/modify", methods = ["PUT"])
def modifyTutorPayment():
    
    myDb, myCursor = dbConnect()
    data = request.get_json()

    inSystem = checkCurrentTerm(myCursor, data["term_id"], data["tutor_id"])
    if inSystem:
        modifyTermJson(myDb, myCursor, data, dumps, loads)

    dbDisconnect(myCursor, myDb)
    return dumps({})


@APP.route("/tutor/admin/<u_id>", methods = ["GET"])
@validateCaller
def checkTutorAdmin(u_id):
    return dumps({})

# * CLASS ROUTES ===============================================================

@APP.route("/class/permission", methods = ["GET"])
def classPermission():

    myDb, myCursor = dbConnect()
    data = request.args

    res = getClassPermission(myCursor, data["class_id"], data["u_id"])

    dbDisconnect(myCursor, myDb)
    return dumps({"permission": res})


@APP.route("/class/data", methods = ["GET"])
def classData():

    myDb, myCursor = dbConnect()
    data = request.args
    
    res = getClassData(myCursor, data["class_id"])
    print(res)
    myCursor.close()
    myDb.close()
    return dumps({"class_data": res})


@APP.route("/class/add/<u_id>", methods = ["POST"])
@validateCaller
def classNew(u_id):

    """
    Allow an ADMIN to create a new class (ADMIN ONLY)

    Returns: none
    """

    myDb, myCursor = dbConnect()
    data = request.get_json()

    createNewClass(myCursor, myDb, data)

    dbDisconnect(myCursor, myDb)
    return dumps({})


@APP.route("/class/capacity", methods = ["GET"])
def classCapacity():

    """
    Retrieves the current capacity of a class

    Returns: dictionary of an integer
    """

    myDb, myCursor = dbConnect()
    data = request.args
    
    res = getClassCap(myCursor, data["class_id"])

    dbDisconnect(myCursor, myDb)
    return dumps({"class_capacity": res})


@APP.route("/class/students", methods = ["GET"])
def classStudents():

    myDb, myCursor = dbConnect()
    data = request.args

    res = getClassStudents(myCursor, data["class_id"])

    dbDisconnect(myCursor, myDb)
    return dumps({"students": res})


# check caller perms
@APP.route("/class/remove", methods = ["DELETE"])
def classRemove():

    """
    Allow an ADMIN to remove a class and subsequently remove all students from the class in the terms table 

    Returns: none
    """

    myDb, myCursor = dbConnect()
    data = request.get_json()

    print(data, "hello")

    RemoveClass(myCursor, myDb, data["class_id"])
    
    dbDisconnect(myCursor, myDb)
    return dumps({})


@APP.route("/class/tutor/<u_id>", methods = ["PUT"])
def classUpdateTutor(u_id):

    """
    Allow an ADMIN to update the tutor of a class

    Returns: none
    """

    myDb, myCursor = dbConnect()
    data = request.get_json()

    updateClassTutor(myCursor, myDb, data["class_id"], data["tutor_id"])
    
    dbDisconnect(myCursor, myDb)
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

    myDb, myCursor = dbConnect()

    updateClassDay(myCursor, myDb, data["class_id"], data["day"])

    dbDisconnect(myCursor, myDb)
    return dumps({})


@APP.route("/class/time/<u_id>", methods = ["PUT"])
def classUpdateTime(u_id):

    """
    Allow an ADMIN to update the start time of a class
    """

    data = request.get_json()

    if not validateTime(data["start_time"]):
        raise InputError(description = "start_time is of incorrect format")

    myDb, myCursor = dbConnect()

    updateClassStartTime(myCursor, myDb, data["class_id"], data["start_time"])

    dbDisconnect(myCursor, myDb)
    return dumps({})


@APP.route("/class/duration/<u_id>", methods = ["PUT"])
def classUpdateDuration(u_id):

    data = request.get_json()

    if not validateDuration(data["duration"]):
        raise InputError(description = "duration is of incorrect format")
    
    myDb, myCursor = dbConnect()
    
    updateClassDuration(myCursor, myDb, data["class_id"], data["duration"])

    dbDisconnect(myCursor, myDb)
    return dumps({})


# todo
@APP.route("/class/room/<u_id>", methods = ["PUT"])
def classUpdateRoom(u_id):
    pass

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

    myDb, myCursor = dbConnect()

    createNewStudent(myCursor, myDb, data)

    dbDisconnect(myCursor, myDb)
    return dumps({})


@APP.route("/student/remove/<u_id>", methods = ["DELETE"])
def removeStudent(u_id):

    data = request.get_json()

    if not validateStudentIdFormat(data["student_id"]):
        raise InputError(description = "student_id is of incorrect format")

    myDb, myCursor = dbConnect()

    deleteStudent(myCursor, myDb, data["student_id"])

    dbDisconnect(myCursor, myDb)
    return dumps({})


# * TERM ROUTES ================================================================ 

@APP.route("/term/add/<u_id>", methods = ["POST"])
def newTermItem(u_id):

    data = request.get_json()
    myDb, myCursor = dbConnect()

    if not validateStudentExists(myCursor, data["student_id"]):
        dbDisconnect(myCursor, myDb)
        raise InputError(description = "student does not exist")

    elif not validateClassExists(myCursor, data["class_id"]):
        dbDisconnect(myCursor, myDb)
        raise InputError(description = "class does not exist")

    createNewTermItem(myCursor, myDb, data["student_id"], data["class_id"])

    dbDisconnect(myCursor, myDb)
    return dumps({})


@APP.route("/term/remove/<u_id>", methods = ["DELETE"])
def removeTermItem(u_id):

    data = request.get_json()
    myDb, myCursor = dbConnect()

    if not validateStudentExists(myCursor, data["student_id"]):
        dbDisconnect(myCursor, myDb)
        raise InputError(description = "student does not exist")

    elif not validateClassExists(myCursor, data["class_id"]):
        dbDisconnect(myCursor, myDb)
        raise InputError(description = "class does not exist")
    
    deleteTermItem(myCursor, myDb, data["student_id"], data["term_id"])

    dbDisconnect(myCursor, myDb)
    return dumps({})


# * REQUEST ROUTES =============================================================

@APP.route("/request/new", methods = ["POST"])
def newRequest():

    data = request.get_json()
    myDb, myCursor = dbConnect()

    addNewRequest(myDb, myCursor, data)

    dbDisconnect(myCursor, myDb)

    return dumps({})


# ==============================================================================

if __name__ == '__main__':
    APP.run(port = 8080, threaded = True, debug = True)