import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import api from '../../api/config';

const ClassPageBody = styled.div`
    width: 96%;
    height: 600px;
    margin: auto;
    margin-top: 1.5rem;
    display: grid;
    margin-bottom: 1rem;
    row-gap: 0px;
    grid-template-rows: 155px;
`;

const ClassInfo = styled.div`
    width: calc(100% / 3);
    min-width: 380px;
    height: max-content;
    font-size: 12px;
    padding: 7px;
    background-color: #FAF9F6;
    box-shadow: 0px 1px 2.5px #888888;
    border-radius: 4px;
    display: grid;
    font-size: 14px;
`;

const StudentsContainer = styled(ClassInfo)`
    height: 45vh;
    overflow-y: scroll;
    grid-template-rows: 2.5rem;
`;

const StudentsList = styled.ul`
    height: max-content;
`;

const ClassPageContent = () => {
    
    const { class_id } = useParams();
    const [classData, setClassData] = useState();
    const [students, setStudents] = useState();

    useEffect( () => {

        const controller = new AbortController();

        const fetchClassData = async () => {

            try {
                const res = await api.get("/class/data", { 
                    params: {
                        "class_id": class_id
                    }, 
                    signal: controller.signal
                });
                setClassData(res.data["class_data"]);
            }

            catch (err) {
                console.log(err.message);
            }
        };

        fetchClassData();

        return () => controller.abort();

    }, [class_id]);

    useEffect( () => { 

        const controller = new AbortController();
        const fetchStudents = async () => {

            try {
                const res = await api.get("/class/students", { 
                    params: {
                        "class_id": class_id
                    },
                    signal: controller.signal

                });
                setStudents(res.data["students"])
            }

            catch(err) {
                console.log(err.message);
            }
        };

        fetchStudents();

        return () => controller.abort();

    }, [class_id]);


    const listItems = students && students.map( student => {

        return (
            <li style = { {"fontSize": "16px"} }> { student[0] } { student[1] } </li>
        );
    });


    return (

        <ClassPageBody> 

            { classData && <ClassInfo>

                <p style = { { "fontSize": "18px" } }> <b> { classData[0] } </b> </p> <br />
                <p> <b> Subject: </b> { classData[2] } </p>
                <p> <b> Year: </b> { classData[3] } </p>
                <p> <b> Day: </b> { classData[4] } </p>
                <p> <b> Time: </b> { classData[5] } - { classData[6] } </p>
                <p> <b> Room: </b> { classData[7] } </p> 

            </ClassInfo> }
            
            { students && <StudentsContainer> 
                
                <p style = { {"fontSize": "18px" } }> <b> Students </b> </p> 
                
                <StudentsList> { listItems } </StudentsList>

            </StudentsContainer> }

        </ClassPageBody>
    )

};

export default ClassPageContent;

