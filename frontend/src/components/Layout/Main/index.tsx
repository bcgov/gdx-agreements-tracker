import * as React from "react";
import Box from "@mui/material/Box";
import bcgovTheme from "../../../bcgovTheme";
import { PageFooter } from "../PageFooter";
import { Sidebar } from "../../Sidebar";
import { useDrawer } from "../../../hooks/useDrawer";
import { PageHeader } from "../PageHeader";
import { Outlet } from "react-router-dom";

const drawerWidth = bcgovTheme?.customSettings?.drawerWidth;
/**
 * Main component that renders the main content of the application.
 * It uses the React Router to switch between different pages based on the URL.
 * It also handles the authentication and authorization logic using Keycloak.
 *
 * @returns {JSX.Element} The JSX element representing the main content.
 */
export const Main = () => {
  const { drawerOpen, handleDrawerToggle } = useDrawer();
  return (
    <Box sx={{ display: "flex" }}>
      <PageHeader
        drawerOpen={drawerOpen}
        handleDrawerToggle={handleDrawerToggle}
        headerTitle={""}
      />

      {/* Side Menu */}
      <Sidebar drawerOpen={drawerOpen} handleDrawerToggle={handleDrawerToggle} />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          mt: "6vh",
        }}
      >
        <Outlet />
      </Box>

      {/* Footer */}
      <PageFooter />
    </Box>
  );
};
