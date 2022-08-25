import { Snackbar, Alert, AlertColor } from "@mui/material";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { IUseFormSubmitHandlePost, IUseFormSubmitHandleSubmit } from "../types";
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

  const handleUpdate = async ({
    changedValues,
    currentRowData,
    apiUrl,
    handleEditMode,
    queryKeys,
    successMessage,
    errorMessage,
  }: IUseFormSubmitHandleSubmit) => {
    const deltaChanges: {
      [key: string]: boolean;
    } = {};
    for (const key in changedValues) {
      if (changedValues[key] !== currentRowData[key]) {
        if (null !== changedValues[key] && changedValues[key].value) {
          deltaChanges[key] = changedValues[key].value;
        } else {
          deltaChanges[key] = changedValues[key];
        }
      }
    }
    await apiAxios()
      .put(apiUrl, deltaChanges)
      .then(() => {
        handleSnackBarMessage(successMessage as string);
        handleSnackBar("success");
        handleEditMode(false);
        queryKeys.forEach((queryKey: string) => {
          queryClient.invalidateQueries(queryKey);
        });
      })
      .catch((err: string) => {
        handleSnackBarMessage(errorMessage as string);
        handleSnackBar("error");
        console.error("error:", err);
      });
  };

  const handlePost = async ({
    formValues,
    apiUrl,
    handleEditMode,
    queryKeys,
    successMessage,
    errorMessage,
    handleClose,
  }: IUseFormSubmitHandlePost) => {
    const formattedValues: {
      [key: string]: boolean | string | null;
    } = {};
    for (const key in formValues) {
      if (formValues[key] !== null) {
        if (formValues[key].value) {
          formattedValues[key] = formValues[key].value;
        } else {
          formattedValues[key] = formValues[key];
        }
      } else {
        formattedValues[key] = null;
      }
    }
    await apiAxios()
      .post(apiUrl, formattedValues)
      .then(() => {
        handleSnackBarMessage(successMessage as string);
        handleSnackBar("success");
        handleEditMode(false);
        queryKeys.forEach((queryKey: string) => {
          queryClient.invalidateQueries(queryKey);
        });
        handleClose();
      })
      .catch((err: string) => {
        handleSnackBarMessage(errorMessage as string);
        handleSnackBar("error");
        console.error("error:", err);
      });
  };

  const Notification = () => {
    return (
      <Snackbar open={showSnackBar} autoHideDuration={3000} onClose={handleCloseSnackBar}>
        <Alert variant={"filled"} severity={snackbarType} sx={{ width: "100%" }}>
          {snackBarMessage}
        </Alert>
      </Snackbar>
    );
  };

  return { handlePost, handleUpdate, Notification };
};
