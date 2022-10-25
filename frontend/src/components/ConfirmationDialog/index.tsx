import React, { forwardRef, useImperativeHandle } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { Cancel, CheckCircle } from "@mui/icons-material";

export const ConfirmationDialog = forwardRef(
  (
    {
      handleConfirm,
      title,
      body,
    }: {
      handleConfirm: Function;
      title: string;
      body: string;
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);

    useImperativeHandle(ref, () => ({
      openDialog: () => {
        setOpen(true);
      },
    }));

    const handleClose = () => {
      setOpen(false);
    };

    const handleConfirmClick = () => {
      setOpen(false);
      handleConfirm();
    };

    return (
      <Dialog open={open} onClose={handleClose} color="primary">
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{body}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleConfirmClick}
            color="success"
            variant="outlined"
            endIcon={<CheckCircle />}
          >
            Yes
          </Button>
          <Button
            onClick={handleClose}
            color="error"
            variant="outlined"
            endIcon={<Cancel />}
            autoFocus
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
);

ConfirmationDialog.displayName = "Confirmation Dialog";
