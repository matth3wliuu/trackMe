import React from 'react';
import styled from 'styled-components';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { GeneralContainer, ContentContainer, ClassActionsContainer } from './containers';

const TestClasses = (props) => {

    const classColumns = [ 
        { field: "id", headerName: "Class ID", width: 150, align: "center", headerAlign: "center" }, 
        { field: "subjectName", headerName: "Subject" , width: 150, align: "center", headerAlign: "center"}, 
        { field: "classCapacity", headerName: "Capacity", width: 150, align: "center", headerAlign: "center"}
    ];

    const classRows = [{"id": "helloWorld" }];

    const studentsColumns = [
        { field: "id", headerName: "Student ID", width: 150, align: "center", headerAlign: "center" },
        { field: "studentName", headerName: "Name", width: 150, align: "center", headerAlign: "center" },
        { field: "studentGrade", headerName: "Grade", width: 150, align: "center", headerAlign: "center" }
    ];

    const studentsRows = [];

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
                />

                <ClassActionsContainer> 

                    <Button variant = "contained"> Add Class </Button>
                    <Button variant = "contained"> Remove Class </Button>
                    <Button variant = "contained"> Modify Class </Button>

                </ClassActionsContainer>

            </ContentContainer>

            <ContentContainer> 
                
                <NameTag tutorName = "Matthew Liu" tutorId = "t1000000" />

                <DataGrid
                    columns = { studentsColumns }
                    rows = { studentsRows }
                    pageSize = { 5 }
                    rowsPerPageOptions = { [5] }
                    sx = { { height: "60%", marginTop: "0.75rem" } }
                />

            </ContentContainer>

        </GeneralContainer>

    );
};

export default TestClasses
