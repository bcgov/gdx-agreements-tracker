import { Box, Button, Checkbox, FormControlLabel } from "@mui/material";
import React, { useState } from "react";
import { apiAxios } from "utils";

export const Notify = ({ projectId }: { projectId: string | undefined }) => {
  const [checked, setChecked] = useState(false);

  /**
   * Sends notify request to API.
   *
   * @returns {void}
   */
  const notify = () => {
    if (!checked) {
      return;
    }
    apiAxios()
      .post(`projects/${projectId}/close-out/notify`)
      .then((ret) => {
        // eslint-disable-next-line no-console
        console.log(ret);
      })
      .catch((reason) => {
        console.error(reason);
      });
  };

  return (
    <Box>
      <FormControlLabel
        control={<Checkbox size="small" onChange={(e, c) => setChecked(c)} />}
        label="Check the box and click notify when ready to send a notification to the PMO staff"
      />
      <div>
        <Button variant="contained" size="small" onClick={notify} disabled={!checked}>
          Notify
        </Button>
      </div>
    </Box>
  );
};
