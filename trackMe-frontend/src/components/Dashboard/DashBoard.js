import React from 'react';
import { DashProvider } from "../../contexts/DashContext";
import NavBar from '../NavBar/NavBar';
import ClassCards from './ClassCards';
import Content from './Content';

const DashBoard = () => {

    return (

        <div className = "dashbord-container" >

            <DashProvider> 

                <NavBar />
                <ClassCards />
                <Content />

            </DashProvider>
           
        </div>
    )
}

export default DashBoard;
