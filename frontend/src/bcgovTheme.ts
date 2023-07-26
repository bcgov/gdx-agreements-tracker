import { Theme, createTheme } from "@mui/material/styles";
import "@bcgov/bc-sans/css/BCSans.css";
/**
 * Create a theme that uses BC Gov colours.
 *
 * @see https://mui.com/customization/theming/
 */


declare module '@mui/material/styles' {
  interface Theme {
    customSettings: {
      BCGovAccentLine: string;
      drawerWidth:number
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    customSettings?: {
      BCGovAccentLine?: string;
      drawerWidth:number
    };
  }
}

const primary = "#036";

const bcgovTheme: Theme = createTheme({
  typography: {
    fontFamily: 'BCSans',
  },
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

