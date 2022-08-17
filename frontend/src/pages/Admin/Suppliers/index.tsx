import React, { FC } from "react";
import { LinearProgress, Typography } from "@mui/material";
import { useFormatTableData } from "../../../hooks/";
import { Table } from "../../../components";
import { Renderer } from "components/Renderer";
import { useFormControls } from "hooks/useFormControls";
import { GDXModal } from "components/GDXModal";
import { apiAxios } from "utils";
import { useQuery } from "react-query";

export const Suppliers: FC = () => {
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

  const { data, isLoading } = useFormatTableData({
    tableName: "suppliers",
    apiEndPoint: "suppliers",
    handleClick: handleOpen,
  });

  const getSuppliers = async () => {
    const suppliers = await apiAxios().get(`/suppliers/${currentRowData?.id}`);
    return suppliers.data.data[0];
  };

  // Queries
  // todo: Define a good type. "Any" type temporarily permitted.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const suppliersQuery: any = useQuery(`change_request - ${currentRowData?.id}`, getSuppliers, {
    refetchOnWindowFocus: false,
    retryOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: Infinity,
  });

  return (
    <>
      {/* <Typography variant="h5" component="h2">
        Suppliers
      </Typography>
      {!isLoading ? (
        <Table columns={data.columns} rows={data.rows} loading={isLoading} onRowClick={()=>{return}}/>
      ) : (
        <LinearProgress />
      )} */}
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
          </>
        }
      />
      <GDXModal
        open={open}
        handleClose={handleClose}
        modalTitle={
          "new" === formType
            ? `New Change Request`
            : `Change Request ${suppliersQuery?.data?.version}`
        }
        handleEditMode={handleEditMode}
        editMode={editMode}
        handleFormType={handleFormType}
      >
        <div>test</div>
      </GDXModal>
    </>
  );
};
