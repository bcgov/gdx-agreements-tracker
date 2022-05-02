import React from 'react';
import { List, Typography, ListItem, Box, ListItemButton } from "@mui/material";
import bcgovTheme from "../../../bcgovTheme";
import { adminLinks } from "./adminLinks";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";

const StyledSidebarImageFooter = styled("img")({
  padding: "8px 24px",
  marginTop: "auto",
  width: "100%",
});

export const SidebarMenu = (
  <Box
    p="12px"
    sx={{
      flexFlow: "column",
      display: "flex",
      height: "100%",
      width: "100%",
    }}
  >
    <Box>
      <Typography variant="h6" color="primary.contrastText">
        GDX Agreements Tracker
      </Typography>
    </Box>
    <hr style={{ width: "100%", borderTop: bcgovTheme.customSettings.BCGovAccentLine }} />
    <List>
      {adminLinks.map((link, index) => {
        return (
          <ListItem sx={{ p: "8px 0" }} component={Link} to={link.url} key={index}>
            <ListItemButton>
              <Typography color="primary.contrastText">{link.name}</Typography>
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
    <StyledSidebarImageFooter role="sidebar-logo" alt="bcgov_logo" src="../gov_bc_logo.svg" />
  </Box>
);
