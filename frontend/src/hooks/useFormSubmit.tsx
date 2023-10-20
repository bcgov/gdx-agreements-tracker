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
    tableName,
  }: IUseFormSubmitHandleSubmit) => {
    let deltaChanges: {
      [key: string]: boolean;
    } = {};

    if ("contact_project" === tableName) {
      deltaChanges = changedValues;
    } else {
      for (const key in changedValues) {
        if (changedValues[key] !== currentRowData[key]) {
          if (null !== changedValues[key] && changedValues[key].value) {
            deltaChanges[key] = changedValues[key].value;
          } else {
            deltaChanges[key] = changedValues[key];
          }
        }
      }
    }

    axiosAll()
      .put(apiUrl, deltaChanges)
      .then((data) => {
        return data.status;
      })
      .catch((err: string) => {
        console.error("error:", err);
        alert(`Error updating record:
        If you have attempted to change the Project Number on this Project Registration page,
        it should be unique. Any Project number that matches a previous Project Number will be rejected.
        The server responded with: ${err}
        `);
        return err;
      });
  };

  const handlePost = async ({ formValues, apiUrl }: IUseFormSubmitHandlePost) => {
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

  const handleDelete = async ({ apiUrl }: { apiUrl: string }) => {
    return axiosAll()
      .delete(apiUrl)
      .then((response) => {
        Promise.resolve(response);
      })
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
