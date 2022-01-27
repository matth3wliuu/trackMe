import React, {  useRef } from 'react';
import { Grid, TextField, Button, Box } from '@mui/material';
import  Form  from './Form';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import api from '../../api/config';

const RequestForm = (props) => {

    const { reason, setReason, chosenDate, setChosenDate, duration, setDuration, chosenTutor, setChosenTutor, tutorsList, closePopup, requestType } = props;

    const reasonRef = useRef(null);
    const durationRef = useRef(null);
    const dateRef = useRef(null);

    const validateInput = () => { return reason.length > 200 || duration <= 0 ? false : true };
    
    const formatDate = () => {
        const dateObj = new Date(chosenDate);
        return `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`;
    }    

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validateInput()) {
            const postRequest = async () => { 
                try {
                    await api.post("/request/new", {
                        "reason": reason, 
                        "type": requestType,
                        "tutor": chosenTutor,
                        "date": formatDate(chosenDate),
                        "duration": duration
                    })
                }
                catch(err) {
                    console.log(err.message);
                
                }
                finally {
                    closePopup();
                }
            };
            postRequest(); 
        };
    };

    return (
        
        <Box> 

            <Form onSubmit = { handleSubmit }> 

                <Grid container spacing = { 2 }>

                    <Grid item xs = { 12 }>

                        <TextField
                            inputRef = { reasonRef }
                            name = "popupTitle"
                            label = "Title"
                            type = "text"
                            placeholder = "Specify reasons"
                            value = { reason }
                            onChange = { (e) => setReason(e.target.value) }
                            onClick = { () => reasonRef.current.focus() }
                            required
                            margin = "dense"
                            error = { reason.length > 200 }
                            helperText = { reason.length > 200 ? "Must be shorter than 200 characters.": "" }
                            sx = { {width: "50ch" } }
                        />

                    </Grid>

                    <Grid item xs = { 7 }>

                        <LocalizationProvider dateAdapter = { AdapterDateFns }> 

                            <DatePicker 
                                name = "popupDatePicker"
                                label = "Choose the date"
                                value = { chosenDate }
                                onChange = { (newValue) => setChosenDate(newValue) }
                                renderInput = { (props) => <TextField 
                                    {...props} 
                                    inputRef = { dateRef }
                                    required     
                                    onClick = { () => dateRef.current.focus() }                                 
                                    margin = "dense" 
                                    sx = { {width: "100%"} }
                                /> } 
                            />

                        </LocalizationProvider>

                    </Grid>

                    <Grid item xs = { 5 } >

                        <TextField 
                            inputRef = { durationRef }
                            name = "popupDuration"
                            label = "Duration"
                            type = "number"
                            placeholder = "Hours"
                            value = { duration }
                            onChange = { (e) => setDuration(e.target.value) }
                            onClick = { () => durationRef.current.focus() }
                            required
                            error = { duration < 0 }
                            helperText = { duration < 0 ? "Value must be positive." : ""}
                            margin = "dense"
                            sx = { {width: "59%" } }
                        />

                    </Grid>
                    
                    { requestType === "transfer" && tutorsList && 
                        <Grid item xs = { 12 }>

                            <TextField 
                                name = "popupTutors"
                                label = "Select"
                                helperText = "Select the tutor that will receive these hours"
                                value = { chosenTutor }
                                onChange = { (e) => setChosenTutor(e.target.value) }
                                required
                                select
                                margin = "dense"
                                sx = { {width: "50ch"} }
                            >
                                { tutorsList }
                            </TextField>   
                        
                        </Grid> 
                    }

                    <Grid item xs = { 2 } sx = { { marginRight: "10px" } }> 
                        <Button variant = "contained" type = "submit" onSubmit = { handleSubmit }> Submit </Button>
                    </Grid>

                    <Grid item xs = { 2 }> 
                        <Button variant = "outlined" onClick = { closePopup }> Cancel </Button>
                    </Grid>
            
                </Grid>

            </Form>

        </Box>
    )
}

export default RequestForm;
