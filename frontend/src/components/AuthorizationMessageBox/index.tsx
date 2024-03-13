import { FormHelperText } from "@mui/material";

export const AuthorizationMessageBox = ({ message }: { message: string }) => {
  return <FormHelperText>{message}</FormHelperText>;
};
