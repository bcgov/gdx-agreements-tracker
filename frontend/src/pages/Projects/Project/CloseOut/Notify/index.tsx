import { Box, Button, Checkbox, FormControlLabel } from "@mui/material";
import { useState } from "react";
import { apiAxios } from "utils";
import { styled } from "@mui/material/styles";

const NotifyButton = styled(Button)({
  borderRadius: "12px",
});

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
        <NotifyButton variant="contained" size="small" onClick={notify} disabled={!checked}>
          Notify
        </NotifyButton>
      </div>
    </Box>
  );
};
