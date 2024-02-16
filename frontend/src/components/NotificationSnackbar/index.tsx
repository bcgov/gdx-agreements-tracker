import { Alert, AlertColor, Snackbar } from "@mui/material";

interface INotificationSnackbar {
  snackbarMessage: string;
  snackbarOpen: boolean;
  snackbarType: AlertColor;
  handleSnackbar: (status: boolean) => void;
}
/**
 * This component displays a snackbar with an alert message and a color based on the severity.
 *
 * @param   {object}                    props                 - The props of the component.
 * @param   {string}                    props.snackbarMessage - The message to display in the alert.
 * @param   {boolean}                   props.snackbarOpen    - Whether the snackbar is open or not.
 * @param   {AlertColor}                props.snackbarType    - The severity of the alert, which can be one of "error", "warning", "info", or "success".
 * @param   {(status: boolean) => void} props.handleSnackbar  - The function that handles the snackbar open state.
 * @returns {JSX.Element}                                     The NotificationSnackBar component.
 */
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
