import { InputForm } from "components/PLAYGROUND/Forms";
import { useQuery, useQueryClient } from "react-query";
import { useFormControls, useFormSubmit, useFormLock } from "hooks";
import { DBLock } from "components/DBLock";
import { ReadForm } from "components/ReadForm";
import { Box, Button, LinearProgress } from "@mui/material";
import { IFormRenderer } from "types";
import { NotificationSnackBar } from "components/NotificationSnackbar";
import { useSnackbar } from "hooks/useSnackbar";

/**
 * This is a functional component called `FormRenderer` that takes in several props including
   `queryKey`, `readFields`, `editFields`, `rowId`, `postUrl`, and `updateUrl`. It uses the `useQuery`
   hook from the `react-query` library to fetch data based on the `queryKey` prop. It also uses several
   custom hooks including `useFormSubmit`, `useFormControls`, and `useFormLock` to handle form
   submission, form controls, and database locking respectively. 
 
 * @param   {object}             props            The props passed to this rendering component
 * @param   {string[]}           props.queryKey   The key used to find the react query cache for the that item
 * @param   {Function}           props.readFields The read fields for the read form
 * @param   {Function}           props.editFields The read fields for the read form
 * @param   {string | undefined} props.rowId      The Database Table Row ID used to tell the dblock which row to lock or unlock 
 * @param   {string}             props.postUrl    The URL used to send a post request to the database
 * @param   {string}             props.updateUrl  The URL used to send an update request to the database
 * @returns {JSX.Element}
 */

export const FormRenderer = ({
  queryKey,
  readFields,
  editFields,
  rowId,
  postUrl,
  updateUrl,
}: IFormRenderer): JSX.Element => {
  // todo: Define a good type. "Any" type temporarily permitted.  The query:any type will be fixed when we upgrade to ReactQuery V4.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const query: any = useQuery({ queryKey });
  const { handleUpdate, handlePost } = useFormSubmit();
  const { handleFormType, formType } = useFormControls();
  const { handleDbLock, removeLock } = useFormLock();
  const { locked, currentUser } = query?.data?.dbRowLock;
  const queryClient = useQueryClient();
  const {
    handleSnackbar,
    handleSnackbarMessage,
    handleSnackbarType,
    snackbarMessage,
    snackbarType,
    snackbarOpen,
  } = useSnackbar();

  /**
   * This function handles form submission for editing or posting data and updates the UI accordingly.
   *
   * @param {unknown} values - The values parameter is of type unknown and is likely an object containing
   *                         form field values submitted by the user.
   */
  const handleOnSubmit = async (values: unknown) => {
    if ("edit" === formType || currentUser) {
      await handleUpdate({
        changedValues: values,
        apiUrl: updateUrl,
        currentRowData: query.data.data,
      })
        .then(async () => {
          handleSnackbarMessage("success");
          handleSnackbarType("success");
          handleSnackbar();
          await removeLock(query?.data?.dbRowLock).then(() => {
            handleFormType("read");
          });
        })
        .catch(() => {
          handleSnackbarMessage("fail");
          handleSnackbarType("error");
          handleSnackbar();
        });
    } else {
      await handlePost({ formValues: values, apiUrl: postUrl }).then(() => {
        handleFormType("read");
      });
    }
    queryClient.invalidateQueries(queryKey);
  };

  /**
   * The function `handleOnCancel` changes the form type to "read".
   */
  const handleOnCancel = async () => {
    await removeLock(query?.data?.dbRowLock).then(async () => {
      await query.refetch().then(() => {
        handleFormType("read");
      });
    });
  };

  /**
   * This function handles a change event by locking a database, refetching data, and updating the
   * form type to "edit".
   */
  const handleOnChange = async () => {
    await handleDbLock(query, rowId).then(async () => {
      await query.refetch().then(() => {
        handleFormType("edit");
      });
    });
  };

  /* This code block is determining what to render based on the current state of the form. If the form
    is locked, or if the form type is "edit" or "create", it will render an `InputForm` component
    with the appropriate props. If the form is not locked and the form type is "read", it will render
    a `ReadForm` component with the appropriate props and a button to change to the "edit" form type.
    If the form is not locked and the form type is not "read" or "create", it will render a
    `LinearProgress` component. If the form is locked and the current user is not the one who locked
    it, it will render a `DBLock` component with the appropriate props. */

  if (locked) {
    if (currentUser) {
      return (
        <InputForm
          handleOnSubmit={handleOnSubmit}
          initialValues={query?.data?.data}
          handleOnCancel={handleOnCancel}
          editFields={editFields()}
        />
      );
    }
    return (
      <DBLock
        handleDbLock={handleDbLock}
        removeLock={removeLock}
        query={query}
        handleFormType={handleFormType}
      />
    );
  }
  if ("edit" === formType) {
    return (
      <InputForm
        handleOnSubmit={handleOnSubmit}
        initialValues={query?.data?.data}
        handleOnCancel={handleOnCancel}
        editFields={editFields()}
      />
    );
  }
  if ("create" === formType) {
    return (
      <InputForm
        handleOnSubmit={handleOnSubmit}
        initialValues={[]}
        handleOnCancel={handleOnCancel}
        editFields={editFields()}
      />
    );
  }
  if ("read" === formType) {
    return (
      <>
        <ReadForm fields={readFields(query)} />
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
