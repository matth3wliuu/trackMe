import React from 'react'

const Form = (props) => {

    const { children, ...other } = props;

    return (

        <form autoComplete = "off" { ...other } style = { {flexGrow: 1, padding: "10px"} }>
            
            { props.children }

        </form>
            
    )
}

export default Form;
