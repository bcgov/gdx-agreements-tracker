import { Typography, AppBar } from "@mui/material";
import bcgovTheme from "../../../bcgovTheme";
import packageJson from "../../../../package.json";

export const PageFooter = ({ drawerWidth }: { drawerWidth: number }) => {
  const footerStyles = {
    borderTop: bcgovTheme.customSettings.BCGovAccentLine,
    marginTop: "auto",
    top: "auto",
    bottom: 0,
    backgroundColor: "#FFF",
    color: "primary.contrastText",
    height: "35px",
  };

  const typographyStyles = {
    textAlign: "right",
    margin: "auto",
    width: "99vw",
  };

  return (
    <AppBar position="fixed" sx={footerStyles}>
      <Typography noWrap variant="body1" color="inherit" sx={typographyStyles}>
        v{packageJson.version}
      </Typography>
    </AppBar>
  );
};
