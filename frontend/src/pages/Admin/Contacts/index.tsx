import React, { FC } from "react";
import { Typography } from "@mui/material";
import { useFormatTableData } from "../../../hooks/";
import { Table } from "../../../components";
import { useFormControls } from "hooks/useFormControls";
import apiAxios from "utils/apiAxios";
import { useQuery } from "react-query";
import { Renderer } from "components/Renderer";
import { GDXModal } from "components/GDXModal";

export const Contacts: FC = () => {
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
    tableName: "contacts",
    apiEndPoint: `/contacts`,
    handleClick: handleOpen,
  });

  const getContacts = async () => {
    const contacts = await apiAxios().get(`/contacts/${currentRowData?.id}`);
    return contacts.data.data[0];
  };

  // Queries
  // todo: Define a good type. "Any" type temporarily permitted.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const contactsQuery: any = useQuery(`contacts - ${currentRowData?.id}`, getContacts, {
    refetchOnWindowFocus: false,
    retryOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: Infinity,
  });

  return (
    <>
      <Typography variant="h5" component="h2">
        Contacts
      </Typography>
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
          "new" === formType ? `New Contact` : `Change Contact ${contactsQuery?.data?.version}`
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
