import React from "react";
import { AppBar, Toolbar } from "@mui/material";

import "./header.scss";
import { Sidebar } from "../../";

export const Header = () => {
  return (
    <AppBar id="bc-header">
      <Toolbar>
        <Sidebar />
      </Toolbar>
    </AppBar>
  );
};
