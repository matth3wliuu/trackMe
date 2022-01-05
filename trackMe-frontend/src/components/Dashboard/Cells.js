import React from 'react';
import styled from 'styled-components';

// BaseCell has attributes: 
// row: number 
// rowTo: number 
// col: number 
// isRowEdge: boolean
// isColEdge: boolean

const BaseCell = styled.div.attrs(props => ({
    rowStart: props.rowStart,
    rowTo: props.rowTo, 
    col: props.col, 
    isRowEdge: props.isRowEdge,
    isColEdge: props.isColEdge,
}))`
    grid-column: ${ props => props.col };
    grid-row: ${ props => props.rowStart } / ${ props => props.rowTo || props.rowStart };
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    gap: 6px;

    border-top-left-radius: ${ props => props.rowStart === 1 && props.col === 1 ? 6 : 0}px;
    border-top-right-radius: ${ props => props.rowStart === 1 && props.isColEdge ? 6 : 0}px;
    border-bottom-left-radius: ${ props => props.isRowEdge && props.col === 1 ? 6 : 0}px;
    border-bottom-right-radius: ${ props => props.isRowEdge && props.isColEdge ? 6 : 0}px;
`;

export const EmptyCell = styled(BaseCell)`
    border: 1px solid black;
`;

const HourCell = styled(BaseCell)`
    border-bottom: 1px solid black;
    border-left: 1px solid black;
    border-right: 1px solid black;
`;

const DayCell = styled(BaseCell)`
    border-bottom: 1px solid black;
    border-top: 1px solid black;
    border-right: 1px solid black;
`;

const GridCell = styled(BaseCell)`
    border-bottom: 1px solid black;
    border-right: 1px solid black;
`;

export const ClassCell = styled(BaseCell)`
    background-color: lightgreen;
    height: 95%;
    width: 95%;
    margin: auto;
    border-radius: 4px;
    z-index: 10;
    grid-row-start: ${ props => props.rowStart };
    grid-row-end: ${ props => props.rowTo };
    font-size: 12px;
    display: grid;
    justify-items: center;
`;

const generateHour = (n) => {
    var end = n < 12 ? "am" : "pm";
    return `${ n > 12 ? n - 12 : n } ${end}`;
};

const generateHours = (start, end) => {

    const hours = [];
    for (var i = start; i <= end; i++) {
        hours.push(generateHour(i));
    }
    return hours;
};

const hours = generateHours(9 , 18);

export const hourCells = hours.map( (hour, i) => {
   
    return(
        <HourCell
            key = { hour }
            rowStart = { i + 2 }
            col = { 1 }
            isRowEdge = { i === hours.length  - 1 }
        > 
            { hour }

        </HourCell>
    )
});

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export const dayCells = weekDays.map( (day, i) => {

    return ( 

        <DayCell
            key = { day }
            rowStart = { 1 }
            col = { i + 2 }
            isColEdge = { i === weekDays.length - 1 }
        > 

            { day }

        </DayCell>
    );

});

export const gridCells = hours.map( (_, i) => weekDays.map( (_, j) => {
    
    return ( 

        <GridCell 
            key = { i + 2 * (j + 1) + 1024 }
            rowStart = { i + 2 }
            col = { j + 2 }
            isColEdge = { j === weekDays.length - 1 }
            isRowEdge = { i === hours.length - 1 }
        /> 

    )

}));

