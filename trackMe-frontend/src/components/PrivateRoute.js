import React, {useContext} from 'react'; 
import { Navigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

export default function PrivateRoute({ children }) {
    const { currUser } = useContext(AuthContext);
    return currUser.uid ? children : <Navigate to = "/login" />;
}

