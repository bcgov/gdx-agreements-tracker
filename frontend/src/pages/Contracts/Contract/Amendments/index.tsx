import React, { FC } from "react";
import { Renderer } from "components/Renderer";
import { useFormControls } from "hooks/useFormControls";
import { GDXModal } from "components/GDXModal";
import { apiAxios } from "utils";
import { useQuery, UseQueryResult } from "react-query";
import { useParams } from "react-router-dom";
import { editFields, readFields } from "./fields";
import { ReadForm } from "components/ReadForm";
import { CreateForm } from "components/CreateForm";
import { EditForm } from "components/EditForm";
import { useFormSubmit } from "hooks/useFormSubmit";
import { FormikValues } from "formik";
import { Box, Button } from "@mui/material";
import { Table } from "components/Table";
import { useFormatTableData } from "hooks";
/**
 * The Amendments page
 *
 * @returns {JSX.Element} Amendments
 */

export const Amendments: FC = (): JSX.Element => {
  /**
   *
   * useFormControls is a hook that handles all functionality for a form.
   *
   * @returns  {object}
   * @property {Function}     handleEditMode       Handler for activating/deactivating edit mode.
   * @property {Function}     handleOpen           Handler for opening form modal.
   * @property {Function}     handleClose          Handler for closing form modal.
   * @property {Function}     handleCurrentRowData Handler for setting the current row data.
   * @property {Function}     handleFormType       Handler for setting the form type.
   * @property {"edit"|"new"} formType             The form type.
   * @property {boolean}      open                 To determine if form modal should be open or closed
   * @property {boolean}      editMode             To determine if the form is in edit mode.
   * @property {unknown}      currentRowData       The currently selected row in a table row.
   */

  const {
    handleEditMode,
    handleOpen,
    handleClose,
    handleCurrentRowData,
    handleFormType,
    formType,
    open,
    editMode,
    currentRowData,
  } = useFormControls();

  const { handlePost, handleUpdate, Notification } = useFormSubmit();

  /**
   * returns an object of key/value pairs of the dynamic params from the current URL that were matched by the <Route path>.
   * reference: https://reactrouter.com/docs/en/v6/hooks/use-params
   *
   * @returns {string} contractId
   */

  const { contractId } = useParams();

  /**
   * returns destructured props from the useFormatTableData hook.
   *
   * @param   {string}   tableName   - The name of the table that you are wanting data from.
   * @param   {string}   apiEndPoint - The enpoint as which the API query will use for it's call.
   * @param   {Function} handleClick - Function passed to the "view" button of the Table component.
   * @returns {object}               {data, isLoading}  - "data" contains the columns and rows of data for your table.  isLoading is a boolean prop that changes to true if quering data and false if it has received the data.
   */

  const { data, isLoading } = useFormatTableData({
    tableName: "amendment",
    apiEndPoint: `/contracts/${contractId}/amendments`,
    handleClick: handleOpen,
  });

  /**
   * getAmendment is the fetch function for react query to leverage.
   *
   * @returns {object} An object that contains the data from the table it's querying.
   */

  const getAmendment = async () => {
    const amendment = await apiAxios().get(
      `contracts/${contractId}/amendments/${currentRowData?.id}`
    );
    return amendment.data.data;
  };

  /**
   * returns destructured props from the useFormatTableData hook.
   *
   * @param   {string}         queryKey     - This is the queryKey.  The queryKey acts as a cache identifier for the UseQueryResult.
   * @param   {Function}       getAmendment - The enpoint as which the API query will use for it's call.
   * @returns {UseQueryResult}              - The result of react query which contains things such as the data.
   */
  // Queries
  const amendmentQuery: UseQueryResult<FormikValues> = useQuery(
    `/contracts/${contractId}/amendments/${currentRowData?.id}`,
    getAmendment,
    {
      refetchOnWindowFocus: false,
      retryOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: Infinity,
    }
  );
  const createFormInitialValues = {
    contract_id: contractId,
    amendment_number: "",
    amendment_date: null,
    description: "",
  };
  return (
    <>
      <Renderer
        isLoading={isLoading}
        component={
          <>
            <Table
              columns={data?.columns}
              rows={data?.rows}
              loading={isLoading}
              onRowClick={handleCurrentRowData}
            />
            <Box
              m={1}
              display="flex"
              justifyContent="flex-end"
              alignItems="flex-end"
              onClick={() => {
                handleOpen();
                handleEditMode(true);
                handleFormType("new");
              }}
            >
              <Button variant="contained">Add an amendment</Button>
            </Box>
          </>
        }
      />
      <GDXModal
        open={open}
        handleClose={handleClose}
        modalTitle={
          "new" === formType
            ? `New Amendment`
            : `Amendment ${amendmentQuery?.data?.contract_id.label}`
        }
        handleEditMode={handleEditMode}
        editMode={editMode}
        handleFormType={handleFormType}
      >
        <>
          {!editMode ? (
            <ReadForm fields={readFields(amendmentQuery)} />
          ) : (
            <>
              {"new" === formType ? (
                <CreateForm
                  initialValues={createFormInitialValues}
                  // todo: Define a good type. "Any" type temporarily permitted.
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onSubmit={async (values: any) => {
                    return handlePost({
                      formValues: values,
                      apiUrl: `/amendments`,
                      handleEditMode: handleEditMode,
                      queryKeys: [`/contracts/${contractId}/amendments`],
                      successMessage: `Changes saved successfully for amendment ${values.contract_id.label}`,
                      errorMessage: `There was an issue saving your changes for amendment ${data?.rows[0].contract}`,
                      handleClose: handleClose,
                    });
                  }}
                  editFields={editFields()}
                />
              ) : (
                <EditForm
                  initialValues={amendmentQuery?.data as FormikValues}
                  onSubmit={async (values) => {
                    return handleUpdate({
                      changedValues: values,
                      currentRowData: amendmentQuery?.data,
                      apiUrl: `amendments/${amendmentQuery?.data?.id}`,
                      handleEditMode: handleEditMode,
                      queryKeys: [
                        `/contracts/${contractId}/amendments/${currentRowData?.id}`,
                        `/contracts/${contractId}/amendments`,
                      ],
                      successMessage: `Changes saved successfully for amendment ${amendmentQuery?.data?.contract_id.label}`,
                      errorMessage: `There was an issue saving your amendment for ${amendmentQuery?.data?.contract_id.label}`,
                    });
                  }}
                  editFields={editFields()}
                />
              )}
            </>
          )}
        </>
      </GDXModal>
      <Notification />
    </>
  );
};
