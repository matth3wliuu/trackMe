import React, { useEffect, useState } from 'react';
import api from '../../api/config';
import { Dialog, DialogTitle, DialogContent, MenuItem } from '@mui/material';
import RequestForm from './RequestForm';

const getDialogueTitle = (popupType) => {
    if (popupType === "transfer") {
        return "New Transfer Hours Request";
    }
    else if (popupType === "drop") {
        return "New Drop Hours Request";
    }
    else if (popupType === "add") {
        return "New Add Hours Request";
    }
};

const Popup = (props) => {

    const { open, setPopupOpen, popupType } = props;
    const popupTitle = getDialogueTitle(popupType);
    
    const [tutorsInfo, setTutorsInfo] = useState();
    
    const [reason, setReason] = useState("");
    const [chosenDate, setChosenDate] = useState(new Date());
    const [duration, setDuration] = useState("");
    const [chosenTutor, setChosenTutor] = useState("");

    const closePopup = () => {
        setPopupOpen(false);
        setReason("");
        setChosenDate(new Date());
        setDuration("");
        setChosenTutor("");
    }

    useEffect( () => {
        const controller = new AbortController();
        const fetchTutorsInfo = async () => {
            try {
                const res = await api.get("/tutors/info", { signal: controller.signal });
                setTutorsInfo(res.data["tutors_info"]);
            }
            catch (err) {
                console.log(err.message);
            }
        };
        popupType === "transfer" && fetchTutorsInfo();
        return () => controller.abort();

    }, [popupType]);

    const tutorsList = tutorsInfo && tutorsInfo.map( item => {
        return (
            <MenuItem key = { item[0] } value = { `${item[1]} ${item[2]}` }>
                { `${item[1]} ${item[2]}` }
            </MenuItem> 
        );
    });

    return (

        <Dialog onClose = { closePopup } open = { open } fullWidth = { true } maxWidth = "sm"> 

            <DialogTitle> { popupTitle } </DialogTitle>

            <DialogContent> 

                <RequestForm 
                    reason = { reason }
                    setReason = { setReason }
                    chosenDate = { chosenDate }
                    setChosenDate = { setChosenDate }
                    duration = { duration }
                    setDuration = { setDuration }
                    chosenTutor = { chosenTutor }
                    setChosenTutor = { setChosenTutor }
                    tutorsList = { tutorsList }
                    closePopup = { closePopup }
                    requestType = { popupType }
                />

            </DialogContent>

        </Dialog>
    )
}

export default Popup
