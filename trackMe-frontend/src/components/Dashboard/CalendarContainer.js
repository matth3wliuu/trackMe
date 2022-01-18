import React, { useState ,useEffect } from 'react';
import CalendarGrid from './CalendarGrid';
import styled from 'styled-components';
import { uiDataURL } from '../../constants';
import api from '../../api/config';

const Container = styled.div`
    width: 96%;
    height: 600px;
    margin: auto;
    background-color: white;
    border-radius: 6px;
    box-shadow: 0px 1px 5px #888888;
    padding: 1rem;
    transform: translateY(5%);
`;

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
        fetchWeekString();
        return () => setIsLoading(false);
    }, []);
    
    return (
        
        <Container> 
            
            <div className = "calendar-header"> <p> { weekString } </p> </div>
            { !isLoading && <CalendarGrid /> }
       
        </Container>
    )
}

export default CalendarContainer;
