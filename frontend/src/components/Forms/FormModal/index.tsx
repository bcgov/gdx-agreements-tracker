import { Box, Modal, styled } from "@mui/material";

const FormModal = ({
  children,
  open,
}: {
  children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
  open: boolean;
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
      >
        <StyledModalBox>
          {/* <ModalHeader onClose={handleClose} {...props} /> */}
          <StyledContentBox>{children}</StyledContentBox>
        </StyledModalBox>
      </Modal>
    </>
  );
};

export default FormModal;
