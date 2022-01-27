import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Divider } from '@mui/material';
import api from '../api/config';
import { DashProvider } from '../contexts/DashContext';
import NavBar from '../components/NavBar/NavBar';
import { FaCoffee } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import TestClasses from './TestClasses';


const PageContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;

const BodyContainer = styled.div`
    width: 96%;
    height: 85vh;
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


const Test = () => {

    const [section, setSection] = useState("dashboard");

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

                        { section === "classes" && <TestClasses /> } 

                    </div>

                </div>

            </BodyContainer> 

        </DashProvider> </PageContainer>

    )

};

export default Test
