import { Snackbar, Alert, AlertColor } from "@mui/material";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { IUseFormSubmitHandleSubmit } from "../types";
import { apiAxios } from "../utils";

/**
 * 
 * A hook that handles the submit functionality for any form
 */

export const useFormSubmit = () => {
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>("success");

  const queryClient = useQueryClient();

  const handleSnackBar = (status: string) => {
    setShowSnackBar(true);
    switch (status) {
      case "success":
        setSnackbarType("success");
        break;
      case "error":
        setSnackbarType("error");
        break;
    }
  };

  const handleCloseSnackBar = () => {
    setShowSnackBar(false);
  };

  const handleSnackBarMessage = (message: string) => {
    setSnackBarMessage(message);
  };

  const handleOnSubmit = async ({
    changedValues,
    currentRowData,
    apiUrl,
    handleEditMode,
    queryKeys,
  }: IUseFormSubmitHandleSubmit) => {
    const deltaChanges: {
      [key: string]: boolean;
    } = {};
    for (const key in changedValues) {
      if (changedValues[key] !== currentRowData[key]) {
        if (changedValues[key].value) {
          deltaChanges[key] = changedValues[key].value;
        } else {
          deltaChanges[key] = changedValues[key];
        }
      }
    }
    await apiAxios()
      .put(apiUrl, deltaChanges)
      .then((message: any) => {
        handleSnackBarMessage(`Changes saved successfully for ${changedValues.version}`);
        handleSnackBar("success");
        handleEditMode(false);
        queryKeys.forEach((queryKey: string) => {
          queryClient.invalidateQueries(queryKey);
        });
      })
      .catch((err: string) => {
        handleSnackBarMessage(
          `There was an issue saving your changes for ${changedValues.version}`
        );
        handleSnackBar("error");
        console.error("error:", err);
      });
  };

  const Notification = () => {
    return (
      <Snackbar open={showSnackBar} autoHideDuration={5000} onClose={handleCloseSnackBar}>
        <Alert variant={"filled"} severity={snackbarType} sx={{ width: "100%" }}>
          {snackBarMessage}
        </Alert>
      </Snackbar>
    );
  };

  return { handleOnSubmit, Notification };
};
