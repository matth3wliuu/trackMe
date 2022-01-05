import React from 'react'
import CalendarLayout from './CalendarLayout';
import { ClassCell } from './Cells';


const CalendarGrid = () => {

    const classCode = "MA12-EXT2-MLIU-A";
    const room = "Maple";

    return (

        <div className = "calendar-grid">

            <CalendarLayout />

            <ClassCell 
                key = { "testing" } 
                rowStart = { 6 }
                rowTo = { 14 }
                col = { 7 }
            > 
                <p> { classCode } </p>
                <p> Room: { room } </p>

            </ClassCell>

        </div>
    )
}

export default CalendarGrid;
