import React from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, OutlinedInput, FormControl, InputLabel } from '@mui/material';

const TransferHoursPopup = (props) => {

    const { transferOpen, setTransferOpen } = props;

    return (

        <Dialog open = { transferOpen }> 

            <DialogContent>

                <FormControl
                    id = "popup-title" 
                    variant = "outlined"
                    
                >  
                    <OutlinedInput 
                        placeholder = "Specify Reasons"
                        label = "Title "    
                    > 
                    </OutlinedInput>

                </FormControl>

            </DialogContent>

        </Dialog>
    )
}

export default TransferHoursPopup;
