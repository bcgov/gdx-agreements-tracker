import * as React from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import { IChipNav } from "../../../types";
import { Paper } from "@mui/material";
import { NavLink } from "react-router-dom";
import bcgovTheme from "../../../bcgovTheme";

export const ChipNav = ({ navLinks }: IChipNav) => {
  const StyledListItem = styled("li")(({ theme }) => ({
    margin: theme.spacing(0.5),
  }));

  const StyledNavLink = styled(NavLink)(() => ({
    textDecoration: "none",
  }));

  return (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        flexWrap: "wrap",
        listStyle: "none",
        p: 0.5,
        mb: 2,
        mt: 0,
      }}
      component="ul"
    >
      {navLinks.map((data) => {
        return (
          <StyledListItem key={data.key}>
            <StyledNavLink to={data.url} end>
              {({ isActive }) => (
                <Chip
                  sx={{
                    backgroundColor: isActive ? "#D3D3D3" : bcgovTheme.palette.primary.main,
                    color: isActive ? "#000" : "#FFF",
                  }}
                  label={data.name}
                />
              )}
            </StyledNavLink>
          </StyledListItem>
        );
      })}
    </Paper>
  );
};
