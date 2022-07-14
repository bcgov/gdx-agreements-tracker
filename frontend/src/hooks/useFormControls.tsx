import { useState } from "react";

export const useFormControls = () => {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentRowData, setCurrentRowData] = useState<any>(undefined);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleEditMode = () => {
    setEditMode(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setCurrentRowData(undefined);
  };

  const handleCurrentRowData = (rowData: { row: unknown }) => {
    setCurrentRowData(rowData.row);
  };

  return {
    handleEditMode,
    handleOpen,
    handleClose,
    handleCurrentRowData,
    open,
    editMode,
    currentRowData,
  };
};
