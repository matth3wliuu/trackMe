import React, { useState, useRef } from 'react';
import { Dialog, DialogTitle, DialogContent, MenuItem, Box, Grid, TextField, Button } from '@mui/material';
import Form from '../../ClassPage/Form';
import api from '../../../api/config';


const RemoveClassPU = ( props ) => {
    
    const { open, setPopupOpen, uid, adminClassesData } = props;
    const [chosenClass, setChosenClass] = useState("");

    const closePopup = () => {
        setPopupOpen("");
        setChosenClass("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const deleteRequest = async () => {
            
            try {
                await api.delete(`/class/remove`, {
                    data: { "class_id": chosenClass } 
                });
            }
            catch ( err ) { 
                console.log(err.message);
            }
            finally { closePopup(); };
        };

        deleteRequest();
    };

    const RemoveClassForm = () => {

        const classRef = useRef(null);

        const classesList = adminClassesData.map( adminClass => {
            return ( 
                <MenuItem key = { `remove-class-admin-class-${adminClass[0]}` } value = { adminClass[0] }> 
                    { adminClass[0] }
                </MenuItem> 
            );
        });

        return (

            <Box> 

                <Form onSubmit = { handleSubmit }> 

                    <Grid container spacing = { 1.5 } sx = { { width: "50ch" } } > 

                        <Grid item xs = { 12 }>

                            <TextField
                                inputRef = { classRef }
                                name = "remove-class-class_id"
                                label = "Class ID"
                                type = "text"
                                select
                                margin = "dense"
                                value = { chosenClass }
                                onChange = { (e) => setChosenClass(e.target.value) }
                                required
                                sx = { { width: "30ch" } }
                            > 
                                { classesList }
                            </TextField> 
                        
                        </Grid>

                        <Grid item xs = { 2 } sx = { { marginRight: "35px" } }> 
                            <Button variant = "contained" type = "submit" onSubmit = { handleSubmit }> Remove </Button>
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

        <Dialog open = { open } onClose = { closePopup }> 

            <DialogTitle> Remove Class </DialogTitle>

            <DialogContent> 

                <RemoveClassForm />

            </DialogContent>

        </Dialog>
    );
};

export default RemoveClassPU
