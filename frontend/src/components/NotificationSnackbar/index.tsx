import { Alert, AlertColor, Snackbar } from "@mui/material";

interface INotificationSnackbar {
  snackbarMessage: string;
  snackbarOpen: boolean;
  snackbarType: AlertColor;
  handleSnackbar: (status: boolean) => void;
}

export const NotificationSnackBar = ({
  snackbarMessage,
  snackbarOpen,
  snackbarType,
  handleSnackbar,
}: INotificationSnackbar) => {
  return (
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={2000}
      onClose={() => {
        handleSnackbar(false);
      }}
    >
      <Alert variant={"filled"} severity={snackbarType} sx={{ width: "100%" }}>
        {snackbarMessage}
      </Alert>
    </Snackbar>
  );
};
