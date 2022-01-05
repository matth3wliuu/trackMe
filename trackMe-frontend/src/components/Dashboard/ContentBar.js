import React, { useContext, useEffect } from 'react';
import DashContext from '../../contexts/DashContext';

const ContentBar = () => {
    
    const activeStyle = "border: 1px solid #E2E8F0; border-bottom: none; background-color: #FAF9F6; padding: 10px; border-radius: 6px 6px 0px 0px; margin-bottom: -2px; cursor: pointer;";
    const defaultStyle = "padding: 10px; border: none; background-color: #f1f5f9;";

    const { contentBarItem, setContentBarItem } = useContext(DashContext);

    const capitalise = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const handleClick = (e) => { 
        e.preventDefault();
        setContentBarItem(e.target.id)
    }

    useEffect( () => {

        const items = ["schedule", "payments"];
        const filtered = items.filter(item => item !== contentBarItem);

        document.getElementById(contentBarItem).style.cssText = activeStyle;
        document.getElementById(filtered[0]).style.cssText = defaultStyle;

    }, [contentBarItem]);


    const ContentBarItem = (props) => {

        return (
    
            <button 
                id = { props.id }
                className = "content-bar-item"
                onClick = { (e) => handleClick(e) }
            > 
                { capitalise(props.id) }
    
            </button>
                
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
