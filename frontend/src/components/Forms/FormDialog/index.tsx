import { Dialog, DialogTitle, Typography, IconButton, DialogContent, Button, DialogContentText, DialogActions } from '@mui/material'
import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useQueryClient } from '@tanstack/react-query';

const FormDialog = ({
    children,
    open,
    handleClose,
    handleDelete,
    formConfig,
}: {
    children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
    open: boolean;
    handleClose: any
    handleDelete: any
    formConfig: any
}) => {
    const [openDeletePrompt, setOpenDeletePrompt] = useState(false)
    const queryClient = useQueryClient();

    const handleDeleteResponse = async (event: any) => {
        await handleDelete({ apiUrl: formConfig.deleteUrl }).then(() => {
            setOpenDeletePrompt(false)
            handleClose()
            queryClient.invalidateQueries();
        })
    };
    return (
        <>
            <Dialog
                open={open}
                fullWidth
                maxWidth="md"
            >
                <DialogTitle
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: "#e9e9e9",
                    }}
                >
                    {
                        formConfig.deleteUrl &&
                        <Button variant="contained" startIcon={<DeleteForeverIcon />} color="error" onClick={() => {
                            setOpenDeletePrompt(true)
                        }}>
                            Delete
                        </Button>
                    }
                    <IconButton sx={{ ml: 'auto' }} onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    {children}
                </DialogContent>
            </Dialog>

            <Dialog
                open={openDeletePrompt}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Delete Item"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you would like to delete this item? There is no way to restore this item once it has been deleted.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setOpenDeletePrompt(false) }}>Cancel</Button>
                    <Button onClick={handleDeleteResponse} autoFocus>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </>

    )
}

export default FormDialog