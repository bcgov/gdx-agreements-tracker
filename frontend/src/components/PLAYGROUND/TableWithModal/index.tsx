import { ReactChild, ReactFragment, ReactPortal, SetStateAction, useState } from "react";
import { LinearProgress, Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useCallback } from "react";
import { IEditField, IReturnValue, IRowDoubleClickParams, ITableWithModal } from "types";
import FormModal from "../FormModal";
import { Table } from "../Table";
import { useFormControls } from "hooks";
import { useFormData } from "hooks/useFormData";
import { FormRenderer } from "components/FormRenderer";
import { IFormControls } from "types";
import { UseQueryResult } from "react-query";
import { AxiosResponse } from "axios";
import { FormikValues } from "formik";

/* This is a functional component called `TableWithModal` that takes in an object with a `apiEndPoint`
property of type string as its only argument. It uses the `useFormControls` and `useFormatTableData`
hooks to manage state and fetch data from the API endpoint. It also uses the `TableConfig` function


to get the columns, initial state, and selected row for the table. */

export const TableWithModal = ({
  tableData,
  tableConfig,
  formControls,
  formConfig,
  formData,
}: ITableWithModal) => {
  const { handleCurrentRowData, open, handleClose, handleOpen } = formControls;

  const handleRowDoubleClick = (params: IRowDoubleClickParams) => {
    handleCurrentRowData(params.row);
    handleOpen();
  };

  const { readFields, editFields, initialValues, rowsToLock, queryKey, postUrl, updateUrl } =
    formConfig(formData);

  return tableData.isLoading ? (
    <LinearProgress />
  ) : (
    <>
      <Table
        rows={tableData.data.data.data}
        tableConfig={tableConfig}
        handleRowDoubleClick={handleRowDoubleClick}
      />
      <FormModal open={open} handleClose={handleClose}>
        <FormRenderer
          queryKey={queryKey}
          readFields={readFields}
          editFields={editFields}
          postUrl={postUrl}
          updateUrl={updateUrl}
          query={formData}
          rowsToLock={rowsToLock}
        />
      </FormModal>
    </>
  );
};
