import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TestPopup from './TestPopup';
import RequestForm from '../components/ClassPage/RequestForm';


const Test = () => {

    const [isOpen, setIsOpen] = useState(false);

    return (

        <div>
            
            {/* <Button variant = "contained" onClick = { () => setIsOpen(true) }> Open </Button>
            <TestPopup open = { isOpen } setPopupOpen = { setIsOpen }/> */}

            <RequestForm> </RequestForm>

        </div>
    )
}

export default Test
