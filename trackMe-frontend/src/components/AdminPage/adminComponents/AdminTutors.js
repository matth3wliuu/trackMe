import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import styled from 'styled-components';
import { GeneralContainer, ContentContainer, ActionsContainer } from '../../StyledComponents/styledContainers';
import ClassCards from '../../Dashboard/ClassCards';


const AdminTutors = () => {

    const tutorsColumns = [
        { field: "tutorId", headerName: "Tutor ID", width: 150, align: "center", headerAlign: "center" },
        { field: "tutorName", headerName: "Name", width: 150, align: "center", headerAlign:  "center" },
        { field: "numClasses", headerName: "Classes", width: 150, align: "center", headerAlign: "center" }
    ];
    const tutorsRows = [];

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
                    columns = { tutorsColumns }
                    rows = { tutorsRows }
                    pageSize = { 5 }
                    rowsPerPageOptions = { [5] }
                    sx = { { height: "60%" } }
                />

                <ActionsContainer> 

                    <Button variant = "contained"> Add Tutor </Button>
                    <Button variant = "contained"> Remove Tutor </Button>
                    <Button variant = "contained"> Modify Tutor </Button>
            
                </ActionsContainer>

            </ContentContainer>

            <ContentContainer>

                <NameTag tutorName = "Matthew Liu" tutorId = "t1000000" />    

                <ClassCards />
                
            </ContentContainer> 

        </GeneralContainer>
    );
};

export default AdminTutors
