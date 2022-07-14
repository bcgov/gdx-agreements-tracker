import React from "react";
import styled from "@emotion/styled";
import { AppBar, Toolbar, Typography, Button, FormControl } from "@mui/material";
import bcgovTheme from "../../../../bcgovTheme";
import EditIcon from "@mui/icons-material/Edit";

const StyledAppBar = styled(AppBar)({
  borderBottom: bcgovTheme.customSettings.BCGovAccentLine,
});

const StyledButtonLayout = styled(FormControl)({
  width: "100px",
  marginLeft: "auto",
  borderRadius: "10px",
  backgroundColor: "#FFF",
  color: "#000",
  padding: "1px",
});

export const FormHeader = ({
  formTitle,
  handleEditMode,
  editMode,
}: {
  formTitle: string;
  handleEditMode: Function;
  editMode: boolean;
}) => {
  return (
    <div>
      <StyledAppBar position="sticky" role="form-header">
        <Toolbar role="form-header-toolbar">
          <Typography variant="h6" noWrap component="div">
            {formTitle}
          </Typography>
          {!editMode ? (
            <StyledButtonLayout>
              <Button
                onClick={() => {
                  handleEditMode();
                }}
                endIcon={<EditIcon />}
              >
                Edit
              </Button>
            </StyledButtonLayout>
          ) : null}
        </Toolbar>
      </StyledAppBar>
    </div>
  );
};
