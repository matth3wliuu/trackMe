import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';
import NavBar from '../NavBar/NavBar';
import styled from 'styled-components';
import { DashProvider } from '../../contexts/DashContext';
import { Divider } from '@mui/material';
import { Button } from '@mui/material';
import { FaCoffee } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import ClassCards from '../Dashboard/ClassCards';
import AdminClasses from './adminComponents/AdminClasses';
import AdminTutors from './adminComponents/AdminTutors';
import AdminRequests from './adminComponents/AdminRequests';
import api from '../../api/config';
import AddClassPU from './adminPopups/AddClassPU';
import RemoveClassPU from './adminPopups/RemoveClassPU';
import ModifyClassPU from './adminPopups/ModifyClassPU';

const PageContainer = styled.div`
    width: 100%;
    min-height: 600px;
    display: flex;
    flex-direction: column;
`;

const BodyContainer = styled.div`
    width: 96%;
    height: 85vh;
    min-height: 400px;
    display: flex;
    flex-direction: row;
    background-color: white;
    box-shadow: 0px 1px 5px #888888;
    border-radius: 6px;
    margin: auto;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    padding: 0.75rem;
`;

const SideBarContainer = styled.ul`
    transform: translateY(45%);
    width: 12.5%;
    margin-left: 0.75rem;
    width: 125px;
    height: max-content;
`;

const SideBarItem = styled.li`
    list-style: none;
    display: flex;
    font-size: 0.75rem;
    margin-bottom: 1.15rem;
    cursor: pointer;
    padding: 0.35rem;
    width: 125px;
    opacity: ${props => props.section === props.val ? 100 : 65}%;
    border-right: ${props => props.section === props.val ? 1 : 0}px solid black;
    &:hover { 
        opacity: 100%;
        background-color: ${props => props.section !== props.val ? "#F1F5F9" : "none"};
        border-radius: ${props => props.section !== props.val ? 4 : 0}px;
    }
`;

const TopInfoStyle = styled.div`
    margin: 1rem;
    margin-top: 1.5rem;
    font-size: 0.85rem;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 98%;
    height: max-content;
`;

const LiIconConfigs = ({ children }) => {

    return (
        <>
            <IconContext.Provider value = { { style: { "marginRight": "0.75rem" } } }>
                { children }
            </IconContext.Provider>
        </>
    );
};

const TopInfo = ({ section }) => {

    const d = new Date();
    const month = d.toLocaleString('default', { month: 'long' });

    return ( 
        <TopInfoStyle>
            <p> <b> { section.charAt(0).toUpperCase() + section.slice(1) } </b> </p> 
            <p style = { { color: "gray" }}> { `${d.getDate()} ${month}, ${d.getFullYear()}` }</p>
        </TopInfoStyle>
    );
};

const fetchClasses = (controller, uId) => {
    return api.get(`/admin/classes/${uId}`, {
        signal: controller.signal
    });
};

const fetchTutors = (controller, uId) => {
    return api.get(`/admin/tutors/${uId}`, {
        signal: controller.signal
    });
};

const fetchRequests = (controller, uId) => {
    return api.get(`/admin/requests/${uId}`, {
        signal: controller.signal
    });
};

const fetchSubjects = (controller, uId) => {
    return api.get(`/admin/subjects/${uId}`, {
        signal: controller.signal
    });
};

const fetchRooms = (controller, uId) => {
    return api.get(`/admin/rooms/${uId}`, {
        signal: controller.signal
    });
};


const AdminPage = () => {
    
    const { currUser } = useContext(AuthContext);

    const [section, setSection] = useState("dashboard");
    const [adminClassesData, setAdminClassesData] = useState([]);
    const [adminTutorsData, setAdminTutorsData] = useState([]);
    const [adminRequestsData, setAdminRequestsData] = useState([]);
    const [adminSubjects, setAdminSubjects] = useState([]);
    const [adminRooms, setAdminRooms] = useState([]);

    const [popupOpen, setPopupOpen] = useState("");

    useEffect( () => {

        const controller = new AbortController();

        const promises = [
            fetchClasses(controller, currUser.uid),
            fetchTutors(controller, currUser.uid),
            fetchRequests(controller, currUser.uid),
            fetchSubjects(controller, currUser.uid),
            fetchRooms(controller, currUser.uid)
        ];

        const fetchData = async () => {
            try {
                const res = await Promise.all(promises);

                setAdminClassesData(res[0].data["classes"]);
                setAdminTutorsData(res[1].data["tutors"]);
                setAdminRequestsData(res[2].data["requests"]);
                setAdminSubjects(res[3].data["subjects"]);
                setAdminRooms(res[4].data["rooms"]);
            }
            catch (err) {
                console.error(err.message);
            };
        };

        fetchData();
        return () => controller.abort();

    }, [currUser]);

    return (

        <PageContainer> <DashProvider> 
            
            <NavBar />

            <BodyContainer>
                
                <SideBarContainer> 
                    
                    <SideBarItem onClick = { () => setSection("dashboard") } val = "dashboard" section = { section }> 
                        <LiIconConfigs> <FaCoffee /> </LiIconConfigs> 
                        Dashboard 
                    </SideBarItem>

                    <SideBarItem onClick = { () => setSection("classes") } val = "classes" section = { section }> 
                        <LiIconConfigs> <FaCoffee /> </LiIconConfigs> 
                        Classes 
                    </SideBarItem>

                    <SideBarItem onClick = { () => setSection("tutors") } val = "tutors" section = { section }> 
                        <LiIconConfigs> <FaCoffee/> </LiIconConfigs> 
                        Tutors 
                    </SideBarItem>

                    <SideBarItem onClick = { () => setSection("requests") } val = "requests" section = { section }> 
                        <LiIconConfigs > <FaCoffee/> </LiIconConfigs> 
                        Requests 
                    </SideBarItem>

                </SideBarContainer>  

                <Divider orientation = "vertical" /> 

                <div className = "container-1" style = {{ display: "flex", flexDirection: "column", width: "100%" }}> 
                
                    <TopInfo section = { section } /> 

                    <div className = "container-2" style = {{ display: "flex", flexDirection: "row", width: "100%" }}> 

                        { section === "classes" && adminClassesData && 
                            <AdminClasses 
                                adminClassesData = { adminClassesData }
                                setPopupOpen = { setPopupOpen }
                            /> 
                        } 

                        { section === "tutors" && <AdminTutors /> }
                        { section === "requests" && <AdminRequests /> }

                    </div>

                </div>

            </BodyContainer> 

            <AddClassPU 
                open = { popupOpen === "add class" } 
                setPopupOpen = { setPopupOpen }
                uid = { currUser.uid }
                adminTutorsData = { adminTutorsData }
                adminSubjects = { adminSubjects }
                adminRooms = { adminRooms }
            />

            <RemoveClassPU 
                open = { popupOpen === "remove class" } 
                setPopupOpen = { setPopupOpen }
                adminClassesData = { adminClassesData }
                uid = { currUser.uid }
            />

            <ModifyClassPU 
                open = { popupOpen === "modify class" } 
                setPopupOpen = { setPopupOpen }
                adminClassesData = { adminClassesData }
                uid = { currUser.uid }
            />

        </DashProvider> </PageContainer>

    );

};

export default AdminPage
