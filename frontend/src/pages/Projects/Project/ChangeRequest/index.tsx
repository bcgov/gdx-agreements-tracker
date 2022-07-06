import { LinearProgress } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { Table } from "../../../../components";
import { useFormatTableData } from "../../../../hooks";

export const ChangeRequest = () => {
  const { projectId } = useParams();
  const { data, isLoading } = useFormatTableData({
    tableName: "change_request",
    ApiEndPoint: `change_request/${projectId}`,
  });

  const switchRender = () => {
    switch (isLoading) {
      case true:
        return <LinearProgress />;
      case false:
        return <Table columns={data.columns} rows={data.rows} loading={isLoading} />;
      default:
        return <LinearProgress />;
    }
  };

  return <>{switchRender()}</>;
};
