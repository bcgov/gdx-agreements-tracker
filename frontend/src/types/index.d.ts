import { GridRowsProp, GridColDef, GridInitialState } from "@mui/x-data-grid";

// Data Structures
export interface IUser {
  created_at: string;
  email: string;
  id: number;
  name: string;
  updated_at: string;
  username: string;
  capabilities: string[];
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

export type ISidebar = IUseDrawer;

export interface ITable {
  rows: GridRowsProp;
  columns: GridColDef[];
  initialState?: GridInitialState;
  totalColumns?: string[];
  loading: boolean;
  onRowClick?: Function;
  allowEdit?: boolean;
}

// Tables
export interface IColumn {
  id: number;
  field: string;
  headerName: string;
  flex: number;
}

export interface ITableData {
  data: {
    data: Array<Object>;
    user: Array<Object>;
  };
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
  fieldValue: IOption;
  fieldName?: string;
  fieldLabel?: string;
  onChange: Function;
  pickerData: {
    associated_table: string;
    definition: IOption[];
    description: string;
    id: number;
    name: string;
    title: string;
  };
  required?: boolean;
  multiple?: boolean;
}

// Picker options for multiselect inputs.
export interface IMultiPickerProps extends Omit<IPickerProps, "fieldValue"> {
  fieldValue: IOption[];
  multiple: boolean;
}

//checkbox types
export interface ICheckboxProps {
  onChange: Function;
  checked: boolean;
  fieldName: string;
  setFieldValue: Function;
}

export interface IPickerTableData {
  data: {
    data: [
      {
        associated_table: string;
        definition: [IOption];
        description: string;
        id: number;
        name: string;
        title: string;
      }
    ];
  };
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
  key: number;
  name: string;
  url: string;
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

export interface IFormControls {
  handleEditMode: Function;
  handleOpen: Function;
  handleClose: Function;
  handleCurrentRowData: Function;
  open: boolean;
  editMode: boolean;
  currentRowData: { id };
  handleFormType: Function;
}

export interface IUseFormSubmitHandleSubmit {
  // todo: Define a good type. "Any" type temporarily permitted.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  changedValues: any;
  // todo: Define a good type. "Any" type temporarily permitted.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  currentRowData: any;
  apiUrl: string;
  handleEditMode?: Function;
  queryKeys?: string[];
  successMessage?: string;
  errorMessage?: string;
}

export interface IUseFormSubmitHandlePost {
  // todo: Define a good type. "Any" type temporarily permitted.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formValues: any;
  apiUrl: string;
  handleEditMode?: Function;
  queryKeys?: string[];
  successMessage?: string;
  errorMessage?: string;
  handleClose?: Function;
}
export type IEditFieldsFieldType =
  | "select"
  | "multiselect"
  | "date"
  | "singleText"
  | "multiText"
  | "checkbox"
  | "number"
  | "readonly";

export type IWidth = "half" | "full";

export type IReturnValue = string | number | boolean | string[] | IOption | null | undefined;

export interface IEditField {
  fieldName: string;
  fieldType: IEditFieldsFieldType;
  fieldLabel: string;
  width: IWidth;
  tableName?: string;
  projectId?: number | undefined;
  contractId?: number | undefined;
  pickerName?: string;
  required?: boolean;
}

export interface IReadField {
  width: IWidth;
  title: string;
  value: IReturnValue;
}

export interface IInitialValues {
  [key: string]: IReturnValue;
}

/**
 * Used for FormInput component.
 */
export interface IFormInput {
  setFieldValue?: Function;
  fieldValue: string | number | boolean | IOption | IOption[] | date;
  fieldName: string;
  fieldType: IEditFieldsFieldType;
  fieldLabel: string;
  handleChange?: Function;
  width: "half" | "full";
  tableName?: string;
  pickerName?: string;
  projectId?: number | undefined;
  contractId?: number | undefined;
  required?: boolean;
}

export interface IRadioGroup {
  name: string;
  formLabel: string;
  defaultValue: string;
  options: {
    parent: string | null;
    value: string;
    label: string;
  }[];
}

export interface IRadioButton {
  parent: string | null;
  value: string;
  label: string;
}
[];

export interface ICheckbox {
  id: string;
  label: string;
  input: string;
  defaultValue: string;
  parents: string[];
  options: IOption[];
}

export interface IDate {
  parents: string[];
  id: string;
  label: string;
  input: string;
  defaultValue: string;
  options: IOption[];
}

export interface IOption {
  value: number | string;
  label?: string;
}

export interface ISelect {
  id: string;
  label: string;
  input: string;
  defaultValue: string;
  parents: string[];
  options: IOption[];
}

export interface IDescription {
  name: string;
  formLabel: string;
  options: { id: number; value: string; parent: string }[];
}

export interface ICapability {
  getAll: string;
  getOne: string;
  updateOne: string;
  addOne: string;
  deleteOne?: string;
}

export interface ICurrentUser {
  id: number;
  name: string;
  email: string;
  role_id: {
    value: number;
    label: string;
  };
}

export interface IWhat {
  single: string;
  plural: string;
}
export interface IList {
  data: Array<{ [key: string]: number | string }>;
  title: string;
}

export interface IStandardRow {
  [key: string]: string | number;
}

export interface IBudget {
  fiscal_year: string;
  invoiced_expenses: number;
  invoiced_fees: number;
  invoiced_hours: number;
  remaining_expenses: number;
  remaining_fees: number;
  remaining_hours: number;
  total_expenses: number;
  total_fees: number;
  total_hours: number;
}

export interface IReportParamOptions {
  reportCategory: string;
  value: string;
  label: string;
  reportParamCategory: {
    field: IEditField;
    type: number;
    isRequired: boolean;
    hasXls: boolean;
  }[];
}

export interface IReportParams {
  name: string;
  formLabel: string;
}

export interface IModal {
  children: JSX.Element;
  open: boolean;
  handleClose: () => void;
  modalTitle: string;
  handleEditMode: Function;
  editMode: boolean;
  handleDelete: Function;
  handleFormType: Function;
}

export interface IFormRenderer {
  // todo: Define a good type. "Any" type temporarily permitted.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formControls?: any;
  tableName: string;
  formConfig;
  formDataApiEndpoint: string;
}
export interface IDBRowlock {
  data: { data: { table: string } };
}

export interface ILockData {
  data: { locked: boolean; lockedBy: string };
}
export interface IContactRole {
  role_id: number;
  role_type: string;
  contacts: Array<IOption>;
}

export type TFormConfig = (query: UseQueryResult<AxiosResponse, unknown>) => {
  readFields: {
    width: string;
    title: string;
    value: string | number | boolean;
  }[];
  editFields: IEditField[];
  initialValues: {};
  rowsToLock: number[];
  postUrl: string;
  updateUrl: string;
};

export interface ITableWithModalData {
  data: {
    data: {
      data: {
        [key: string]: unknown;
      };
    };
  };
  isLoading: boolean;
}
export interface ITableWithModal {
  tableDataApiEndPoint: string;
  tableConfig: unknown;
  formControls: IFormControls;
  formConfig: TFormConfig;
  tableName: string;
  formDataApiEndpoint: string;
}

export interface IRowDoubleClickParams {
  row: { [key: string]: string | number | boolean };
}

export interface Irgb {
  rgb: { red: number; green: number; blue: number; health_name: string };
}

export type ConvertToStringItem =
  | {
      value: string | null;
    }
  | string;

export type UpdatedSearchParams = {
  templateType: string;
  [key: string]: string;
};

export type IReportCategoriesAndTypes = {
  value: string;
  label: string;
  types: {
    value: string;
    label: string;
    description: string;
    parameters: string[];
    exportPDF: boolean;
    exportXLSX: boolean;
  }[];
}[];
