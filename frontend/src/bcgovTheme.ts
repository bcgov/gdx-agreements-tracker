import { createTheme } from "@mui/material/styles";

/**
 * Create a theme that uses BC Gov colours.
 *
 * @see https://mui.com/customization/theming/
 */

const primary = "#036";

const bcgovTheme = createTheme({
  palette: {
    primary: {
      main: primary,
      contrastText: "#fff",
    },
    secondary: {
      main: "#fff",
      contrastText: primary,
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: "#38598a",
        },
      },
    },
  },
  customSettings: {
    BCGovAccentLine: "2px solid #fcba19",
    topBarHeight: "50px",
    drawerWidth: 240,
  },
});

export default bcgovTheme;
