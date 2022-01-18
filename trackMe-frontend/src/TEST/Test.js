import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Divider } from '@mui/material';
import api from '../api/config';

const fetchClasses = (controller, u_id) => {
    return api.get("/tutor/classes", {
        params: { "u_id": u_id },
        signal: controller.signal
    });
}

const fetchTutorProfile = (controller, u_id) => {
    return api.get("/tutor/profile", {
        params: { "u_id": u_id },
        signal: controller.signal
    });
};

const Test = () => {

    const u_id = "bXH635wpflTLcObbSbh8CTh31M33";

    const [classData, setClassData] = useState();
    const [tutorProfile, setTutorProfile] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        const controller = new AbortController();
        const promises = [
            fetchTutorProfile(controller, u_id),
            fetchClasses(controller, u_id)
        ];

        const fetchData = async () => {
            setIsLoading(true);
            try {
                const res = await Promise.all(promises);
                setTutorProfile(res[0]);
                setClassData(res[1]);
            }
            catch (err) {
                console.log(err.message);
            }
            finally {
                setIsLoading(true);
            };
            fetchData();
            return () => controller.abort();
        };

    }, [u_id]);

};

export default Test
