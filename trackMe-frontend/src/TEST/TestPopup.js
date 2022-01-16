import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, MenuItem, Button, DialogActions, Grid, Box, FormControl} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';


const TestPopup = (props) => {

    const { open, setPopupOpen } = props;
    
    return (

        <Dialog onClose = { () => setPopupOpen(false) } open = { open } maxWidth = "md" fullWidth > 
            
            <DialogTitle> New Transfer Hours Request </DialogTitle>

            <DialogContent> <FormControl>

                

            </FormControl> </DialogContent>

        </Dialog>
    )
}

export default TestPopup;
