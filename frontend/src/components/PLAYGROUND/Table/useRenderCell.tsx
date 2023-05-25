import { Link } from "@mui/material";
import { GridRenderEditCellParams } from "@mui/x-data-grid";
import { useState, ReactNode, useEffect, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

export const useRenderTableCell = () => {
  const [selectedRow, setSelectedRow] = useState<{ id: number } | null>(null);

  const navigate = useNavigate();

  const handleSelectRow = async (params: SetStateAction<{ id: number } | null>) => {
    setSelectedRow(params);
  };

  useEffect(() => {
    if (selectedRow !== null) {
      navigate(`/projects/${selectedRow?.id}`);
    }
  }, [navigate, selectedRow]);

  const linkCell: ReactNode = (params: GridRenderEditCellParams) => {
    return (
      <Link
        color="inherit"
        onClick={() => {
          handleSelectRow(params.row);
        }}
      >
        {params.formattedValue}
      </Link>
    );
  };

  return [linkCell, navigate, selectedRow];
};
