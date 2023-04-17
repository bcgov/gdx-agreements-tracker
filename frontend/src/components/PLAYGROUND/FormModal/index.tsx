import { Box, Button, Modal, styled } from '@mui/material';
import React, { useState } from 'react'

const FormModal = ({ children, open, handleClose }: { children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined, open: boolean, handleClose: Function }) => {
    const StyledModalBox = styled(Box)({
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#FFF",
        width: "80%",
        overflowY: "auto",
        height: "auto",
        maxHeight: "100%",
    });

    const StyledContentBox = styled(Box)({
        padding: "20px",
    });

    return (
        <>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <StyledModalBox>
                    {/* <ModalHeader onClose={handleClose} {...props} /> */}
                    <StyledContentBox>{children}<Button onClick={() => {
                        handleClose()
                    }}>Close</Button></StyledContentBox>
                </StyledModalBox>
            </Modal>
        </>
    )
}

export default FormModal