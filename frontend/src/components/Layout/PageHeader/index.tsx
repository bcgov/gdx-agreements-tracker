import React, { useContext } from "react";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { IPageHeader } from "../../../types";
import MenuIcon from "@mui/icons-material/Menu";
import { SignoutButton } from "../../SignoutButton";
import { TitleContext } from "context/TitleContext";

const drawerWidth = 240;

const appBarStyles = {
  backgroundColor: "#fff",
  width: { sm: `calc(100% - ${drawerWidth}px)` },
  ml: { sm: `${drawerWidth}px` },
};

const titleStyles = {
  color: "#000",
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const PageHeader = ({ handleDrawerToggle }: IPageHeader) => {
  const { title } = useContext(TitleContext);
  return (
    <div>
      <AppBar sx={appBarStyles} role="page-header">
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
          <Typography variant="h6" noWrap component="div" sx={titleStyles}>
            {title}
          </Typography>
          <SignoutButton />
        </Toolbar>
      </AppBar>
    </div>
  );
};
