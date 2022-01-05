

def generateClassId(classIds, firstName, lastName, subjectId):

    initials = (firstName[0] + lastName[0: 2]).upper()
    classId = f"{subjectId}-{initials}-A"

    suffix = ord("B")
    while [classId] in classIds:
        classId = classId[0: -1] + chr(suffix)
        suffix += 1
    
    return classId 
