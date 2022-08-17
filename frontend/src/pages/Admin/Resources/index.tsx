import React, { FC } from "react";
import { Typography } from "@mui/material";
import { useFormatTableData } from "../../../hooks/";
import { Table } from "../../../components";
import { Renderer } from "components/Renderer";
import { useFormControls } from "hooks/useFormControls";
import { GDXModal } from "components/GDXModal";
import { apiAxios } from "utils";
import { useQuery } from "react-query";

export const Resources: FC = () => {
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
    tableName: "resources",
    apiEndPoint: `/resources`,
    handleClick: handleOpen,
  });

  const getResources = async () => {
    const contacts = await apiAxios().get(`/resources/${currentRowData?.id}`);
    return contacts.data.data[0];
  };

  // Queries
  // todo: Define a good type. "Any" type temporarily permitted.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const resourcesQuery: any = useQuery(`resources - ${currentRowData?.id}`, getResources, {
    refetchOnWindowFocus: false,
    retryOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: Infinity,
  });

  return (
    <>
      <Typography variant="h5" component="h2">
        Resources
      </Typography>
      <Renderer
        isLoading={isLoading}
        component={
          <Table
            columns={data?.columns}
            rows={data?.rows}
            loading={isLoading}
            onRowClick={handleCurrentRowData}
          />
        }
      />
      <GDXModal
        open={open}
        handleClose={handleClose}
        modalTitle={
          "new" === formType ? `New Resource` : `Change Resource ${resourcesQuery?.data?.version}`
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
