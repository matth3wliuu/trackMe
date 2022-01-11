import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import api from '../../api/config';

const ClassPageBody = styled.div`
    width: 96%;
    margin: auto;
    margin-top: 1.5rem;
    display: flex;
    height: 100vh;
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
`;

const ClassPageContent = () => {
    
    const { class_id } = useParams();
    const [classData, setClassData] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect( () => {

        const fetchClassData = async () => {
            
            setIsLoading(true);

            try {
                const res = await api.get("/class/data", { 
                    params: {
                        "class_id": class_id
                    } 
                });
                setClassData(res.data["class_data"]);

            }
            catch (err) {
                console.log(err.message);
            }
            finally {
                setIsLoading(false);
            }

        };

        fetchClassData();

        const cleanUp = () => {
            setIsLoading(false);
        }
        return cleanUp;

    }, []);

    classData && console.log(classData);

    return (

        <ClassPageBody> 

            { classData && <ClassInfo  >

                    <p> { classData[0] } </p>
                    <p> Subject: { classData[2] } </p>
                    <p> Year: { classData[3] } </p>
                    <p> Day: { classData[4] } </p>
                    <p> Time: { classData[5] } - { classData[6] } </p>
                    <p> Room: { classData[7] } </p> 

            </ClassInfo> }

        </ClassPageBody>
    )

};

export default ClassPageContent;

