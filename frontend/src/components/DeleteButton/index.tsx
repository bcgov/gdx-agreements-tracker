import React, { useRef } from "react";
import { Button, ButtonProps } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ConfirmationDialog } from "components/ConfirmationDialog";

interface IDeleteButtonProps extends Omit<ButtonProps, "onClick" | "endIcon"> {
  handleDelete: Function;
}

export const DeleteButton = (props: IDeleteButtonProps) => {
  const { handleDelete, ...buttonProps } = props;
  const dialogRef = useRef<{ openDialog: Function }>();

  return (
    <>
      <Button
        color="error"
        variant="contained"
        onClick={() => {
          if (dialogRef?.current) {
            dialogRef.current.openDialog();
          }
        }}
        endIcon={<DeleteIcon />}
        {...buttonProps}
      >
        Delete
      </Button>
      <ConfirmationDialog
        ref={dialogRef}
        handleConfirm={handleDelete}
        title={"Confirm Delete"}
        body={"Are you sure you want to delete?"}
      />
    </>
  );
};
