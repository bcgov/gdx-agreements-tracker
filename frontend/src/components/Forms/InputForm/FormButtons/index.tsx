import { Button } from "@mui/material";
import { Box } from "@mui/system";

// Constants
const cancelButtonColor = "secondary";
const submitButtonColor = "success";
const buttonVariant = "contained";

// Types
interface IFormButtons {
  handleOnCancel: Function;
  dirty: boolean;
}

/**
 * Renders a form with two buttons: Cancel and Submit.
 *
 * @param   {object}      props                - The props object.
 * @param   {Function}    props.handleOnCancel - The function to be called when the Cancel button is clicked.
 * @param   {boolean}     props.dirty          - A boolean value indicating whether the form has been modified.
 * @returns {JSX.Element}                      - A JSX element representing the form with two buttons.
 */
export const FormButtons = ({ dirty, handleOnCancel }: IFormButtons): JSX.Element => {
  const handleCancelClick = () => handleOnCancel;

  return (
    <Box mt={1} display="flex" justifyContent="flex-end" alignItems="flex-end">
      <Box>
        <Button
          onClick={handleCancelClick}
          type="button"
          variant={buttonVariant}
          color={cancelButtonColor}
        >
          Cancel
        </Button>
      </Box>
      <Box ml={1}>
        <Button type="submit" variant={buttonVariant} color={submitButtonColor} disabled={!dirty}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};
