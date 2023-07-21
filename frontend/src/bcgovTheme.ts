import { Theme, createTheme } from "@mui/material/styles";

//Have to ignore as this is MUI https://mui.com/material-ui/customization/theming/#system-CustomStyles.js

declare module "@mui/material/styles" {
  interface Theme {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    customSettings?: {
      BCGovAccentLine: string;
      drawerWidth: number;
    };
  }
  // allow configuration using `createTheme`

  interface ThemeOptions {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    customSettings?: {
      BCGovAccentLine: string;
      drawerWidth: number;
    };
  }
}

/**
 * Create a theme that uses BC Gov colours.
 *
 * @see https://mui.com/customization/theming/
 */

const primary = "#036";

const bcgovTheme: Theme = createTheme({
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
});

export default bcgovTheme;
