import { Table } from "components/PLAYGROUND/Table";
import { tableConfig } from "./tableConfig";
import { useNavigate } from "react-router-dom";
import { GridRowParams } from "@mui/x-data-grid";
import { useFormatTableData } from "components/PLAYGROUND/Table/useFormatTableData";
import { LinearProgress } from "@mui/material";
export const Contracts = () => {
  const navigate = useNavigate();

  const tableName = "contract";

  const tableData = useFormatTableData({
    apiEndPoint: `contracts`,
    tableName,
  });

  const handleRowDoubleClick = (row: GridRowParams) => {
    navigate(`${row.id}`);
  };

  return tableData.isLoading ? (
    <LinearProgress />
  ) : (
    <Table
      rows={tableData.data.data.data}
      tableConfig={tableConfig()}
      handleRowDoubleClick={handleRowDoubleClick}
    />
  );
};
