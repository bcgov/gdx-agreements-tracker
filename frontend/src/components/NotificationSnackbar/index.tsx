import { Alert, AlertColor, Snackbar, SnackbarCloseReason } from "@mui/material";
import { SyntheticEvent } from "react";

interface INotificationSnackbar {
  snackbarMessage: string;
  snackbarOpen: boolean;
  snackbarType: AlertColor;
  handleSnackbar: (event: Event | SyntheticEvent<Event>, reason: SnackbarCloseReason) => void;
}

export const NotificationSnackBar = ({
  snackbarMessage,
  snackbarOpen,
  snackbarType,
  handleSnackbar,
}: INotificationSnackbar) => {
  return (
    <Snackbar open={snackbarOpen} autoHideDuration={2000} onClose={handleSnackbar}>
      <Alert variant={"filled"} severity={snackbarType} sx={{ width: "100%" }}>
        {snackbarMessage}
      </Alert>
    </Snackbar>
  );
};
