import React, { useEffect, useState } from 'react';
import api from '../api/config';

const fetchClassData = (controller, class_id) => {
    return api.get("/class/data", {
        params: { "class_id": class_id },
        signal: controller.signal
    });
};

const fetchStudents = (controller, class_id)  => {
    return api.get("/class/students", { 
        params: { "class_id": class_id },
        signal: controller.signal
    });
};

const fetchRequests = (controller, tutor_id) => {
    return api.get("/tutor/requests", {
        params: { "tutor_id": tutor_id }, 
        signal: controller.signal
    });
};


const Test = () => {

    const class_id = "MAT12EXT1-MLI-A";
    const tutor_id = "t10000000";
    const [classData, setClassData] = useState();
    const [students, setStudents] = useState();
    const [requests, setRequests] = useState();

    useEffect(() => {
        
        const controller = new AbortController();

        const promises = [ 
            fetchClassData(controller, class_id), 
            fetchStudents(controller, class_id),
            fetchRequests(controller, tutor_id)
        ];

        const fetchData = async () => {


            try {
                const res = await Promise.all(promises);
                setClassData(res[0].data["class_data"]);
                setStudents(res[1].data["students"]);
                setRequests(res[2].data["requests"])
            }
            catch (err) {
                console.error(err.message);
            }
        }

        class_id && tutor_id && fetchData();
        return () => controller.abort();

    }, [class_id, tutor_id]);

    return (

        <div>
            { students }
        

        </div>
    )
}

export default Test
