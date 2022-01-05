import React from 'react';
import styled from 'styled-components';
import CalendarGrid from './CalendarGrid';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const CalendarContainer = () => {

    // todo need fixing 
    const getDateRange = () => {

        const date = new Date();

        let firstDate = date.getDate(); 
        let lastDate = firstDate; 
        
        let dayIndex1 = date.getDay();
        let dayIndex2 = dayIndex1;

        let lastDayOfMonth = (new Date(date.getFullYear(), date.getMonth() + 1, 0)).getDate();

        while (dayIndex1 > 1 || dayIndex2 <= 6) {

            if (dayIndex1 > 1 ) { 
                firstDate -= 1;
                dayIndex1 -= 1;
            }

            if (dayIndex2 <= 6) { 
                lastDate += 1; 
                dayIndex2 += 1;
            }
        }

        let nextMonth = false; 

        if (lastDate > lastDayOfMonth) {
            lastDate -= lastDayOfMonth;
            nextMonth = true;
        }

        if (nextMonth) { 

            let secondMonth = date.getMonth() + 1 > 11 ? date.getMonth() + 1 - 12 : date.getMonth() + 1;
            return `${monthNames[date.getMonth()]} ${firstDate} - ${monthNames[secondMonth]} ${lastDate}, ${date.getFullYear()} `;
        }

        return `${monthNames[date.getMonth()]} ${firstDate} - ${lastDate}, ${date.getFullYear()} `;
    }

    return (
        
        <div className = "calendar-container">
            
            <div className = "calendar-header"> 
                <p> { getDateRange() } </p>
            </div>

            <CalendarGrid />
       
        </div>
    )
}

export default CalendarContainer;
