import React, { useContext } from 'react'
import DropdownMenu from './DropdownMenu';
import DashContext from '../../../contexts/DashContext';

const Dropdown = (props) => {
    
    const { dropdownOpen, setDropdownOpen } = useContext(DashContext);

    const handleClick = (e) => {
        e.preventDefault();
        setDropdownOpen(!dropdownOpen)
    }

    return (

        <ul className = { props.className } onClick = { (e) => handleClick(e) }>
            Dropdown
            { dropdownOpen && <DropdownMenu />}
        </ul>

    )
}

export default Dropdown
