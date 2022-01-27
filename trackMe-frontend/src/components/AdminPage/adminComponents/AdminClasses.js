import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import styled from 'styled-components';
import { GeneralContainer, ContentContainer, ActionsContainer } from '../../StyledComponents/styledContainers';
import api from '../../../api/config';

const AdminClasses = (props) => {

    const { adminClassesData, setPopupOpen } = props;
    const [adminStudents, setAdminStudents] = useState([]);
    const [selectedClass, setSelectedClass] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect( () => {

        if (selectedClass === undefined) return;

        const controller = new AbortController();

        const fetchData = async () => {

            try {
                const res = await api.get("/class/students", {
                    params: { "class_id": selectedClass },
                    signal: controller.signal
                });
                setAdminStudents(res.data["students"]);
            }
            catch (err) {
                console.log(err.message);
            }
            finally {
            };
        };

        fetchData();

        return () => {
            controller.abort();
        };

    }, [selectedClass]);


    const classColumns = [ 
        { field: "id", headerName: "Class ID", width: 150, align: "center", headerAlign: "center" }, 
        { field: "subjectName", headerName: "Subject" , width: 150, align: "center", headerAlign: "center"}, 
        { field: "classCapacity", headerName: "Capacity", width: 150, align: "center", headerAlign: "center"}
    ];

    const classRows = adminClassesData.map( adminClass => {
        return {
            id: adminClass[0],
            subjectName: adminClass[2],
            classCapacity: adminClass[8]
        }
    })

    const studentsColumns = [
        { field: "id", headerName: "Student ID", width: 150, align: "center", headerAlign: "center" },
        { field: "studentName", headerName: "Name", width: 150, align: "center", headerAlign: "center" },
        { field: "studentGrade", headerName: "Grade", width: 150, align: "center", headerAlign: "center" }
    ];

    const studentsRows = adminStudents.map(adminStudent => {
        return {
            id: adminStudent[0],
            studentName: `${adminStudent[1]} ${adminStudent[2]}`,
            studentGrade: adminStudent[3]
        };
    });

    const NameTag = (props) => {

        const { tutorName, tutorId } = props;

        return (
            <p> <b> Tutor: </b>{`${tutorName} (${tutorId}) `} </p>
        );
    };

    return (

        <GeneralContainer>

            <ContentContainer> 

                <DataGrid
                    columns = { classColumns }
                    rows = { classRows }
                    pageSize = { 5 }
                    rowsPerPageOptions = { [5] }
                    sx = { { height: "60%" } }
                    loading = { adminClassesData === undefined }
                    onSelectionModelChange = { (newSelection) => setSelectedClass(newSelection[0]) }
                />

                <ActionsContainer> 

                    <Button 
                        variant = "contained"
                        onClick = { () => setPopupOpen("add class") }
                    > 
                        Add Class
                    </Button>

                    <Button 
                        variant = "contained"
                        onClick = { () => setPopupOpen("remove class") }
                    >
                        Remove Class 
                    </Button>

                    <Button 
                        variant = "contained"
                        onClick = { () => setPopupOpen("modify class") }
                    > 
                        Modify Class 
                    </Button>

                </ActionsContainer>

            </ContentContainer>

            <ContentContainer> 
                
                <NameTag tutorName = "Matthew Liu" tutorId = "t1000000" />

                <DataGrid
                    columns = { studentsColumns }
                    rows = { studentsRows }
                    pageSize = { 5 }
                    rowsPerPageOptions = { [5] }
                    sx = { { height: "60%", marginTop: "0.75rem" } }
                    loading = { isLoading }
                />

            </ContentContainer>

        </GeneralContainer> 
    );
};

export default AdminClasses;
