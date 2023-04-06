import React from "react";
import styled from "@emotion/styled";
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from "@mui/material";
import bcgovTheme from "../../../bcgovTheme";
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { DeleteButton } from "components/DeleteButton";

const StyledAppBar = styled(AppBar)({
  borderBottom: bcgovTheme.customSettings.BCGovAccentLine,
});

const StyledButtonLayout = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "row",
});

/**
 *
 * @param   {{modalTitle: string,handleEditMode: Function,editMode: boolean}}
 * @returns                                                                   a JSX header that can be used on any form
 */

export const ModalHeader = ({
  modalTitle,
  handleEditMode,
  editMode,
  handleDelete,
  handleFormType,
  onClose,
}: {
  modalTitle: string;
  handleEditMode: Function;
  editMode: boolean;
  handleDelete: Function;
  handleFormType: Function;
  onClose: Function;
}) => {
  return (
    <div>
      <StyledAppBar position="sticky" role="form-header">
        <Toolbar role="form-header-toolbar" sx={{ paddingRight: "0px" }}>
          <StyledButtonLayout>
            <Box sx={{ display: "flex" }}>
              <Typography variant="h6" noWrap marginRight={2} alignSelf="center">
                {modalTitle}
              </Typography>
              <DeleteButton
                handleDelete={() => {
                  onClose();
                  handleDelete();
                }}
              />
            </Box>
            <Box sx={{ display: "flex" }}>
              {!editMode ? (
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => {
                    handleEditMode(true);
                    handleFormType("edit");
                  }}
                  endIcon={<EditIcon />}
                >
                  Edit
                </Button>
              ) : null}
              <IconButton
                color="secondary"
                size="large"
                onClick={() => {
                  onClose();
                }}
              >
                <HighlightOffIcon />
              </IconButton>
            </Box>
          </StyledButtonLayout>
        </Toolbar>
      </StyledAppBar>
    </div>
  );
};
