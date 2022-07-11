import React from "react";
import { Box, Button, LinearProgress, Modal, styled, Typography } from "@mui/material";

export const GDXModal = ({ children, open }: { children: JSX.Element; open: boolean }) => {
  const StyledModalBox = styled(Box)({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#FFF",
    width: "80%",
    overflowY: "auto",
    padding: "20px",
    height:"auto"
  });

  return (
    <>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ overflow: "overlay" }}
      >
        <StyledModalBox>{children}</StyledModalBox>
      </Modal>
    </>
  );
};
