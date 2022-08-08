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
  const [formType, setFormType] = useState("read");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleEditMode = (toggle: boolean) => {
    setEditMode(toggle);
  };

  const handleFormType = (formType: string) => {
    setFormType(formType);
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
    handleFormType,
    formType,
    open,
    editMode,
    currentRowData,
  };
};
