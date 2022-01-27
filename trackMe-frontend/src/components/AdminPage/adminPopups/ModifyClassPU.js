import React, { useState, useRef } from 'react';
import { Dialog, DialogTitle, DialogContent, MenuItem, Box, Grid, TextField, Button } from '@mui/material';
import Form from '../../ClassPage/Form';
import api from '../../../api/config';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';


const ModifyClassPU = ( props ) => {
    
    const getDefaultStartTime = () => {
        const d = new Date();
        d.setHours(9);
        return d;
    };

    const boundaryTimes = () => {
        const today = new Date();
      
        const minTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9);
        const maxTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 18);

        return [minTime, maxTime];
    };

    const toDateObj = (timeStr) => {
        timeStr = timeStr.slice(0, 5);
        var d = new Date();
        d.setHours(timeStr.substr(0, timeStr.indexOf(":")));
        d.setMinutes(timeStr.substr(timeStr.indexOf(":") + 1 ));
        d.setSeconds(0);

        return d;
    };

    const { open, setPopupOpen, adminClassesData, uid } = props;
    const [chosenClass, setChosenClass] = useState("");
    const [chosenClassTutor, setChosenClassTutor] = useState("");
    const [newDay, setNewDay] = useState("");
    const [newStartTime, setNewStartTime] = useState(getDefaultStartTime());
    const [newDuration, setNewDuration] = useState("");

    const closePopup = () => {
        setChosenClass("");
        setPopupOpen("");
        setChosenClassTutor("");
        setNewDay("");
        setNewStartTime(getDefaultStartTime);
        setNewDuration("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const putRequest = async () => {

            try {

            }
            catch (err) { console.log(err.message); }
            finally { closePopup(); };
        };

        putRequest();
    };

    const startTimeRef = useRef(null);
    const durationRef = useRef(null);

    const classesList = adminClassesData.map( adminClass => {
        return ( 
            <MenuItem key = { `remove-class-admin-class-${adminClass[0]}` } value = { adminClass[0] }> 
                { adminClass[0] }
            </MenuItem> 
        );
    });

    const selectedClass = (class_id) => {
        return adminClassesData.filter(adminClass => adminClass[0] === class_id)[0];
    };

    const weekDays = [ 'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday', 'Sunday' ];
    const daysList = weekDays.map( weekDay => {
        return (
            <MenuItem key = {`modify-class-weekday-${weekDay}`} value = { weekDay }>
                { weekDay }
            </MenuItem>
        );
    });

    const ModifyClassForm = () => {
        
        return (

            <Box> 

                <Form onSubmit = { handleSubmit }> 

                    <Grid container spacing = { 1.5 } >
                        
                        <Grid item xs = { 8 }> 

                            <TextField 
                                name = "modify-class-class_id"
                                label = "Class ID"
                                select
                                margin = "dense"
                                fullWidth 
                                value = { chosenClass }
                                onChange = { (e) => { 
                                    setChosenClass(e.target.value);
                                    setChosenClassTutor(selectedClass(e.target.value)[1]);
                                }}
                                required
                            > 
                                { classesList }
                            </TextField>

                        </Grid>

                        <Grid item xs = { 4 }> 

                            <TextField
                                name = "modify-class-tutor"
                                label = "Tutor"
                                disabled
                                margin = "dense"
                                fullWidth 
                                value = { chosenClassTutor }
                            />
                        
                        </Grid>

                        <Grid item xs = { 6 }> 

                            <TextField 
                                name = "modify-class-current-day"
                                label = "Current day"
                                disabled
                                margin = "dense"
                                value = { chosenClass ? selectedClass(chosenClass)[4] : "" }
                                fullWidth
                            />    
                            
                        </Grid>

                        <Grid item xs = { 6 }> 
                                
                            <TextField 
                                name = "modify-class-new-day"
                                label = "New day"
                                select 
                                margin = "dense"
                                fullWidth
                                value = { !newDay && chosenClass ? selectedClass(chosenClass)[4] : newDay }
                                onChange = { (e) => setNewDay(e.target.value) }
                            >
                                
                                { daysList }

                            </TextField>
                                           
                        </Grid>
                        
                        <Grid item xs = { 6 }>

                            <TextField 
                                name = "modify-class-current-start-time"
                                label = "Current start time"
                                disabled
                                margin = "dense"
                                fullWidth
                                value = { chosenClass ? selectedClass(chosenClass)[5] : "09:00" }
                            />

                        </Grid>

                        <Grid item xs = { 6 }> 
                        
                            <LocalizationProvider dateAdapter = { AdapterDateFns }> 
                                
                                <TimePicker
                                    name = "modify-class-start-time"
                                    label = "New start time"
                                    value = { chosenClass && newStartTime.toLocaleDateString() === getDefaultStartTime().toLocaleDateString() ? toDateObj(selectedClass(chosenClass)[5]) : newStartTime }
                                    onChange = { newValue => setNewStartTime(newValue) } 
                                    inputFormat = "HH:mm"
                                    minutesStep = { 5 }
                                    minTime = { boundaryTimes()[0] }
                                    maxTime = { boundaryTimes()[1] }
                                    renderInput = { props => 
                                        <TextField
                                            { ...props }
                                            inputRef = { startTimeRef }
                                            required
                                            onClick = { () => startTimeRef.current.focus() }
                                            margin = "dense"
                                            error = { newStartTime < boundaryTimes()[0] || newStartTime > boundaryTimes()[1] }
                                            helperText = { newStartTime < boundaryTimes()[0] || newStartTime > boundaryTimes()[1] ? "Class must start between 9am and 6pm" : "" }
                                            fullWidth 
                                        />      
                                    }
                                /> 

                            </LocalizationProvider>
                        
                        
                        </Grid>

                        <Grid item xs = { 6 }> 
                        
                            <TextField
                                name = "modify-class-current-duration"
                                label = "Current duration"
                                disabled
                                margin = "dense"
                                fullWidth
                                value = { chosenClass ? selectedClass(chosenClass)[6] : "" }
                            > 

                            </TextField>
                        
                        </Grid>

                        <Grid item xs = { 6 }> 
                            
                            <TextField 
                                inputRef = { durationRef }
                                name = "modidy-class-new-duration"
                                label = "New Duration"
                                margin = "dense"
                                fullWidth
                                type = "number"
                                onClick = { () => durationRef.current.focus() }
                                onChange = { (e) => { setNewDuration(e.target.value) } }
                                value = { chosenClass && !newDuration ? parseFloat(selectedClass(chosenClass)[6]) : newDuration }
                                error = { newDuration < 0 || newDuration > 6 }
                                helperText = { newDuration < 0 || newDuration > 6 ? "Duration must be between 0 - 6 Hours" : "" }
                            /> 

                        </Grid>

                        <Grid item xs = { 2 } sx = { { marginRight: "15px" } } > 
                                
                            <Button variant = "contained" type = "submit" onSubmit = { handleSubmit } > Submit </Button>
                        
                        </Grid>
                        
                        <Grid item xs = { 2 }> 
                        
                            <Button variant = "contained" onClick = { closePopup }> Cancel </Button>

                        </Grid>

                    </Grid> 

                </Form>

            </Box>
            
        );
    };


    return (

        <Dialog open = { open } onClose = { closePopup } fullWidth>

            <DialogTitle> Modify Class </DialogTitle>

            <DialogContent> 

                <ModifyClassForm />

            </DialogContent>

        </Dialog> 

    );
};

export default ModifyClassPU
