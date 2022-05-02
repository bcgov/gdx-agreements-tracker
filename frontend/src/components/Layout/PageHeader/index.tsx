import React from "react";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Sidebar } from "../..";
import { ThemeProvider } from "@mui/material/styles";
import bcgovTheme from "../../../bcgovTheme";
import { createTheme } from "@mui/material/styles";
import { useDrawer } from "../../../hooks/useDrawer";
import { IPageHeader } from "../../../types";
import MenuIcon from "@mui/icons-material/Menu";

const drawerWidth = 240;

const StyledAppBar = styled(AppBar)({
  borderBottom: bcgovTheme.customSettings.BCGovAccentLine,
});

export const PageHeader = ({ drawerOpen, handleDrawerToggle }: IPageHeader) => {
  return (
      <StyledAppBar
        position="sticky"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
        role="page-header"
      >
        <Toolbar role="page-header-toolbar">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
            role="sidebar-toggle-button"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Title Bar
          </Typography>
        </Toolbar>
      </StyledAppBar>
  );
};
