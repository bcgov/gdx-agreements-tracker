import React, { FC } from "react";
import { useFormatTableData } from "../../../hooks/";
import { Table } from "../../../components";

export const Suppliers: FC = () => {
  const { data, isLoading } = useFormatTableData({
    tableName: "suppliers",
    apiEndPoint: "suppliers",
  });

  return (
<<<<<<< HEAD
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
=======
    <>
      <Typography variant="h5" component="h2">
        Suppliers
      </Typography>
      {!isLoading ? (
        <Table columns={data.columns} rows={data.rows} loading={isLoading} />
      ) : (
        <LinearProgress />
      )}
>>>>>>> parent of 62f5c17 (suppliers example)
    </>
  );
};
