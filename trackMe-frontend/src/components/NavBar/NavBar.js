import React from 'react'
import { useNavigate } from 'react-router-dom';
import Dropdown from './DropDown/Dropdown';

const NavBar = () => {

    const navigate = useNavigate();

    const NavBarItem = (props) => {
        
        return ( 
            <li 
                key = { props.k }
                onClick = { props.handleClick }
            > 
                {props.title}
            </li>
        )
    }

    return (

        <nav className = "navbar">

            <h3 className = "navbar-logo" onClick = { () => navigate("/") }> trackMe </h3>

            <ul className = "navbar-items"> 

                <NavBarItem 
                    k = {1}
                    handleClick = { () => navigate("/") }
                    title = {"Dashboard"}
                />
                
            </ul>

            <Dropdown className = "navbar-dropdown" /> 

        </nav>
    )
}

export default NavBar;
