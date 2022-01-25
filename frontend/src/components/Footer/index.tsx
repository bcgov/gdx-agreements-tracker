import { useTheme } from "@mui/material";
import React, { FC } from "react";
import "./footer.scss";
export const Footer: FC = () => {
  const theme = useTheme();

  return <footer id={"BcFooter"}></footer>;
};

export default Footer;
