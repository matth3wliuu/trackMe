import React from 'react';
import { hourCells, dayCells, gridCells, EmptyCell } from './Cells'; 

const CalendarLayout = () => {

    return (
        <>
            <div className = "calendar-layout">
                <EmptyCell key = { "empty" } rowStart = { 1 } col = { 1 } />
                { hourCells }
                { dayCells }
                { gridCells }
            </div>
        </>
        
    )
}

export default CalendarLayout;
