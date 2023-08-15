import { InputForm } from "components/Forms";
import { useQueryClient } from "@tanstack/react-query";
import { useFormSubmit, useFormLock } from "hooks";
import { ReadForm } from "components/Forms/ReadForm";
import { Box, Button, LinearProgress } from "@mui/material";
import { IFormRenderer, ILockData } from "types";
import { NotificationSnackBar } from "components/NotificationSnackbar";
import { useSnackbar } from "hooks/useSnackbar";
import { useFormData } from "hooks/useFormData";
import { useNavigate } from "react-router";

/**
 * This is a functional component called `FormRenderer` that takes in several props including `queryKey`, `readFields`, `editFields`, `rowId`, `postUrl`, and `updateUrl`.
 * It uses the `useQuery` hook from the `react-query` library to fetch data based on the `queryKey` prop.
 * It also uses several custom hooks including `useFormSubmit`, `useFormControls`, and `useFormLock`
 * to handle form submission, form controls, and database locking respectively.
 *
 * @param   {object}             props            The props passed to this rendering component
 * @param   {string[]}           props.tableName  The key used to find the react query cache for the that item
 * @param   {Function}           props.readFields The read fields for the read form
 * @param   {Function}           props.editFields The read fields for the read form
 * @param   {string | undefined} props.rowId      The Database Table Row ID used to tell the dblock which row to lock or unlock
 * @param   {string}             props.postUrl    The URL used to send a post request to the database
 * @param   {string}             props.updateUrl  The URL used to send an update request to the database
 * @returns {JSX.Element}
 */

export const FormRenderer = ({
  formControls,
  tableName,
  formConfig,
  formDataApiEndpoint,
}: IFormRenderer): JSX.Element => {
  const navigate = useNavigate();
  const { handleUpdate, handlePost } = useFormSubmit();
  const { handleDbLock, removeLock } = useFormLock();
  const queryClient = useQueryClient();

  const formData = useFormData({
    url: formDataApiEndpoint,
    tableName,
  });

  const { readFields, editFields, initialValues, rowsToLock, postUrl, updateUrl } =
    formConfig(formData);
  /**
   * This function handles form submission for editing or posting data and updates the UI accordingly.
   *
   * @param {unknown} values - The values parameter is of type unknown and is likely an object containing
   *                         form field values submitted by the user.
   */
  const {
    handleSnackbar,
    handleSnackbarMessage,
    handleSnackbarType,
    snackbarMessage,
    snackbarType,
    snackbarOpen,
  } = useSnackbar();

  const { formType, handleFormType, handleClose } = formControls;
  const handleOnSubmit = async (values: unknown) => {
    try {
      if ("edit" === formType || formData?.data?.data?.dbRowLock?.currentUser) {
        await handleUpdate({
          changedValues: values,
          apiUrl: updateUrl,
          currentRowData: formData.data?.data.data,
          tableName,
        }).then(async () => {
          await removeLock(formData, rowsToLock).then(() => {
            handleFormType("read");
          });
        });
      } else {
        await handlePost({ formValues: values, apiUrl: postUrl as string }).then((newItem) => {
          if ("contract" === tableName) {
            navigate(`/contracts/${newItem}`);
          }
        });
      }
    } catch (error) {
      console.error("error", error);
      handleSnackbarMessage("fail");
      handleSnackbarType("error");
      handleSnackbar();
    }

    handleSnackbarMessage("success");
    handleSnackbarType("success");
    handleSnackbar();
    //TODO Make the invalidation of queries more efficient.
    queryClient.invalidateQueries();
  };

  /**
   * The function `handleOnCancel` changes the form type to "read".
   */
  const handleOnCancel = async () => {
    if ("edit" === formType) {
      await removeLock(formData, rowsToLock).then(async () => {
        handleClose();
        formData.refetch();
        return <div>e</div>;
      });
    }
  };

  /**
   * This function handles a change event by locking a database, refetching data, and updating the
   * form type to "edit".
   */
  const handleOnChange = async () => {
    await handleDbLock(formData, rowsToLock).then(async (lockData: ILockData) => {
      if (lockData.data.locked) {
        return confirm(
          `This section is currently being editied by: ${lockData.data.lockedBy}.  Please contact them for an update.`
        );
      }
    });
    handleFormType("edit");
  };

  if (formData.isLoading) {
    return <LinearProgress />;
  }

  if ("edit" === formType) {
    if (Array.isArray(formData?.data?.data?.data) && formData?.data) {
      const newInitialValues: { [key: string]: { [key: string]: string | number }[] } = {};
      formData?.data?.data?.data.map(
        (role: {
          role_id: number;
          role_type: string;
          contacts: { [key: string]: string | number }[];
        }) => {
          newInitialValues[role.role_id] = role.contacts;
        }
      );
      formData.data.data.data = newInitialValues;
    }
    return (
      <InputForm
        handleOnSubmit={handleOnSubmit}
        initialValues={formData?.data?.data?.data}
        handleOnCancel={handleOnCancel}
        editFields={editFields}
      />
    );
  }
  if ("new" === formType) {
    return (
      <InputForm
        handleOnSubmit={handleOnSubmit}
        initialValues={initialValues}
        handleOnCancel={handleOnCancel}
        editFields={editFields}
      />
    );
  }
  if ("read" === formType) {
    return (
      <>
        <ReadForm fields={readFields} />

        <Box mt={1} display="flex" justifyContent="flex-end" alignItems="flex-end">
          <Box>
            <Button variant="contained" onClick={handleOnCancel} color="secondary">
              Cancel
            </Button>
          </Box>
          <Box ml={1}>
            <Button variant="contained" onClick={handleOnChange}>
              Change Section
            </Button>
          </Box>
        </Box>
        <NotificationSnackBar
          snackbarMessage={snackbarMessage}
          snackbarOpen={snackbarOpen}
          snackbarType={snackbarType}
          handleSnackbar={handleSnackbar}
        />
      </>
    );
  }
  return <LinearProgress />;
};
