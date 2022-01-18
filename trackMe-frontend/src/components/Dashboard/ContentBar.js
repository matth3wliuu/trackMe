import React, { useContext } from 'react';
import styled from 'styled-components';
import DashContext from '../../contexts/DashContext';

const ContentBarBtn = styled.button.attrs(props => ({
    isActive: props.isActive
}))`
    padding: 10px;
    font-size: 1rem;
    border: ${ props => props.isActive ? "1px solid #E2E8F0": "none" };
    background-color: ${ props => props.isActive ? "#FFFFFF" : "#F1F5F9" };
    border-radius: ${ props => props.isActive ? "6px 6px 0px 0px" : "0px 0px 0px 0px" };
    cursor: ${ props => props.isActive ? "pointer" : "default" }; 
    margin-bottom: ${props => props.isActive ? "-2px" : "0px" };
    border-bottom: ${ props => props.isActive && "none" };
`;

const ContentBar = () => {

    const { contentBarItem, setContentBarItem } = useContext(DashContext);
    
    const capitalise = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const handleClick = (e) => { 
        e.preventDefault();
        setContentBarItem(e.target.id)
    }

    const ContentBarItem = (props) => {

        return (
    
            <ContentBarBtn
                id = { props.id }
                className = "content-bar-item"
                onClick = { (e) => handleClick(e) }
                isActive = { contentBarItem === props.id }
            > 
                { capitalise(props.id) }
    
            </ContentBarBtn >
                
        )
    }

    return (

        <div className = "content-bar">
            
            <ContentBarItem 
                id = { "schedule" } 
            />

            <ContentBarItem 
                id = { "payments" }
            />

        </div>
    )
}

export default ContentBar;
