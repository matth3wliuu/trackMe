import React, { useContext } from "react";
import DashContext from "../../contexts/DashContext";
import { currTerm } from "../../constants";

const ClassCards = () => {

    const { tutorClassesData } = useContext(DashContext);

    const ClassCard = (props) => { 

        return (

            <li className = "class-card"> 
                
                <p className = "class-subject"> <b> { props.subject } </b>  </p>
                <p className = "class-term"> <i> { `Term ${props.term}, ${ new Date().getFullYear() }` } </i> </p>
                <p className = "class-id"> { `Class Code: ${props.id}` } <br /> </p>
                <p className = "class-cap"> { `Capacity: ${props.cap}` } </p>
                <p className = "class_grade"> {`Year: ${props.grade}` } </p>
            
            </li>
        )
    }

    const listItems = tutorClassesData && tutorClassesData.map( (tutorClass) => {
        
        return (
            
            <ClassCard 
                key = { tutorClass[0] }
                id = { tutorClass[0] }
                subject = { tutorClass[1] }
                term = { currTerm }
                cap = { tutorClass[2] }
                grade = { tutorClass[3] }
            />
        )
    });

    return (

        <div className = "class-cards-containter">
            
            <ul className = "class-cards">

                { listItems }

            </ul>

        </div>
    )
}

export default ClassCards
