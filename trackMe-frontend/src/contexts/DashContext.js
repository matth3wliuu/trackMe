import React, { useState, useEffect, createContext, useContext } from 'react';
import AuthContext from './AuthContext';
import { tutorIdURL } from '../constants';
import api from '../api/config';

const DashContext = createContext();

export const DashProvider = ({ children }) => {
    
    const { currUser } = useContext(AuthContext)

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [contentBarItem, setContentBarItem] = useState("schedule");
    const [tutorId, setTutorId] = useState();
    const [isLoading, setIsLoading] = useState(false);

    // Use to axios to fetch the tutorId from the backend 
    useEffect( () => {

        const fetchTutorId = async () => {

            setIsLoading(true);

            try { 

                console.log(currUser.uid)
                const res = await api.get(`${tutorIdURL}`, {
                    params: {
                        "u_id": currUser.uid
                    }
                });

                setTutorId(res.data["tutor_id"][0]);
            }

            catch(err) {
                console.log(err.message);
            }

            finally {
                setIsLoading(false);
            }
        }

        fetchTutorId()

    }, []);

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
        tutorId
    };

    return (

        <DashContext.Provider value = { props }> 

            { !isLoading && children }

        </DashContext.Provider>
    );

};

export default DashContext;