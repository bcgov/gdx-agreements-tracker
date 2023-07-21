import { Typography, AppBar } from "@mui/material";
import packageJson from "../../../../package.json";

export const PageFooter = () => {
  const footerStyles = {
    marginTop: "auto",
    top: "auto",
    bottom: 0,
    backgroundColor: "#fff",
    color: "#000",
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
