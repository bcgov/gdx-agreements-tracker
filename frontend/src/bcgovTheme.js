import { createTheme } from "@mui/material/styles";

/**
 * Create a theme that uses BC Gov colours.
 *
 * @see https://mui.com/customization/theming/
 */
const bcgovTheme = createTheme({
  palette: {
    primary: {
      main: "#036",
    },
    secondary: {
      main: "#38598a",
    },
  },
});

export default bcgovTheme;
