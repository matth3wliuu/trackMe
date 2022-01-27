import React, { useState, useRef } from 'react';
import { Dialog, DialogTitle, DialogContent, MenuItem, Box, Grid, TextField, Button } from '@mui/material';
import Form from '../../ClassPage/Form';
import api from '../../../api/config';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';

const AddClassPU = ( props ) => {

    const { open, setPopupOpen, uid, adminTutorsData, adminSubjects, adminRooms } = props;

    const defaultStartTime = () => {
        return new Date(0, 0, 0, 9);
    };

    const [tutorId, setTutorId] = useState("");
    const [name, setName] = useState("");
    const [subjectId, setSubjectId] = useState("");
    const [grade, setGrade] = useState("");
    const [day, setDay] = useState("");
    const [startTime, setStartTime] = useState(defaultStartTime());
    const [duration, setDuration] = useState(null);
    const [room, setRoom] = useState("");
    
    const startTimeRef = useRef(null);
    const durationRef = useRef(null);
    
    const closePopup = () => {
        setPopupOpen("");
        setTutorId("");
        setName("");
        setSubjectId("");
        setGrade("");
        setDay("");
        setStartTime(defaultStartTime());
        setDuration(null);
        setRoom("");
    };
    
    const tutorIdList = adminTutorsData.map( (tutor, idx) => {
        return ( 
            <MenuItem key = { `add-class-tutorId-${idx}` } value = { tutor[0] }> 
                { tutor[0] }
            </MenuItem>
        );
    });
    
    const gradeList = (Array.from({length: 6}, (_, i) => i + 7)).map( year => {
        return (
            <MenuItem key = { `add-class-grade-${year}` } value = { year }> 
                { year }
            </MenuItem>
        );
    });
    
    const subjectsList = adminSubjects.map( subject => {
        return ( 
            <MenuItem key = { `add-class-subject-${subject[0]}`} value = { subject[0] }>   
                { subject[1] }
            </MenuItem>
        );
    });
    
    const weekDays = [ 'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday', 'Sunday' ];
    const daysList = weekDays.map( weekDay => {
        return (
            <MenuItem key = {`add-class-weekday-${weekDay}`} value = { weekDay }>
                { weekDay }
            </MenuItem>
        );
    });

    const roomsList = adminRooms.map( adminRoom => {
        return (
            <MenuItem key = { `add-class-room-${adminRoom[0]}`} value = { adminRoom[0] }> 
                { adminRoom[1] }
            </MenuItem>
        );
    });

    const setTutorName = (id) => {
        const filtered = adminTutorsData.filter( (tutor) => tutor[0] === id );
        setName(`${filtered[0][2]} ${filtered[0][3]}`);
    };

    const AddClassForm = () => {

        const handleSubmit = (e) => {
            e.preventDefault();

            const splitName = name.split(" ");

            const postRequest = async () => {
                try {
                    await api.post(`/class/add/${uid}`, {
                        "tutor_id": tutorId, 
                        "first_name": splitName[0],
                        "last_name": splitName[1],
                        "subject_id": subjectId,
                        "grade": grade,
                        "day": day,
                        "start_time": startTime.toLocaleTimeString(),
                        "duration": duration,
                        "room": room
                    });
                }
                catch (err) {
                    console.log(err.message);
                }
                finally { closePopup() };
            };

            postRequest();
        };

        return (

            <Box> 
                
                <Form onSubmit = { handleSubmit }>  

                    <Grid container spacing = { 1.5 }> 
                    
                        <Grid item xs = { 6 }> 
                        
                            <TextField 
                                name = "add-class-tutorId"
                                label = "Tutor ID"
                                helperText = "Select the tutor for the new class"
                                select
                                required
                                type = "text"
                                value = { tutorId }
                                onChange = { (e) => { 
                                    setTutorId(e.target.value);
                                    setTutorName(e.target.value);
                                } }
                                margin = "dense"
                                fullWidth 
                            >
                                
                                { tutorIdList }

                            </TextField> 

                        </Grid>

                        <Grid item xs = { 6 }> 

                            <TextField
                                name = "add-class-name"
                                label = "Tutor Name"
                                disabled
                                type = "text"
                                required
                                value = { name }
                                margin = "dense"
                                fullWidth 
                            />           

                        </Grid>       

                        <Grid item xs = { 8 }> 
                                
                            <TextField 
                                name = "add-class-subject-id"
                                label = "Subject"
                                helperText = "Subject of the new class"
                                type = "text"
                                required
                                select
                                margin = "dense"
                                value = { subjectId }
                                onChange = { (e) => setSubjectId(e.target.value) }
                                fullWidth 
                            > 
                                { subjectsList }

                            </TextField>
                        
                        </Grid>           

                        <Grid item xs = { 4 }> 

                            <TextField
                                name = "add-class-grade"
                                label = "Grade"
                                helperText = "Grade of the new class"
                                type = "text"
                                required
                                select
                                value = { grade }
                                onChange = { (e) => setGrade(e.target.value) }
                                margin = "dense"
                                fullWidth 

                            > 
                                { gradeList }

                            </TextField>
                        
                        </Grid>  

                        <Grid item xs = { 8 }> 
                            
                            <LocalizationProvider dateAdapter = { AdapterDateFns }> 
                            
                                <TimePicker
                                    name = "add-class-start-time"
                                    label = "Choose the start time"
                                    value = { startTime }
                                    onChange = { newValue => setStartTime(newValue) } 
                                    inputFormat = "HH:mm"
                                    minutesStep = { 5 }
                                    minTime = { new Date(0, 0, 0, 9) }
                                    maxTime = { new Date(0, 0, 0, 18) }
                                    renderInput = { props => 
                                        <TextField
                                            { ...props }
                                            inputRef = { startTimeRef }
                                            required
                                            onClick = { () => startTimeRef.current.focus() }
                                            margin = "dense"
                                            error = { startTime < new Date(0, 0, 0, 9) || startTime > new Date(0, 0, 0, 18) }
                                            helperText = { startTime < new Date(0, 0, 0, 9) || startTime > new Date(0, 0, 0, 18) ? "Class must start between 9am and 6pm" : "" }
                                            fullWidth 
                                        />      
                                    }
                                /> 

                            </LocalizationProvider>

                        </Grid>

                        <Grid item xs = { 4 }>

                            <TextField 
                                inputRef = { durationRef }
                                name = "add-class-duration"
                                label = "Duration"
                                type = "number"
                                placeholder = "Hours"
                                value = { duration }
                                onChange = { (e) => setDuration(e.target.value) }
                                onClick = { () => durationRef.current.focus() }
                                error = { duration < 0 || duration > 6 }
                                helperText = { duration < 0 || duration > 6 ? "Duration must be between 0 - 6 Hours" : "" }
                                margin = "dense"
                                required
                            /> 

                        </Grid>

                        <Grid item xs = { 6 }> 
                                    
                            <TextField 
                                name = "add-class-day"
                                label = "Day"
                                helperText = "Day of the new class"
                                type = "text"
                                value = { day }
                                onChange = { (e) => setDay(e.target.value) }
                                select
                                required
                                fullWidth
                                margin = "dense"
                            >  
                                { daysList }
                            </TextField>

                        </Grid>

                        <Grid item xs = { 6 }> 
                                    
                            <TextField 
                                name = "add-class-room"
                                label = "Room"
                                helperText = "Room of the new class"
                                type = "text"
                                value = { room }
                                onChange = { (e) => setRoom(e.target.value) }
                                required
                                select
                                fullWidth
                                margin = "dense"
                            >
                                { roomsList }

                            </TextField>
                                    
                        </Grid>

                        <Grid item xs = { 2 } sx = { { marginRight: "10px" } }> 
                            <Button variant = "contained" type = "submit" onSubmit = { handleSubmit }> Submit </Button>
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

        <Dialog open = { open } onClose = { closePopup } fullWidth = { true } maxWidth = "sm"> 
            
            <DialogTitle> Add New Class </DialogTitle>

            <DialogContent> 

                <AddClassForm />

            </DialogContent>

        </Dialog>

    );
};

export default AddClassPU;
