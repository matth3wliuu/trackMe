import React, { useContext } from 'react';
import DashContext from '../../contexts/DashContext'
import CalendarContainer from './CalendarContainer';
import PaymentContainer from './PaymentContainer';

const ContentBody = () => {

    const { contentBarItem } = useContext(DashContext);

    return (

        <div className = "content-body">
            
            { contentBarItem === "schedule" && <CalendarContainer /> }
            { contentBarItem === "payments" && <PaymentContainer /> }
            
        </div>
    )
}

export default ContentBody
