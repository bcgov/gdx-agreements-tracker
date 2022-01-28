import * as React from "react";

import "./sideBar.scss";
import {
  Toolbar,
  Drawer,
  List,
  Typography,
  ListItem,
  Divider,
  CssBaseline,
  AppBar,
  IconButton,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { Link } from "react-router-dom";
/**
 * @todo Need to make drawerWidth more dynamic 
 */
//Used for calculcation for body width
const drawerWidth = 400;

/** The sidebar is the navigation menu located on the left side of the App */
export const Sidebar = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
/**used to toggle mobile and desktop views for the menu */
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
/**
 * @todo Need to make adminLinks more dynamic (maybe a database?)
 * 
 */
  const adminLinks = [
    {
      name: "Contracts",
      link: "admin/contracts",
    },
    {
      name: "Suppliers",
      link: "admin/suppliers",
    },
    {
      name: "Subcontractors",
      link: "admin/subcontractors",
    },
    {
      name: "Resources",
      link: "admin/resources",
    },
    {
      name: "Ministries / Org Name",
      link: "admin/ministries",
    },
    {
      name: "User Management",
      link: "admin/userManagement",
    },
    {
      name: "Glossary",
      link: "admin/glossary",
    },
  ];
/**
 * @todo Need to add an accordian to the menu to allow for expandable menus
 * 
 */

  /**const drawer = The actual links in the sidebar navigation */

  const drawer = (
    <div>
      <Typography variant="h4" noWrap component="div">
        GDX Agreements Tracker
      </Typography>
      <Divider />
      <Typography variant="h6" noWrap component="div">
        Administration Forms
      </Typography>
      <List>
        {adminLinks.map(({ name, link }, index) => (
          <ListItem button key={name}>
            <Link to={link}>{name}</Link>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
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
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
          open
        >
          {drawer}
          <img src="/gov_bc_logo.svg" alt="BC government logo" />
        </Drawer>
      </Box>
    </>
  );
};
