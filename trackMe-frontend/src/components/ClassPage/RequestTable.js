import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const RequestTable = (props) => {

    const columns = [
        { field: "id", headerName: "Request ID", width: 125, align: "center", headerAlign: "center"},
        { field: "requestType", headerName: "Type", width: 125, align: "center", headerAlign: "center" },
        { field: "requestDate", headerName: "Date", width: 125, align: "center", headerAlign: "center" },
        { field: "requestStatus", headerName: "Status", width: 125, align: "center", headerAlign: "center"}
    ]

    // const rows = props.students.map( student => {
    //     return {
    //         id: student[0],
    //         firstName: student[1],
    //         lastName: student[2]
    //     }
    // })

    const rows = props.requests.map(request => {
        return {
            id: request[0],
            requestType: request[1], 
            requestDate: request[2],
            requestStatus: request[3] 
        };
    })


    return (
        
        <div style = {{ backgroundColor: "white" }}>
            
            <DataGrid
                rows = { rows }
                columns = { columns }
                pageSize = { 5 }
                rowsPerPageOptions = { [5] }
            />
           
        </div>
    )
}

export default RequestTable;