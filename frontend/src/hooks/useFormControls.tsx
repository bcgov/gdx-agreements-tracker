import { useState } from "react";

/**
 * A hook that handles all types of form controls such as opening a form and closing a form
 *
 */

export const useFormControls = () => {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  // todo: Define a good type. "Any" type temporarily permitted.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [currentRowData, setCurrentRowData] = useState<any>(undefined);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleEditMode = (toggle: boolean) => {
    setEditMode(toggle);
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
