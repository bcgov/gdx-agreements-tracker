# FormDialog

`FormDialog` is a React component that renders a **Dialog** component from the **Material UI** library. The dialog has a **title bar** with a **close button** on the right side. The title bar also contains a **Delete button**

### Usage

If the `deleteUrl` prop is passed to the component. The dialog's content is passed as a child to the `DialogContent` component. The `FormDialog` component also renders another dialog component that prompts the user to confirm deletion of an item. The `handleDelete` function is called when the user confirms deletion. The `handleClose` function is called when the user clicks the close button on the title bar. The `useQueryClient` hook is used to get the query client instance. The `handleDeleteResponse` function is called when the user confirms deletion and it invalidates the queries in the query client instance. FormDialog that accepts several props:

- `children`: The content of the dialog.
- `open`: Whether the dialog is open or not.
- `handleClose`: The function to call when the user clicks the close button.
- `handleDelete`: The function to call when the user confirms deletion.
- `deleteUrl`: The URL to call when the user confirms deletion.

### Example

```tsx
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  Button,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useQueryClient } from "@tanstack/react-query";

interface FormDialogProps {
  children: React.ReactNode;
  open: boolean;
  handleClose: Function;
  handleDelete: (options: { apiUrl: string }) => Promise<void>; // Update the function signature
  deleteUrl: string;
}

const FormDialog: React.FC<FormDialogProps> = ({
  children,
  open,
  handleClose,
  handleDelete,
  deleteUrl,
}) => {
  const [openDeletePrompt, setOpenDeletePrompt] = useState(false);
  const queryClient = useQueryClient();

  const handleDeleteResponse = async () => {
    await handleDelete({ apiUrl: deleteUrl }).then(() => {
      setOpenDeletePrompt(false);
      handleClose();
      queryClient.invalidateQueries();
    });
  };
  return (
    <>
      <Dialog open={open} fullWidth maxWidth="md">
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#e9e9e9",
          }}
        >
          {deleteUrl && (
            <Button
              variant="contained"
              startIcon={<DeleteForeverIcon />}
              color="error"
              onClick={() => {
                setOpenDeletePrompt(true);
              }}
            >
              Delete
            </Button>
          )}
          <IconButton sx={{ ml: "auto" }} onClick={() => handleClose()}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>{children}</DialogContent>
      </Dialog>

      <Dialog
        open={openDeletePrompt}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Item"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeletePrompt(false)}>Cancel</Button>
          <Button onClick={handleDeleteResponse} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
```

There is a working example of `<FormDialog>` at the very bottom of the [`<TableWithModal>`](https://github.com/bcgov/gdx-agreements-tracker/blob/development/frontend/src/components/TableWithModal/index.tsx) component.
