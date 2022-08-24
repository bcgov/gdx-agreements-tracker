import { Box, Button, Checkbox, FormControlLabel } from "@mui/material";
import React from "react";

// TODO: Use projectId for API call.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Notify = ({ projectId }: { projectId: string | undefined }) => {
  return (
    <Box>
      <FormControlLabel
        control={<Checkbox size="small" />}
        label="Check the box and click notify when ready to send a notification to the PMO staff"
      />
      <div>
        <Button variant="contained" size="small">
          Notify
        </Button>
      </div>
    </Box>
  );
};
