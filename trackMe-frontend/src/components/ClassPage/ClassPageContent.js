import React, { useEffect, useState, useContext } from 'react';
import DashContext from "../../contexts/DashContext";
import axios from 'axios';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import api from '../../api/config';
import StudentTable from './StudentsTable';
import RequestTable from './RequestTable';
import Button from '@mui/material/Button';
import Popup from './Popup';

const ClassPageBody = styled.div`
    display: grid;
    width: 96%;
    height: 600px;
    margin: auto;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    grid-template-rows: 185px;
    grid-template-columns: 48.5% 48.5%;
    row-gap: 0px;
    column-gap: 3%;
`;

const ClassInfo = styled.div`
    min-width: 380px;
    height: 165px;
    font-size: 12px;
    padding: 12px;
    background-color: #FAF9F6;
    box-shadow: 0px 1px 2.5px #888888;
    border-radius: 4px;
    display: grid;
    font-size: 14px;
    line-height: 1.25rem;
`;

const ClassActions = styled(ClassInfo)`
    grid-column: 2;
    grid-row: 1;
    row-gap: 12px;
`;

const StudentsContainer = styled(ClassInfo)`
    height: 60vh;
`;

const RequestHistory = styled(StudentsContainer)`
    grid-column: 2;
    grid-row: 2;
`;

const buttonStyle = {
    width: "max-content",
    color: "black", 
    backgroundColor: "#F1F5F9"
};

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
        params: { "tutor_id": tutor_id}, 
        signal: controller.signal
    });
};

const ClassPageContent = () => {
    
    const { class_id } = useParams();
    const { tutorId, isLoading } = useContext(DashContext);

    const [classData, setClassData] = useState();
    const [students, setStudents] = useState();
    const [requests, setRequests] = useState();

    const [transferOpen, setTransferOpen] = useState(false);
    const [dropOpen, setDropOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [popupType, setPopupType] = useState();

    useEffect(() => {

        if (!tutorId || !class_id) return;
        const controller = new AbortController();

        const promises = [ 
            fetchClassData(controller, class_id), 
            fetchStudents(controller, class_id),
            fetchRequests(controller, tutorId)
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
            };
        };

        fetchData();
        return () => controller.abort();

    }, [tutorId, class_id]);

    return (

        <ClassPageBody> 

            { classData && 
                <ClassInfo>
                    <p style = { { "fontSize": "18px" } }> <b> { classData[0] } </b> </p> <br />
                    <p> <b> Subject: </b> { classData[2] } </p>
                    <p> <b> Year: </b> { classData[3] } </p>
                    <p> <b> Day: </b> { classData[4] } </p>
                    <p> <b> Time: </b> { classData[5] } - { classData[6] } </p>
                    <p> <b> Room: </b> { classData[7] } </p> 
                </ClassInfo> 
            }
            
            { students && 
                <StudentsContainer> <StudentTable students = { students } /> </StudentsContainer> 
            }

            <ClassActions> 
                
                <Button 
                    variant = "contained" 
                    style = { buttonStyle } 
                    onClick = { () => {
                        setTransferOpen(true);
                        setPopupType("transfer");
                    } }
                > 
                    Transfer Hours Request 
                </Button>

                <Button 
                    variant = "contained" 
                    style = { buttonStyle }
                    onClick = { () => { 
                        setDropOpen(true);
                        setPopupType("drop");
                    } }
                > 
                    Drop Hours Request 
                </Button>

                <Button 
                    variant = "contained" 
                    style = { buttonStyle }
                    onClick = { () => {
                        setAddOpen(true);
                        setPopupType("add");
                    }}
                > 
                    Add Hours Request 
                </Button>

            </ClassActions>
            
            { requests && 
                <RequestHistory>  <RequestTable requests = { requests }/> </RequestHistory> 
            }

            <Popup open = { transferOpen } setPopupOpen = { setTransferOpen } popupType = { popupType } />
            <Popup open = { addOpen } setPopupOpen = { setAddOpen } popupType = { popupType } />
            <Popup open = { dropOpen } setPopupOpen = { setDropOpen } popupType = { popupType} />
            
        </ClassPageBody>
    
    )

};

export default ClassPageContent;

