import { Dialog, DialogTitle, Typography, IconButton } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
const FormDialog = ({
    children,
    open,
    handleClose,
    currentRowData
}: {
    children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
    open: boolean;
    handleClose: any
    currentRowData: any
}) => {
    console.log('currentRowData', currentRowData)
    return (
        <Dialog
            // onClose={handleClose} // the line to be removed
            open={open}
            fullWidth
            maxWidth="md"
        >
            <DialogTitle
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <IconButton sx={{ ml: 'auto' }} onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            {children}
        </Dialog>
    )
}

export default FormDialog