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
      contrastText: "#fff",
    },
    secondary: {
      main: "#38598a",
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
