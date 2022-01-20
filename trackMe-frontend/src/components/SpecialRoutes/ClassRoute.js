import React, { useContext, useState, useEffect, useRef } from 'react'; 
import { Navigate, useParams } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import api from '../../api/config';

export default function ClassRoute({ children }) {

    const { currUser } = useContext(AuthContext);
    const { class_id } = useParams();
    const [tutorPermission, setTutorPermission] = useState();
    const raisedAlert = useRef(false);

    useEffect( () => {
        const fetchPermission = async () => {
            try {
                const res = await api.get("/class/permission", { 
                    params: {
                        "u_id": currUser.uid, 
                        "class_id": class_id
                    }
                });
                setTutorPermission(res.data["permission"] == class_id);
            }
            catch (err) {
                console.log(err);
            };
        };
        fetchPermission();
    }, [ ]);

    if (tutorPermission != undefined) {
        if (tutorPermission != true && raisedAlert.current == false) {
            alert("Tutor does not have access to this class.");
            raisedAlert.current = true;
        };
        return tutorPermission == true ? children : <Navigate to = "/" />;
    }
    else {
        return <p> Loading... </p>
    };
};