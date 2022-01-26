import { useTheme } from "@mui/material";
import React, { FC } from "react";
import "./header.scss";
export const Header: FC = () => {
  const theme = useTheme();

  const headerStyle = {
    background: theme.palette.primary.main,
  };

  return <header id={"BcHeader"} style={headerStyle}></header>;
};

export default Header;
