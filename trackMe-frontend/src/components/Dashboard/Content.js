import React, { useContext } from 'react'
import ContentBar from './ContentBar';
import ContentBody from './ContentBody';
import DashContext from '../../contexts/DashContext';


const Content = () => {

    const { tutorId } = useContext(DashContext);

    return (

        <div className = "dashboard-body">

            <ContentBar /> 
            <ContentBody /> 
            
        </div>
        
    )
}

export default Content
