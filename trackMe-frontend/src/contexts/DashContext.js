import React, { useState, useEffect, createContext, useContext } from 'react';
import AuthContext from './AuthContext';
import { tutorIdURL, tutorClassesURL } from '../constants';
import api from '../api/config';

const DashContext = createContext();

const fetchClasses = (controller, u_id) => {
    return api.get("/tutor/classes", {
        params: { "u_id": u_id },
        signal: controller.signal
    });
};

const fetchTutorProfile = (controller, u_id) => {
    return api.get("/tutor/profile", {
        params: { "u_id": u_id },
        signal: controller.signal
    });
};

export const DashProvider = ({ children }) => {
    
    const { currUser } = useContext(AuthContext);

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [contentBarItem, setContentBarItem] = useState("schedule");

    const [classesData, setClassesData] = useState();
    const [tutorProfile, setTutorProfile] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        const controller = new AbortController();
        const promises = [
            fetchTutorProfile(controller, currUser.uid),
            fetchClasses(controller, currUser.uid)
        ];

        const fetchData = async () => {
            try {
                const res = await Promise.all(promises);
                setTutorProfile(res[0].data["profile"]);
                setClassesData(res[1].data["classes"]);
            }
            catch (err) {
                console.log(err.message);
            }
            finally {
                setIsLoading(false);
            };
        };
        fetchData();
        return () => controller.abort();

    }, [currUser.uid]);

    // Event listener closes the dropdown menu whenever user clicks elsewhere on the screen
    useEffect( () => {

        const handleClickOutside = (e) => {
            e.preventDefault();
            e.target.className !== "dropdown-items" && setDropdownOpen(false);
        };
        window.addEventListener("mousedown", handleClickOutside);
        return () => window.removeEventListener("mousedown", handleClickOutside);

    }, []);

    const props = { 
        dropdownOpen, 
        setDropdownOpen, 
        contentBarItem,
        setContentBarItem,
        tutorProfile, 
        classesData,
    };

    return (
        <DashContext.Provider value = { props }> 
            { !isLoading && children }
        </DashContext.Provider>
    );

};

export default DashContext;