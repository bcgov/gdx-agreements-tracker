import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material";
import bcgovTheme from "../../bcgovTheme";

export const GDXAccordion = ({
  children,
  sectionTitle,
}: {
  children: JSX.Element | JSX.Element[];
  sectionTitle: string;
}) => {
  const StyledAccordionSummary = styled(AccordionSummary)({
    backgroundColor: "#ECECEC",
  });

  const StyledTypography = styled(Typography)({
    color: bcgovTheme.palette.primary.main,
    fontWeight: "bold",
  });

  return (
    <Accordion defaultExpanded>
      <StyledAccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel-content"
        aria-label="button"
      >
        <StyledTypography>{sectionTitle}</StyledTypography>
      </StyledAccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};
