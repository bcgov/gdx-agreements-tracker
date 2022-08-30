import * as React from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import { IChipNav } from "../../../types";
import { Box, Paper } from "@mui/material";
import { NavLink } from "react-router-dom";
import bcgovTheme from "../../../bcgovTheme";

export const ChipNav = ({
  navLinks,
  navLinksRight = [],
}: {
  navLinks: IChipNav[];
  navLinksRight?: IChipNav[];
}) => {
  const StyledListItem = styled("li")(({ theme }) => ({
    margin: theme.spacing(0.5),
  }));

  const StyledNavLink = styled(NavLink)(() => ({
    textDecoration: "none",
  }));

  /**
   * Renders a single ChipNav link.
   *
   * @param   {IChipNav}    link The ChipNav link to render.
   * @returns {JSX.Element}
   */
  const renderNavLink = (link: IChipNav): JSX.Element => {
    return (
      <StyledListItem key={link.key}>
        <StyledNavLink to={link.url} end>
          {({ isActive }) => (
            <Chip
              sx={{
                backgroundColor: isActive ? "#D3D3D3" : bcgovTheme.palette.primary.main,
                color: isActive ? "#000" : "#FFF",
              }}
              label={link.name}
            />
          )}
        </StyledNavLink>
      </StyledListItem>
    );
  };

  return (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        p: 0.5,
        mb: 2,
        mt: 0,
      }}
    >
      <Box sx={{ display: "flex", listStyle: "none" }}>{navLinks.map(renderNavLink)}</Box>
      {navLinksRight.length > 0 && (
        <Box sx={{ display: "flex", listStyle: "none" }}>{navLinksRight.map(renderNavLink)}</Box>
      )}
    </Paper>
  );
};
