import { IUseFormSubmitHandlePost, IUseFormSubmitHandleSubmit } from "../types";
import { useAxios } from "./useAxios";

/**
 *
 * A hook that handles the submit functionality for any form
 */

export const useFormSubmit = () => {
  const { axiosAll } = useAxios();

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
    axiosAll()
      .put(apiUrl, changedValues)
      .then((data) => {
        return data.status;
      })
      .catch((err: string) => {
        console.error("error:", err);
        return err;
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
      }
    }
    return await axiosAll()
      .post(apiUrl, formattedValues)
      .then((results) => {
        return results.data.data;
      })
      .catch((err: string) => {
        console.error("error:", err);
      });
  };

  const handleDelete = async ({
    apiUrl,
    queryKeys,
    successMessage,
    errorMessage,
  }: {
    apiUrl: string;
    queryKeys: string[];
    successMessage: string;
    errorMessage: string;
  }) => {
    await axiosAll()
      .delete(apiUrl)
      .then(() => {})
      .catch((err: string) => {
        console.error("error:", err);
      });
  };
  //TODO Remove this component and update where it's being used with new method for snackbar rendering
  const Notification = () => {
    return <div></div>;
  };

  return { handlePost, handleUpdate, handleDelete, Notification };
};
