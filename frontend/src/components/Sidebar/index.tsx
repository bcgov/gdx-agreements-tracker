import * as React from "react";
import { Drawer, Box, ThemeProvider } from "@mui/material";
import bcgovTheme from "../../bcgovTheme";
import { IUseDrawer } from "../../types";
/** The sidebar is the navigation menu located on the left side of the App */
import { SidebarMenu } from "./SidebarMenu";

const drawerWidth = bcgovTheme.customSettings.drawerWidth;

export const Sidebar = ({ drawerOpen, handleDrawerToggle }: IUseDrawer) => {
  return (
    <ThemeProvider theme={bcgovTheme}>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="side-bar"
        position="absolute"
        height="100vh"
        role="page-sidebar"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        {/* Mobile Drawer */}
        <Drawer
          role="mobile-sidebar-drawer"
          variant="temporary"
          open={drawerOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { width: drawerWidth },
          }}
        >
          <SidebarMenu />
        </Drawer>
        {/* Desktop Drawer */}
        <Drawer
          role="desktop-sidebar-drawer"
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": { width: drawerWidth },
          }}
        >
          <SidebarMenu />
        </Drawer>
      </Box>
    </ThemeProvider>
  );
};
