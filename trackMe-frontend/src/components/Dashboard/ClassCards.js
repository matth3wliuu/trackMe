import React, { useEffect, useContext, useState } from "react";
import DashContext from "../../contexts/DashContext";
import api from "../../api/config";
import { tutorClassesURL, currTerm } from "../../constants";

const ClassCards = () => {

    const { tutorId } = useContext(DashContext);
    const [tutorClassesData, setTutorClassesData] = useState();
    const [isLoading, setIsLoading] = useState(false);

    // Use axios to fetch the class data once the tutorId has been loaded in (USE isLoading in future)
    useEffect( () => {

        const fetchTutorClasses = async () => {

            if (!tutorId) return;

            setIsLoading(true);

            try {
                const res = await api.get(`${tutorClassesURL}`, {
                    params: {
                        "tutor_id": tutorId
                    }
                });

                setTutorClassesData(res.data["classes"])
            }

            catch (error) {
                console.log(error);
            }

            finally {
                setIsLoading(false);
            }

        };

        fetchTutorClasses()

        const cleanUp = () => {
            setIsLoading(false);
        }

        return cleanUp;

    }, [tutorId]);

    const ClassCard = (props) => { 

        return (

            <li className = "class-card"> 
                
                <p className = "class-subject"> <b> { props.subject } </b>  </p>
                <p className = "class-term"> <i> { `Term ${props.term}, ${ new Date().getFullYear() }` } </i> </p>
                <p className = "class-id"> { `Class Code: ${props.id}` } <br /> </p>
                <p className = "class-cap"> { `Capacity: ${props.cap}` } </p>
            
            </li>
        )
    }

    const listItems = tutorClassesData && tutorClassesData.map( (tutorClass) => {
        return (
            <ClassCard 
                key = { tutorClass[0] }
                id = { tutorClass[2] }
                subject = { tutorClass[2] }
                term = { currTerm }
                cap = { 5 }
            />
        )
    });

    console.log(tutorClassesData);
    return (

        <div className = "class-cards-containter">
            
            <ul className = "class-cards">


                { !isLoading && listItems}


                {/* <ClassCard 
                    id = "MA12-EXT2-MLIU-A"
                    subject = "Mathematics Extension II"
                    term = "3"
                    cap = "16"

                />

                <ClassCard 
                    id = "MA12-EXT2-MLIU-A"
                    subject = "Mathematics Extension II"
                    term = "3"
                    cap = "16"
                />

                <ClassCard 
                    id = "MA12-EXT2-MLIU-A"
                    subject = "Mathematics Extension II"
                    term = "3"
                    cap = "16"
                />

                <ClassCard 
                    id = "MA12-EXT2-MLIU-A"
                    subject = "Mathematics Extension II"
                    term = "3"
                    cap = "16"
                /> */}
  
            </ul>

        </div>
    )
}

export default ClassCards
