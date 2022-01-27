import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import styled from 'styled-components';
import { GeneralContainer, ContentContainer, ActionsContainer } from '../../StyledComponents/styledContainers';
import ClassCards from '../../Dashboard/ClassCards';

const RequestInfoStyle = styled.div`
    width: 100%;
    border: 1px solid #D3D3D3;
    padding: 0.75rem;
    border-radius: 6px;
`;

const RequestReasonStyle = styled(RequestInfoStyle)`
    height: 65%;
    margin-top: 0.75rem;
`;


const AdminRequests = (props) => {

    const RequestInfo = (props) => {
        return (
            <RequestInfoStyle> 
                <p style = {{fontSize: "0.85rem"}}> <b> Class ID: </b> </p>
                <p style = {{fontSize: "0.85rem"}}> <b> Subject: </b> </p>
                <p style = {{fontSize: "0.85rem"}}> <b> Date Received: </b> </p>
            </RequestInfoStyle>
        )
    };

    const RequestReason = (props) => {
        return (
            <RequestReasonStyle> 
                Hello World
            </RequestReasonStyle>
        )
    };

    const requestsColumns = [
        { field: "requestId", headerName: "Request ID", width: 150, align: "center", headerAlign: "center" },
        { field: "tutorName", headerName: "Tutor", width: 150, align: "center", headerAlign: "center" },
        { field: "requestStatus", headerName: "Status", width: 150, align: "center", headerAlign: "center" }
    ];
    const requestsRows = [];

    return (
    
        <GeneralContainer> 

            <ContentContainer> 

                <DataGrid 
                    columns = { requestsColumns }
                    rows = { requestsRows }
                    pageSize = { 5 }
                    rowsPerPageOptions = { [5] }
                    sx = { { height: "60%" } }
                />

            </ContentContainer>

            <ContentContainer> 

                <RequestInfo />

                <RequestReason />

                <ActionsContainer>

                    <Button variant = "contained" sx = {{width: "48%"}}> Approve Request </Button>
                    <Button variant = "contained" sx = {{width: "48%"}}> Deny Request </Button>

                </ActionsContainer>

            </ContentContainer>

        </GeneralContainer>
    );
};

export default AdminRequests
