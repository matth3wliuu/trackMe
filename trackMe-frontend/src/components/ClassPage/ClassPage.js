import React from 'react';
import NavBar from '../NavBar/NavBar';
import ClassPageContent from './ClassPageContent';
import { DashProvider } from '../../contexts/DashContext';

const ClassPage = () => {
    return (
        <div className = "class-page-container">
            <DashProvider>
                <NavBar />
                <ClassPageContent />
            </DashProvider>
        </div>
    );
};

export default ClassPage;
