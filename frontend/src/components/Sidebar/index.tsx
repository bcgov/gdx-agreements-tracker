// import React, { FC } from "react";
// import ButtonNav from "../ButtonNav";

// interface Props {
//   state?: Object;
// }

// export const Sidebar: FC<Props> = ({ state }) => {
//   return (
//     <aside>
//       <section data-testId={"sideBarSection"} className="nav-section">
//         <h2>GDX Agreements Tracker</h2>
//         <nav>
//           <ButtonNav to={`/project`}>Project List</ButtonNav>
//           <ButtonNav to={`/project/34`}>Project Item Sample</ButtonNav>
//           <ButtonNav to={`/contract`}>Contract List</ButtonNav>
//           <ButtonNav to={`/contract/34`}>Contract Item Sample</ButtonNav>
//           <ButtonNav to={`/reports`}>Reports</ButtonNav>
//           <ButtonNav to={`/admin`}>Administration Forms</ButtonNav>
//         </nav>
//       </section>
//       <img src="/gov_bc_logo.svg" alt="BC government logo" />
//     </aside>
//   );
// };

// export default Sidebar;
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

const drawerWidth = 400;
export const Sidebar = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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
