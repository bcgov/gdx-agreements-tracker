import { GridRowsProp, GridColDef } from "@mui/x-data-grid";

// Data Structures
export interface IUser {
  created_at: string;
  email: string;
  id: number;
  name: string;
  updated_at: string;
  username: string;
  roles?: unknown;
}

// Hooks
export interface IUseDrawer {
  drawerOpen: boolean;
  handleDrawerToggle: (event: React.MouseEvent<HTMLElement>) => void;
}

// Components
export interface IPageHeader extends IUseDrawer {
  headerTitle: string;
}

export interface ISidebar extends IUseDrawer {}

export interface ITable {
  rows: GridRowsProp;
  columns: GridColDef[];
  loading: boolean;
  onRowClick?: Function;
}

// Tables
export interface IColumn {
  id: number;
  field: string;
  headerName: string;
  flex: number;
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
    customSettings?: Theme["customSettings"];
  }
}

// Project layout types
export interface IFormLayout {
  children: JSX.Element[] | JSX.Element;
}

//Picker Types
export interface IPickerLookupData {
  id: number;
  name: string;
  title: string;
  description: string;
  definition: { dropDownValues: { data: Array<Object> } };
}

//picker options types
export interface IPickerProps {
  handleChange: Function;
  fieldValue: { [key: string]: unknown };
  setFieldValue: Function;
  pickerData: {
    associated_table: string;
    definition: { value: string; label: string }[];
    description: string;
    id: number;
    name: string;
    title: string;
  };
}

export interface IPickerTableData {
  data: [
    {
      associated_table: string;
      definition: [
        {
          label: string;
          value: string;
        }
      ];
      description: string;
      id: number;
      name: string;
      title: string;
    }
  ];
}

export interface IProjectLayout {
  children: JSX.Element;
}

//Picker Types
export interface IPickerLookupData {
  id: number;
  name: string;
  title: string;
  description: string;
  definition: { dropDownValues: { data: Array<Object> } };
}

//ChipNav Types
export interface IChipNav {
  navLinks: Array<{ key: number; name: string; url: string }>;
}

//Project Form Props
export interface IProjectFormProps {
  // todo: Define a good type. "Any" type temporarily permitted.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query?: any;
  handleChange: Function;
  // todo: Define a good type. "Any" type temporarily permitted.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  values: any;
  // todo: Define a good type. "Any" type temporarily permitted.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFieldValue: any;
  dirty: boolean;
}

//Change Request row Props

export interface IChangeRequestRow {
  approval_date: string;
  cr_contact: string;
  fiscal_year: number;
  id: number;
  initiated_by: string;
  initiation_date: string;
  link_id: number;
  summary: string;
  version: string;
}
