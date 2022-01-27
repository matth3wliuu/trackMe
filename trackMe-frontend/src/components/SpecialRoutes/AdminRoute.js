import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import api from '../../api/config';

export default function AdminRoute( { children } ) {

    const { currUser } = useContext(AuthContext);
    const [adminPermission, setAdminPermission] = useState();

    useEffect(() => {
        const controller = new AbortController();
        const fetchData = async () => {
            try {
                await api.get(`/tutor/admin/${currUser.uid}`, {
                    signal: controller.signal
                });
                setAdminPermission(true);
            }
            catch (err) {
                console.log(err.message);
                setAdminPermission(false);
            };
        };
        fetchData();
        return () => controller.abort();
    }, [currUser]);

    if (adminPermission === undefined) return <p> Loading... </p>;
    return adminPermission === true ? children : <Navigate to = "/" />;    

};


