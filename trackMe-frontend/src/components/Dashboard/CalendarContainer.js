import React, { useState ,useEffect } from 'react';
import CalendarGrid from './CalendarGrid';
import styled from 'styled-components';
import { uiDataURL } from '../../constants';
import api from '../../api/config';

const CalendarContainer = () => {

    const [weekString, setWeekString] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        const fetchWeekString = async () => {

            setIsLoading(true);
            
            try {
                const res = await api.get(`${ uiDataURL }`);
                setWeekString(res.data["current_week"]);
            }
            catch (err) {
                console.log(err.message)
            }
            finally {
                setIsLoading(false);
            }
        }

        fetchWeekString()
        
        const cleanUp = () => {
            setIsLoading(false);
        }

        return cleanUp;

    }, [])
    

    return (
        
        <div className = "calendar-container">
            
            <div className = "calendar-header"> 
                <p> { weekString } </p>
            </div>

            { !isLoading && <CalendarGrid /> }
       
        </div>
    )
}

export default CalendarContainer;
