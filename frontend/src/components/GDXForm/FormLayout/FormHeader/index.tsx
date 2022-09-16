import React from "react";
import styled from "@emotion/styled";
import { AppBar, Toolbar, Typography, Button, FormControl } from "@mui/material";
import bcgovTheme from "../../../../bcgovTheme";
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const StyledAppBar = styled(AppBar)({
  borderBottom: bcgovTheme.customSettings.BCGovAccentLine,
});

const StyledButtonLayout = styled(FormControl)({
  marginLeft: "auto",
  padding: "1px",
  flexDirection: "row",
});

const StyleButton = styled(Button)({
  backgroundColor: "#fff !important",
  marginLeft: "0.5rem",
});

/**
 *
 * @param   {{formTitle: string,handleEditMode: Function,editMode: boolean}}
 * @returns                                                                  a JSX header that can be used on any form
 */

export const FormHeader = ({
  formTitle,
  handleEditMode,
  editMode,
  allowEdit,
  handleFormType,
  handleClose,
}: {
  formTitle: string;
  handleEditMode: Function;
  editMode: boolean;
  allowEdit: boolean;
  handleFormType: Function;
  handleClose?: Function;
}) => {
  return (
    <div>
      <StyledAppBar position="sticky" role="form-header">
        <Toolbar role="form-header-toolbar">
          <Typography variant="h6" noWrap component="div">
            {formTitle}
          </Typography>

          <StyledButtonLayout>
            {!editMode && allowEdit ? (
              <StyleButton
                onClick={() => {
                  handleEditMode(true);
                  handleFormType("edit");
                }}
                endIcon={<EditIcon />}
              >
                Edit
              </StyleButton>
            ) : null}
            <StyleButton
              onClick={() => {
                if (undefined !== handleClose) {
                  handleClose();
                }
              }}
              endIcon={<HighlightOffIcon />}
            ></StyleButton>
          </StyledButtonLayout>
        </Toolbar>
      </StyledAppBar>
    </div>
  );
};
