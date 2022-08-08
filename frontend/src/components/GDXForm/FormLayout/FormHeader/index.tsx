import React from "react";
import styled from "@emotion/styled";
import { AppBar, Toolbar, Typography, Button, FormControl } from "@mui/material";
import bcgovTheme from "../../../../bcgovTheme";
import EditIcon from "@mui/icons-material/Edit";
import { useRoleChecker } from "../../../../hooks/useRoleChecker";

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

/**
 *
 * @param {{formTitle: string,handleEditMode: Function,editMode: boolean}}
 * @returns a JSX header that can be used on any form
 */

export const FormHeader = ({
  formTitle,
  handleEditMode,
  editMode,
  handleFormType,
  handleFormType,
}: {
  formTitle: string;
  handleEditMode: Function;
  editMode: boolean;
  handleFormType: Function;
  handleFormType: Function;
}) => {
  const { checkRoleExists }: { checkRoleExists: () => boolean } = useRoleChecker([
    "pmo-manager",
    "pmo-sys-admin",
  ]);

  return (
    <div>
      <StyledAppBar position="sticky" role="form-header">
        <Toolbar role="form-header-toolbar">
          <Typography variant="h6" noWrap component="div">
            {formTitle}
          </Typography>
          {!editMode && checkRoleExists() ? (
            <StyledButtonLayout>
              <Button
                onClick={() => {
                  handleEditMode(true);
                  handleFormType("edit");
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
