import React from "react";
import { Box, Modal, styled } from "@mui/material";
import { FormHeader } from "../GDXForm/FormLayout/FormHeader";

export const GDXModal = ({
  children,
  open,
  handleClose,
  modalTitle,
  handleEditMode,
  editMode,
  handleFormType,
}: {
  children: JSX.Element;
  open: boolean;
  handleClose: () => void;
  modalTitle: string;
  handleEditMode: Function;
  editMode: boolean;
  handleFormType: Function;
}) => {
  const StyledModalBox = styled(Box)({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#FFF",
    width: "80%",
    overflowY: "auto",
    height: "auto",
    maxHeight: "100%",
  });

  const StyledContentBox = styled(Box)({
    padding: "20px",
  });

  return (
    <>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClose={handleClose}
      >
        <StyledModalBox>
          <FormHeader
            formTitle={modalTitle}
            handleEditMode={handleEditMode}
            editMode={editMode}
            handleFormType={handleFormType}
          />
          <StyledContentBox>{children}</StyledContentBox>
        </StyledModalBox>
      </Modal>
    </>
  );
};
