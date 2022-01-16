import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const StudentsTable = (props) => {

    const columns = [
        { field: "id", headerName: "Student ID", width: 150, align: "center", headerAlign: "center"},
        { field: "firstName", headerName: "First Name", width: 175, align: "center", headerAlign: "center"},
        { field: "lastName", headerName: "Last Name", width: 175, align: "center", headerAlign: "center" }
    ]

    const rows = props.students.map( student => {
        return {
            id: student[0],
            firstName: student[1],
            lastName: student[2]
        }
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

export default StudentsTable;