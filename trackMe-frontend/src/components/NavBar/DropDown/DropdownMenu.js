import React, { useContext } from 'react'
import AuthContext from '../../../contexts/AuthContext';
import DashContext from '../../../contexts/DashContext';
import { useNavigate } from 'react-router-dom';
import { Divider } from '@mui/material';

const NewLineText = (inp) => {
    return inp.split('\n').map(str => <p key = {str}>{str}</p>);
};

const DropdownMenu = () => {

    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);
    const { tutorProfile } = useContext(DashContext);

    const handleRedirect = (e, dest) => {
        e.preventDefault();
        navigate(dest);
    };

    const DropdownItem = (props) => {
        return (
            <a  
                k = { props.k }
                className = "dropdown-items"
                onClick = { props.handleClick } 
                style = { { cursor: props.cursor } }
                href = { props.href }
            > 
                { props.title }
            </a>
        );
    };

    return (

        <ul className = "dropdown">

            <DropdownItem
                key = { "di1" }
                k = { "di1" }
                title = { NewLineText(`${tutorProfile[1]} ${tutorProfile[2]}\n${tutorProfile[0]}`) }
                href = { "/" }
                cursor = "default"
            />
            
            <Divider sx = { { marginBottom: "0.25rem" } }/>

            <DropdownItem
                key = { "di2" }
                k = { "di2" }
                title = { "Profile" }
                href = { "/profile" }
                handleClick = { (e) => handleRedirect(e, "/profile") }
                cursor = { "pointer" }
            /> 
            
            <DropdownItem 
                key = { "di3" }
                k = { "di3" }
                title = { "Settings" }
                href = { "/settings" }
                handleClick = { (e) => handleRedirect(e, "/settings") }
                cursor = { "pointer" }
            />

            <DropdownItem
                key = { "di4" }
                k = { "di4" }
                title = { "About" }
                href = { "/about" }
                handleClick = { (e) => handleRedirect(e, "/about")  }
                cursor = { "pointer" }
            /> 
           
           <DropdownItem 
                key = { "di5" }
                k = { "di5" }
                title = { "Log out" }
                href = { "/login" }
                handleClick = { (e) => logout(e) }
                cursor = { "pointer" }
           />

        </ul>
    )
}

export default DropdownMenu
