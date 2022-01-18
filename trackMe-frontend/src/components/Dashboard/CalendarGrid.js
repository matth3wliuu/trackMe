import React, { useContext } from 'react';
import CalendarLayout from './CalendarLayout';
import { ClassCell } from './Cells';
import DashContext from '../../contexts/DashContext';

const colours = { 
    "MAT": "#DFF5E0",
    "ENG": "F5DFDF",
    "PHY": "#DFEFF5",
    "CHE": "#EEDFF5",
    "OTHER": "#B1907F"
};

const getColour = (subject) => {
    return Object.keys(colours).includes(subject) ? colours[subject] : colours["OTHER"];
};

const CalendarGrid = () => {

    const { classData } = useContext(DashContext);

    const gridItems = classData && classData.map( (tutorClass, idx) => {
        
        return (
            <ClassCell 
                key = { `classCell-${idx}`}
                rowStart = { tutorClass[5] }
                rowTo = { tutorClass[6] }
                col = { tutorClass[4] }
                bgColour = { getColour(tutorClass[0].slice(0, 3)) }
            >
                <p style = { {color: "#34495E "} }> <b> { tutorClass[0] } </b> </p>
                <p style = { {color: "#34495E "} }> <b> Room: { tutorClass[7] } </b> </p>
            </ClassCell>
        );
    });

    return (
        <div className = "calendar-grid">
            <CalendarLayout />
            { gridItems } 
        </div>
    );

};

export default CalendarGrid;
