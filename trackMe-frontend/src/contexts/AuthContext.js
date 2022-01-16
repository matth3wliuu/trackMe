import React, { useState, useEffect, createContext} from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../auth/firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [currUser, setCurrUser] = useState(); 
    const [isLoading, setIsLoading] = useState(true);

    const login = async (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = async (e) => {
        e.preventDefault();
        return signOut(auth);
    }

    const props = {
        currUser, 
        login,
        logout
    }; 
    
    useEffect( () => {
        
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrUser(user); 
            setIsLoading(false);
        }); 

        return unsubscribe;
        
    }, []);

    return (

       <AuthContext.Provider value = { props }> 

        { !isLoading && children }
           
       </AuthContext.Provider>

    );
}

export default AuthContext;


