import { Box, Grid, LinearProgress, Paper, styled } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Table } from "../../../../components";
import { GDXModal } from "../../../../components/GDXModal";
import { useFormatTableData } from "../../../../hooks";
import { ViewForm } from "../../../../components/ViewForm";
import { IChangeRequestRow } from "../../../../types";
import { FormLayout } from "../../../../components/GDXForm";
import { GridItem } from "../../../../components/GDXForm/FormLayout/GridItem";
import { EditForm } from "../../../../components/EditForm";
export const ChangeRequest = () => {
  const [open, setOpen] = useState(false);
  const [currentChangeRequest, setCurrentChangeRequest] = useState<any>(undefined);
  const [editMode, setEditMode] = useState(false);
  const handleOpen = ({ row }: { row: IChangeRequestRow }) => {
    setCurrentChangeRequest(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentChangeRequest(undefined);
  };

  const handleEditMode = () => {
    setEditMode(true);
  };

  const { projectId } = useParams();
  const { data, isLoading } = useFormatTableData({
    tableName: "change_request",
    ApiEndPoint: `change_request/${projectId}`,
    handleClick: handleOpen,
  });

  const StyledBox = styled("div")({
    width: "100%",
    padding: "10px",
    display: "inline-block",
    margin: "5px",
  });

  const switchRender = () => {
    switch (isLoading) {
      case true:
        return <LinearProgress />;
      case false:
        return <Table columns={data.columns} rows={data.rows} loading={isLoading} />;
    }
  };

  return (
    <>
      {switchRender()}
      <GDXModal
        open={open}
        handleClose={handleClose}
        modalTitle={`Change Request ${currentChangeRequest?.version}`}
        handleEditMode={handleEditMode}
      >
        <FormLayout>
          {!editMode ? (
            <>
              <GridItem
                width="half"
                title="Approval Date"
                value={currentChangeRequest?.approval_date}
              />
              <GridItem width="half" title="CR Contact" value={currentChangeRequest?.cr_contact} />
              <GridItem width="half" title="Fiscal" value={currentChangeRequest?.fiscal_year} />
              <GridItem
                width="half"
                title="Initiated By"
                value={currentChangeRequest?.initiated_by}
              />
              <GridItem width="full" title="Summary" value={currentChangeRequest?.summary} />
              <GridItem width="half" title="Version" value={currentChangeRequest?.version} />
            </>
          ) : (
            <EditForm>
              

            </EditForm>
          )}
        </FormLayout>
      </GDXModal>
    </>
  );
};
