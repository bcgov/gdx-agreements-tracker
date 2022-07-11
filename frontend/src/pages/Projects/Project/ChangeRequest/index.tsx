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
export const ChangeRequest = () => {
  const [open, setOpen] = useState(false);
  const [currentChangeRequest, setCurrentChangeRequest] = useState<any>(undefined);

  const handleOpen = ({ row }: { row: IChangeRequestRow }) => {
    setCurrentChangeRequest(row);
    setOpen(!open);
  };

  const { projectId } = useParams();
  const { data, isLoading } = useFormatTableData({
    tableName: "change_request",
    ApiEndPoint: `change_request/${projectId}`,
    handleClick: handleOpen,
  });

  const switchRender = () => {
    switch (isLoading) {
      case true:
        return <LinearProgress />;
      case false:
        return (
          <>
            <Table columns={data.columns} rows={data.rows} loading={isLoading} />
            <GDXModal open={open}>
              <ViewForm>
                <FormLayout>
                  <GridItem
                    width="half"
                    title="Approval Date"
                    value={currentChangeRequest?.approval_date}
                  />
                  <GridItem width="half" title="Contact" value={currentChangeRequest?.cr_contact} />
                  <GridItem width="half" title="Fiscal" value={currentChangeRequest?.fiscal_year} />
                  <GridItem
                    width="half"
                    title="Initiated By"
                    value={currentChangeRequest?.initiated_by}
                  />
                  <GridItem width="full" title="Summary" value={currentChangeRequest?.summary} />
                  <GridItem width="half" title="Version" value={currentChangeRequest?.version} />
                </FormLayout>
              </ViewForm>
            </GDXModal>
          </>
        );
      default:
        return <LinearProgress />;
    }
  };

  return <>{switchRender()}</>;
};
