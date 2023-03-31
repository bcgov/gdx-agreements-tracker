import { Box, Button } from "@mui/material";
import React from "react";

interface IFormEditButton {
  buttonText: string;
  onClick: Function;
}

export const FormEditButton = ({ buttonText, onClick }: IFormEditButton) => {
  return (
    <Box m={1} display="flex" justifyContent="flex-end" alignItems="flex-end">
      <Button
        variant="contained"
        onClick={() => {
          onClick();
        }}
      >
        {buttonText}
      </Button>
    </Box>
  );
};
