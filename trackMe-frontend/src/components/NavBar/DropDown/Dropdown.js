import React, { useContext } from 'react'
import DropdownMenu from './DropdownMenu';
import DashContext from '../../../contexts/DashContext';
import { FaRegUserCircle } from 'react-icons/fa'

const Dropdown = (props) => {
    
    const { dropdownOpen, setDropdownOpen } = useContext(DashContext);

    const handleClick = (e) => {
        e.preventDefault();
        setDropdownOpen(!dropdownOpen)
    };

    return (
        <ul className = { props.className } onClick = { (e) => handleClick(e) }>
            <FaRegUserCircle className = "dropdown-icon" size = "1.25rem" style = { {transform: "translateY(15%)"} }/>
            { dropdownOpen && <DropdownMenu /> }
        </ul>
    );
};

export default Dropdown;
