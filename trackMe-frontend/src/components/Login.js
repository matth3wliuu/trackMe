import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import { accountDisabledMsg, incorrectLoginInfo } from '../constants';

const Login = () => {
    
    // getting the login function from the AuthContext
    const { login } = useContext(AuthContext);
    
    // useState hooks to track all the information related to login a user in 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    // useNavigate hook to redirect to dashboard after successful login
    const navigate = useNavigate();

    const handleLogin = async (e) => {

        e.preventDefault();
        
        try { 
            setError("");
            setIsLoading(true);
            
            await login(email, password); 
            setIsLoading(false);
            navigate("/");
        }
        catch (err) {
            setError(err.message);
            setIsLoading(false);
        }   
    }

    return (

        <div className = "login-container">
    
            <h2 style = {{ fontSize: "38px" }} > trackMe </h2>
            
            <form className = "login-form" onSubmit = { handleLogin }> 

                <label className = "disregard"> Email: </label>
                <input 
                    id = "email-input"
                    type = "email" 
                    placeholder = "Email:"
                    value = { email }
                    onChange = {(e) => setEmail(e.target.value)}
                    autoFocus
                    required
                />
              
                <label className = "disregard"> Password: </label>
                <input 
                    id = "password-input"
                    type = "password"
                    placeholder = "Password:"
                    value = { password }
                    onChange = {(e) => setPassword(e.target.value)}
                    required
                />
               
                <label className = "disregard" > Login </label>
                <button type = "submit" disabled = {loading}> 
                    Login
                </button>

                { error.includes(incorrectLoginInfo) && <label id = "invalid-input"> Incorrect email or password. </label> }
                { error.includes(accountDisabledMsg) && <label id = "invalid-input"> Account has been temporarily disabled. <br /> Please try again later. </label> } 

            </form>

        </div>
    )
}

export default Login
