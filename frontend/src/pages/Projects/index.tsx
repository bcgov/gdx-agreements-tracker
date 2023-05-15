import { Table } from "components/PLAYGROUND/Table";
import { useFormData } from "hooks/useFormData";
import { tableConfig } from "./tableConfig";
import { useNavigate } from "react-router-dom";
import { GridRowParams } from "@mui/x-data-grid";

export const Projects = () => {
  const navigate = useNavigate();

  const rows = useFormData({
    url: `projects`,
    tableName: "projects",
  });

  const handleRowDoubleClick = (row: GridRowParams) => {
    navigate(`${row.id}`);
  };
  return (
    <Table
      rows={rows?.data?.data?.data}
      tableConfig={tableConfig()}
      handleRowDoubleClick={handleRowDoubleClick}
    />
  );
};
