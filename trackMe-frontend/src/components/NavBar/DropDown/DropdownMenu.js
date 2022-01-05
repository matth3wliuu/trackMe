import React, { useContext } from 'react'
import AuthContext from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const DropdownMenu = () => {

    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    const NewLineText = (inp) => {
        return inp.split('\n').map(str => <p key = {str}>{str}</p>);
    }

    const handleRedirect = (e, dest) => {
        e.preventDefault();
        navigate(dest);
    }

    const DropdownItem = (props) => {

        return (
            
            <a  
                k = { props.k }
                className = "dropdown-items"
                onClick = { props.handleClick } 
                style = { {cursor: props.cursor} }
                href = { props.href }
            > 
                
                {props.title}
            </a>

        )
    }

    const name = "Matthew Liu"; 
    const id = "z5359356"; 

    return (

        <ul className = "dropdown">

            <DropdownItem
                key = { "di1" }
                k = { "di1" }
                title = { NewLineText(`${name}\n${id}`) }
                href = { "/" }
                cursor = { "default "}
            />
            
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
