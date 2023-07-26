import { CustomThemeOptions, Theme, createTheme } from "@mui/material/styles";

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
          background: "linear-gradient(45deg, #0a1d41,#0a1d41,#0a1d41,#000d27)",
        },
      },
    },
  },
  customSettings: {
    BCGovAccentLine: "2px solid #fcba19",
    drawerWidth: 240,
  },
} as CustomThemeOptions);

export default bcgovTheme;
