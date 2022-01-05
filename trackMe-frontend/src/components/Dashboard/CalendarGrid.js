import React, { useContext } from 'react';
import CalendarLayout from './CalendarLayout';
import { ClassCell } from './Cells';
import DashContext from '../../contexts/DashContext';

const CalendarGrid = () => {

    const { tutorClassesData } = useContext(DashContext);

    const room = "Maple";

    const gridItems = tutorClassesData && tutorClassesData.map( (tutorClass, idx) => {

        return (

            <ClassCell 
                key = { `classCell-${idx}`}
                rowStart = { tutorClass[5] }
                rowTo = { tutorClass[6] }
                col = { tutorClass[4] }
            >
                <p> { tutorClass[0] } </p>
                <p> Room: { room } </p>

            </ClassCell>
        )

    });


    return (

        <div className = "calendar-grid">

            <CalendarLayout />

            { gridItems } 

        </div>
    )
}

export default CalendarGrid;
