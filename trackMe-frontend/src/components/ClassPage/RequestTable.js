import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const RequestTable = (props) => {

    const columns = [
        { field: "id", headerName: "Request ID", width: 150, align: "center", headerAlign: "center"},
        { field: "requestStatus", headerName: "Status", width: 175, align: "center", headerAlign: "center"},
        { field: "requestDate", headerName: "Date", width: 175, align: "center", headerAlign: "center" }
    ]

    // const rows = props.students.map( student => {
    //     return {
    //         id: student[0],
    //         firstName: student[1],
    //         lastName: student[2]
    //     }
    // })

    return (
        
        <div style = {{ backgroundColor: "white" }}>
            
            <DataGrid
                rows = { [] }
                columns = { columns }
                pageSize = { 5 }
                rowsPerPageOptions = { [5] }
            />
           
        </div>
    )
}

export default RequestTable;