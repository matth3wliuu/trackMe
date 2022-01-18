import React from 'react'
import { useNavigate } from 'react-router-dom';
import Dropdown from './DropDown/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaRegCompass } from 'react-icons/fa'
const NavBar = () => {

    const navigate = useNavigate();
    const NavBarItem = (props) => {
        return ( 
            <li 
                key = { props.k }
                onClick = { props.handleClick }
            > 
                <FaRegCompass size = "1.25rem" style = { {transform: "translateY(15%)"} }/>
            </li>
        );
    };

    return (

        <nav className = "navbar">

            <h3 className = "navbar-logo" onClick = { () => navigate("/") }> trackMe </h3>

            <ul className = "navbar-items"> 

                <NavBarItem 
                    k = {1}
                    handleClick = { () => navigate("/") }
                    title = { "Dashboard" }
                />
                
            </ul>

            <Dropdown className = "navbar-dropdown" /> 

        </nav>
    )
}

export default NavBar;
