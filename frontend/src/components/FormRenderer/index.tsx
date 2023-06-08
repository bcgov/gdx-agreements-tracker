import { InputForm } from "components/PLAYGROUND/Forms";
import { useQueryClient } from "react-query";
import { useFormControls, useFormSubmit, useFormLock } from "hooks";
import { ReadForm } from "components/ReadForm";
import { Box, Button, LinearProgress } from "@mui/material";
import { IFormRenderer, ILockData } from "types";
import { NotificationSnackBar } from "components/NotificationSnackbar";
import { useSnackbar } from "hooks/useSnackbar";
import { useMemo } from "react";

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
  readFields,
  editFields,
  postUrl,
  updateUrl,
  query,
  rowsToLock,
  initialValues,
}: IFormRenderer): JSX.Element => {
  const { handleUpdate, handlePost } = useFormSubmit();
  const { handleDbLock, removeLock } = useFormLock();
  const queryClient = useQueryClient();

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

  const { formType, handleFormType, handleClose } = useFormControls();

  const handleOnSubmit = async (values: unknown) => {
    try {
      if ("edit" === formType || query?.data?.data?.dbRowLock.currentUser) {
        await handleUpdate({
          changedValues: values,
          apiUrl: updateUrl,
          currentRowData: query.data.data.data,
        }).then(async () => {
          await removeLock(query, rowsToLock).then(() => {
            handleFormType("read");
          });
        });
      } else {
        await handlePost({ formValues: values, apiUrl: postUrl as string }).then(() => {
          handleClose();
        });
      }
    } catch (error) {
      handleSnackbarMessage("fail");
      handleSnackbarType("error");
      handleSnackbar();
    }

    handleSnackbarMessage("success");
    handleSnackbarType("success");
    handleSnackbar();
    queryClient.invalidateQueries([tableName]);
  };

  /**
   * The function `handleOnCancel` changes the form type to "read".
   */
  const handleOnCancel = async () => {
    if ("create" === formType) {
      await removeLock(query, rowsToLock).then(async () => {
        await query.refetch();
      });
    }
    handleFormType("read");
  };

  /**
   * This function handles a change event by locking a database, refetching data, and updating the
   * form type to "edit".
   */
  const handleOnChange = async () => {
    if ("create" === formType) {
      await handleDbLock(query, rowsToLock).then(async (lockData: ILockData) => {
        if (lockData.data.locked) {
          return confirm(
            `This section is currently being editied by: ${lockData.data.lockedBy}.  Please contact them for an update.`
          );
        }
      });
    }
    handleFormType("edit");
  };

  if ("edit" === formType) {
    return (
      <InputForm
        handleOnSubmit={handleOnSubmit}
        initialValues={query?.data?.data?.data}
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
        <Box m={1} display="flex" justifyContent="flex-end" alignItems="flex-end">
          <Button variant="contained" onClick={handleOnChange}>
            Change Section
          </Button>
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
