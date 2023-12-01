import { AlertColor } from "@mui/material";
import { useState } from "react";

export const useSnackbar = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState<AlertColor>("info");

  const handleSnackbar = (status: boolean) => {
    setSnackbarOpen(status);
  };

  const handleSnackbarMessage = (snackbarMessage: string) => {
    setSnackbarMessage(snackbarMessage);
  };

  const handleSnackbarType = (sncakbarType: AlertColor) => {
    setSnackbarType(sncakbarType);
  };
  return {
    handleSnackbar,
    handleSnackbarMessage,
    handleSnackbarType,
    snackbarMessage,
    snackbarType,
    snackbarOpen,
  };
};
