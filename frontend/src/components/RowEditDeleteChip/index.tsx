import React, { FC } from "react";
import "./rowEditDeleteChip.scss";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { visuallyHidden } from "@mui/utils";
// import red from '@mui/material/colors/red';

// Callbacks can have any number of arguments and can have any return type.
interface IProps {
  /* eslint "no-warning-comments": [1, { "terms": ["todo", "fixme"] }] */
  // todo: Define a good type. "Any" type temporarily permitted.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  editCallback: (...args: any[]) => any;
  /* eslint "no-warning-comments": [1, { "terms": ["todo", "fixme"] }] */
  // todo: Define a good type. "Any" type temporarily permitted.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deleteCallback: (...args: any[]) => any;
}

export const RowEditDeleteChip: FC<IProps> = ({ editCallback, deleteCallback }) => {
  return (
    <div className="row-edit-delete-chip">
      <EditIcon className="edit-icon" sx={{ color: "secondary.main" }} onClick={editCallback} />
      <Box component="span" sx={visuallyHidden}>
        Edit user
      </Box>
      <DeleteIcon className="delete-icon" onClick={deleteCallback} />
      <Box component="span" sx={visuallyHidden}>
        Delete user
      </Box>
    </div>
  );
};

export default RowEditDeleteChip;
