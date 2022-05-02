import * as React from "react";
import "./sideBar.scss";
import {
  Drawer,
  List,
  Typography,
  ListItem,
  Box,
  ThemeProvider,
  ListItemButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import bcgovTheme from "../../bcgovTheme";
import { IUseDrawer } from "../../types";
import { styled } from "@mui/system";
import { Routes } from "react-router-dom";
/** The sidebar is the navigation menu located on the left side of the App */

const adminLinks = [
  {
    name: "Contacts",
    url: "/admin/contacts",
  },
  {
    name: "Suppliers",
    url: "/admin/suppliers",
  },
  {
    name: "Subcontractors",
    url: "/admin/subcontractors",
  },
  {
    name: "Resources",
    url: "/admin/resources",
  },
  {
    name: "Ministries / Org Name",
    url: "/admin/ministries",
  },
  {
    name: "User Management",
    url: "/admin/users",
  },
  {
    name: "Glossary",
    url: "/admin/glossary",
  },
];

const drawerWidth = bcgovTheme.customSettings.drawerWidth;

const StyledSidebarImageFooter = styled(Box)({
  padding: "8px 24px",
  marginTop: "auto",
});

const drawer = (
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
    <Box
      component="img"
      sx={{        
        width: "100%",
      }}
      alt="bcgov_logo"
      src="../gov_bc_logo.svg"
    />
  </Box>
);

export const Sidebar = ({ drawerOpen, handleDrawerToggle }: IUseDrawer) => {
  return (
    <ThemeProvider theme={bcgovTheme}>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="side-bar"
        position="absolute"
        height="100vh"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={drawerOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        {/* Mobile Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </ThemeProvider>
  );
};
