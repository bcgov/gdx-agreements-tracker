import { Button } from "@mui/material";
import { Box } from "@mui/system";

interface IFormButtons {
  handleOnCancel: Function;
  dirty: boolean;
}

export const FormButtons = ({ dirty, handleOnCancel }: IFormButtons) => {
  return (
    <Box mt={1} display="flex" justifyContent="flex-end" alignItems="flex-end">
      <Box>
        <Button
          onClick={() => {
            handleOnCancel();
          }}
          type="button"
          variant="contained"
          color="secondary"
        >
          Cancel
        </Button>
      </Box>
      <Box ml={1}>
        <Button type="submit" variant="contained" color="success" disabled={dirty ? false : true}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};
