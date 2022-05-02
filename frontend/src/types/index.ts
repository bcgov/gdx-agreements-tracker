import { GridRowsProp, GridColDef } from "@mui/x-data-grid";

// Data Structures
export interface IUser {
  created_at: string;
  email: string;
  id: number;
  name: string;
  updated_at: string;
  username: string;
  roles: any[];
}

// Hooks
export interface IUseDrawer {
  drawerOpen: boolean;
  handleDrawerToggle: (event: React.MouseEvent<HTMLElement>) => void
}

// Components
export interface IPageHeader extends IUseDrawer {
}

export interface ISidebar extends IUseDrawer {
}

export interface ITable {
  rows: GridRowsProp;
  columns: GridColDef[];
  loading: boolean;
}

// Tables
export interface IColumn {
  id: number;
  field: string;
  headerName: string;
  flex:number;
}

export interface ITableData {
  data: Array<Object>;
}


//Declartion that adds custom types to material ui predefined interfaces
declare module "@mui/material/styles" {
  interface Theme {
    customSettings: { 
      BCGovAccentLine: string; 
      topBarHeight: string;
      drawerWidth: number;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    customSettings?: Theme['customSettings'];
  }
}