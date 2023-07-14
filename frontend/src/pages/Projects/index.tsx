import { Table } from "components/PLAYGROUND/Table";
import { useFormData } from "hooks/useFormData";
import { tableConfig } from "./tableConfig";
import { useNavigate } from "react-router-dom";
import { GridRowParams } from "@mui/x-data-grid";
import { useFormSubmit } from "hooks";
import useTitle from "hooks/useTitle";
import { useEffect } from "react";

export const Projects = () => {
  const { handlePost } = useFormSubmit();

  const navigate = useNavigate();

  const apiUrl = `projects`;

  const rows = useFormData({
    url: apiUrl,
    tableName: "projects",
  });

  const handleRowDoubleClick = (row: GridRowParams) => {
    navigate(`${row.id}`);
  };

  const handleTableNewButton = async () => {
    await handlePost({ formValues: [], apiUrl: apiUrl as string }).then((response) => {
      navigate(`/${apiUrl}/${response.id}`);
    });
  };

  const { updateTitle } = useTitle();

  useEffect(() => {
    updateTitle("Projects");
  }, []);

  return (
    <Table
      rows={rows?.data?.data?.data}
      tableConfig={tableConfig()}
      handleRowDoubleClick={handleRowDoubleClick}
      handleTableNewButton={handleTableNewButton}
    />
  );
};
