import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
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
import { useAxios } from "hooks/useAxios";
import { IEditField, IInitialValues, IReturnValue } from "types";
import { GridEventListener, GridEvents } from "@mui/x-data-grid";

export const TableComplete = ({
  itemName,
  tableName,
  url,
  createFormInitialValues,
  readFields,
  editFields,
  totalColumns,
  roles,
  getSelectedRow,
  columnWidths,
}: {
  itemName: string;
  tableName: string;
  url: {
    getAll: string;
    getOne: string;
    updateOne: string;
    addOne: string;
    deleteOne?: string;
  };
  createFormInitialValues: IInitialValues;
  readFields: Function;
  editFields: IEditField[];
  totalColumns?: string[];
  roles: {
    get: string;
    update: string;
    add: string;
    delete: string;
  };
  getSelectedRow?: Function;
  columnWidths?: { [key: string]: number };
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
    apiEndPoint: url.getAll,
    columnWidths: columnWidths,
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
    const apiUrl = getApiUrl(url.getOne, currentRowData?.id);
    if (currentRowData?.id && apiUrl) {
      const apiData = await axiosAll().get(apiUrl);
      return apiData.data.data;
    }
  };

  /**
   * Get the url for a getOne item.
   *
   * @param   {string}           url The raw url, that might need to be converted to replace id with current id.
   * @param   {number|undefined} id  The current id, used to create the url.
   * @returns {string}
   */
  const getApiUrl = (url: string, id: number | undefined) => {
    if (undefined !== id) {
      return url.replace(/{id}/g, id.toString());
    }
    return "";
  };

  const handleDeleteClick = () => {
    if (!url.deleteOne) {
      return false;
    }
    handleDelete({
      apiUrl: getApiUrl(url.deleteOne as string, currentRowData.id),
      queryKeys: [url.getAll],
      successMessage: "Deleted successfully.",
      errorMessage: "There was an issue deleting the item.",
    });
  };

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
    apiEndPoint: url.getAll,
    columnWidths: columnWidths,
    handleClick: handleOpen,
  });

  useEffect(() => {
    setUserCapabilities(data?.user?.capabilities);
  }, [data]);

  /**
   * used for the react query.
   *
   * @param   {string}         queryKey     - This is the queryKey.  The queryKey acts as a cache identifier for the UseQueryResult.
   * @param   {Function}       getAmendment - The enpoint as which the API query will use for it's call.
   * @returns {UseQueryResult}              - The result of react query which contains things such as the data.
   */
  // Queries
  export const reactQuery: UseQueryResult<FormikValues> = useQuery(
    getApiUrl(url.getOne, currentRowData?.id),
    getApiData,
    {
      refetchOnWindowFocus: false,
      retryOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: Infinity,
    }
  );

  /**
   * Handle row click event from DataGrid.
   *
   * @param {any} row The row that was clicked.
   */
  const handleRowClick: GridEventListener<GridEvents.rowClick> = (row) => {
    handleCurrentRowData(row);
    if (getSelectedRow) {
      getSelectedRow(row);
    }
  };

  return (
    <>
      {hasRole(roles.get) && (
        <Renderer
          isLoading={isLoading}
          component={
            <>
              <Typography variant="h5" component="h2">
                {itemName}
              </Typography>
              <Table
                columns={data?.columns}
                rows={data?.rows}
                totalColumns={totalColumns ?? []}
                allowEdit={hasRole(roles.add)}
                loading={isLoading}
                onRowClick={handleRowClick}
              />
              <Box m={1} display="flex" justifyContent="flex-end" alignItems="flex-end">
                {hasRole(roles.add) && (
                  <Button
                    onClick={() => {
                      handleOpen();
                      handleEditMode(true);
                      handleFormType("new");
                    }}
                    variant="contained"
                  >{`Add New ${itemName}`}</Button>
                )}
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
        allowDelete={hasRole(roles.delete) && undefined !== url.deleteOne && "new" !== formType}
        handleDelete={handleDeleteClick}
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
                  onSubmit={async (values: { [key: string]: IReturnValue }) => {
                    return handlePost({
                      formValues: values,
                      apiUrl: url.addOne,
                      handleEditMode: handleEditMode,
                      queryKeys: [url.getAll],
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
                      apiUrl: getApiUrl(url.updateOne, reactQuery?.data?.id),
                      handleEditMode: handleEditMode,
                      queryKeys: [url.getAll, getApiUrl(url.getOne, reactQuery?.data?.id)],
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
