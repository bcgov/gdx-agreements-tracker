import React from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const TableObjectViewer = ({ ObjectToView }: { ObjectToView: unknown }) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Data</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ minWidth: "20rem" }}>
        <pre>{JSON.stringify(ObjectToView, null, 2)}</pre>
      </AccordionDetails>
    </Accordion>
  );
};
