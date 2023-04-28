import { Link } from "@mui/material";
import { GridRenderCellParams, GridRenderEditCellParams } from "@mui/x-data-grid";
import {
  useState,
  ReactNode,
  useEffect,
  SetStateAction,
  ReactChild,
  ReactFragment,
  ReactPortal,
} from "react";
import { useNavigate } from "react-router-dom";

export const useRenderTableCell = () => {
  const [selectedRow, setSelectedRow] = useState<null | { id: number }>(null);

  const navigate = useNavigate();

  const handleSelectRow = async (params: SetStateAction<{ id: number } | null>) => {
    setSelectedRow(params);
  };

  useEffect(() => {
    if (selectedRow !== null) {
      navigate(`/projects/${selectedRow.id}`);
    }
  }, [selectedRow]);

  const LinkCell = (params: GridRenderCellParams) => {
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

  return { LinkCell, selectedRow };
};

export { TableCheckMark } from "./TableCheckMark";
export { TableHealthChip } from "./TableHealthChip";
