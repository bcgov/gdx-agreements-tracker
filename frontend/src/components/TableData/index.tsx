import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { Renderer } from "components/Renderer";
import { Table } from "components/Table";
import { useFormControls } from "hooks/useFormControls";
import { useFormatTableData } from "hooks";
import { useFormSubmit } from "hooks/useFormSubmit";
import { GDXModal } from "components/GDXModal";
import { useQuery, UseQueryResult } from "react-query";
import { FormikValues } from "formik";
import { ReadForm } from "components/ReadForm";
import { CreateForm } from "components/CreateForm";
import { EditForm } from "components/EditForm";
import { IEditFields } from "types";
import { useAxios } from "hooks/useAxios";

/* eslint "no-warning-comments": [1, { "terms": ["todo", "fixme"] }] */
// todo: Define a good type. "Any" type temporarily permitted.
export const TableData = ({
  itemName,
  tableName,
  getOneUrl,
  getAllUrl,
  createFormInitialValues,
  readFields,
  editFields,
  roles,
}: {
  itemName: string;
  tableName: string;
  getOneUrl: string;
  getAllUrl: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createFormInitialValues: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readFields: any;
  editFields: IEditFields[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  roles: any;
}) => {
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

  const [userCapabilities, setUserCapabilities] = useState<string[]>([]);

  const { axiosAll } = useAxios();

  /**
   * returns destructured props from the useFormatTableData hook.
   *
   * @param   {string}   tableName   - The name of the table that you are wanting data from.
   * @param   {string}   apiEndPoint - The enpoint as which the API query will use for it's call.
   * @param   {Function} handleClick - Function passed to the "view" button of the Table component.
   * @returns {object}               {data, isLoading}  - "data" contains the columns and rows of data for your table.  isLoading is a boolean prop that changes to true if quering data and false if it has received the data.
   */

  const { data, isLoading } = useFormatTableData({
    tableName: tableName,
    apiEndPoint: getAllUrl,
    handleClick: handleOpen,
  });

  useEffect(() => {
    setUserCapabilities(data?.user?.capabilities);
  }, [data]);

  /**
   * getApiData is the fetch function for react query to leverage.
   *
   * @returns {object} An object that contains the data from the table it's querying.
   */
  const getApiData = async () => {
    const apiUrl = getOneApiUrl(currentRowData?.id);
    if (currentRowData?.id && apiUrl) {
      const apiData = await axiosAll().get(apiUrl);
      return apiData.data.data;
    }
  };

  /**
   * Get the url for a getOne item.
   *
   * @param   {number|undefined} id The current id, used to create the url.
   * @returns {string}
   */
  const getOneApiUrl = (id: number | undefined) => {
    if (undefined !== id) {
      return getOneUrl.replace(/{id}/g, id.toString());
    }
    return "";
  };

  const hasRole = (requiredRole: string) => {
    let allowed = false;
    if (Array.isArray(userCapabilities) && userCapabilities.length > 0) {
      allowed = userCapabilities.includes(requiredRole);
    }
    return allowed;
  };

  /**
   * used for the react query.
   *
   * @param   {string}         queryKey     - This is the queryKey.  The queryKey acts as a cache identifier for the UseQueryResult.
   * @param   {Function}       getAmendment - The enpoint as which the API query will use for it's call.
   * @returns {UseQueryResult}              - The result of react query which contains things such as the data.
   */
  // Queries
  const reactQuery: UseQueryResult<FormikValues> = useQuery(
    getOneApiUrl(currentRowData?.id),
    getApiData,
    {
      refetchOnWindowFocus: false,
      retryOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: Infinity,
    }
  );

  return (
    <>
      {hasRole(roles.get) && (
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
                {hasRole(roles.add) && <Button variant="contained">{`Add New ${itemName}`}</Button>}
              </Box>
            </>
          }
        />
      )}
      <GDXModal
        open={open}
        handleClose={handleClose}
        modalTitle={"new" === formType ? `New ${itemName}` : `${itemName} ${reactQuery?.data?.id}`}
        handleEditMode={handleEditMode}
        editMode={editMode}
        allowEdit={hasRole(roles.update)}
        handleFormType={handleFormType}
      >
        <>
          {!editMode ? (
            <ReadForm fields={readFields(reactQuery)} />
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
                      apiUrl: `/${tableName}`,
                      handleEditMode: handleEditMode,
                      queryKeys: [getAllUrl],
                      successMessage: `Created successfully.`,
                      errorMessage: `There was an issue creating your item.`,
                      handleClose: handleClose,
                    });
                  }}
                  editFields={editFields}
                />
              ) : (
                <EditForm
                  initialValues={reactQuery?.data as FormikValues}
                  onSubmit={async (values) => {
                    return handleUpdate({
                      changedValues: values,
                      currentRowData: reactQuery?.data,
                      apiUrl: getOneApiUrl(reactQuery?.data?.id),
                      handleEditMode: handleEditMode,
                      queryKeys: [getAllUrl, getOneApiUrl(reactQuery?.data?.id)],
                      successMessage: `Changes saved successfully.`,
                      errorMessage: `There was an issue saving.`,
                    });
                  }}
                  editFields={editFields}
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
