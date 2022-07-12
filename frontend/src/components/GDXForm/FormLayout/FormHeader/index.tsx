import styled from "@emotion/styled";
import { AppBar, Toolbar, IconButton, Typography, Box, Button, FormControl } from "@mui/material";
import React from "react";
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
}: {
  formTitle: string;
  handleEditMode: Function;
}) => {
  return (
    <div>
      <StyledAppBar position="sticky" role="form-header">
        <Toolbar role="form-header-toolbar">
          <Typography variant="h6" noWrap component="div">
            {formTitle}
          </Typography>
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
        </Toolbar>
      </StyledAppBar>
    </div>
  );
};
