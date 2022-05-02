import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import bcgovTheme from "../../../bcgovTheme";
import { PageFooter } from "../PageFooter";
import { Sidebar } from "../../Sidebar";
import { useDrawer } from "../../../hooks/useDrawer";
import { PageHeader } from "../PageHeader";

const drawerWidth = bcgovTheme.customSettings.drawerWidth;

export const Main = ({ children }: any) => {
  const { drawerOpen, handleDrawerToggle } = useDrawer();
  return (
    <>
      {/* left hand side */}
      <Sidebar drawerOpen={drawerOpen} handleDrawerToggle={handleDrawerToggle} />
      {/* right hand side */}
      <Box
        sx={{
          flexFlow: "column",
          display: "flex",
          height: "100vh",
          width: "100%",
        }}
      >
        <PageHeader drawerOpen={drawerOpen} handleDrawerToggle={handleDrawerToggle} />

        <Box
          sx={{
            // flexGrow: 1,
            p: 0,
            // width: { sm: `calc(100% - ${drawerWidth}px)` }
            flex: 1,
            display: "flex",
            flexDirection: "column",
            boxSizing: "border-box",
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Box
            component='main'
            sx={{
              // overflowX: "scroll",
            }}
          >
            {children}
          </Box>
          <PageFooter />
        </Box>
      </Box>
    </>
  );
};
