import React, { useState, useEffect, createContext, useContext } from 'react';
import AuthContext from './AuthContext';
import { tutorIdURL, tutorClassesURL } from '../constants';
import api from '../api/config';

const DashContext = createContext();

export const DashProvider = ({ children }) => {
    
    const { currUser } = useContext(AuthContext)

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [contentBarItem, setContentBarItem] = useState("schedule");
    const [tutorId, setTutorId] = useState();
    const [tutorClassesData, setTutorClassesData] = useState();
    const [isLoading, setIsLoading] = useState(false);

    // Using  axios to fetch the tutorId from the backend 
    useEffect( () => {
        
        const fetchTutorId = async () => {
            setIsLoading(true);
            try { 
                const res = await api.get(`${tutorIdURL}`, {
                    params: { "u_id": currUser.uid }
                });
                setTutorId(res.data["tutor_id"][0]);
            }
            catch(err) {
                console.log(err.message);
            }
            finally {
                setIsLoading(false);
            };
        };

        fetchTutorId()

    }, []);

    // using axios to fetch data about the tutor's classes
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

    
    // Event listener closes the dropdown menu whenever user clicks elsewhere on the screen
    useEffect( () => {

        const handleClickOutside = (e) => {
            e.preventDefault();
            e.target.className !== "dropdown-items" && setDropdownOpen(false);
        };
        
        window.addEventListener("mousedown", handleClickOutside);

        return () => window.removeEventListener("mousedown", handleClickOutside) ;

    }, []);

    const props = { 
        dropdownOpen, 
        setDropdownOpen, 
        contentBarItem,
        setContentBarItem,
        tutorId, 
        tutorClassesData
    };

    return (

        <DashContext.Provider value = { props }> 

            { !isLoading && children }

        </DashContext.Provider>
    );

};

export default DashContext;