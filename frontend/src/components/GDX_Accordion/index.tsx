import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material";
import bcgovTheme from "../../bcgovTheme";

export const GDX_Accordion = ({
  children,
  sectionTitle,
}: {
  children: JSX.Element | JSX.Element[];
  sectionTitle: string;
}) => {
  const StyledAccordionSummary = styled(AccordionSummary)({
    backgroundColor: "#ECECEC",
  });

  const StyledSectionHeader = styled(Typography)({
    color: bcgovTheme.palette.primary.main,
    fontWeight: "bold",
  });

  const StyledAccordion = styled(Accordion)({
    margin: "16px 0",
  });

  return (
    <StyledAccordion defaultExpanded>
      <StyledAccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <StyledSectionHeader>{sectionTitle}</StyledSectionHeader>
      </StyledAccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </StyledAccordion>
  );
};
