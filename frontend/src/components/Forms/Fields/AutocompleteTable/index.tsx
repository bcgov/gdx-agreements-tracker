import { FC } from "react";
import {
  Autocomplete,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { IAutocompleteTable, IOption } from "types";

export const AutocompleteTable: FC<IAutocompleteTable> = ({
  fieldName,
  fieldValue,
  fieldLabel,
  onChange,
  pickerData,
  required,
  helperText,
  error,
  autocompleteTableColumns,
}: IAutocompleteTable) => {
  const tableCellStyles = {
    width: "100%",
    "&:hover": {
      backgroundColor: "#ddd!important", // Change this to your desired hover color
    },
  };

  return (
    <>
      {!pickerData ? (
        <Skeleton variant="rectangular" width={"auto"} height={38} />
      ) : (
        <Autocomplete
          id={fieldName}
          autoHighlight
          options={pickerData?.definition}
          onChange={(e, selection) => {
            onChange(selection?.value);
          }}
          value={fieldValue}
          getOptionLabel={(option) => {
            return Object.values(option)[0] as string;
          }}
          renderInput={(params) => {
            return (
              <TextField
                required={required}
                label={fieldLabel ? fieldLabel : pickerData?.title}
                name={fieldName}
                {...params}
                error={Boolean(error)}
                helperText={helperText}
              />
            );
          }}
          renderOption={(props: object, option: IOption) => (
            <Table>
              {0 === pickerData?.definition.indexOf(option) && (
                <TableHead sx={{ background: "#444" }}>
                  <TableRow sx={{ paddingLeft: 15, display: "flex" }}>
                    {autocompleteTableColumns.map(
                      (column, index) =>
                        column.field !== "value" && (
                          <TableCell
                            key={index}
                            sx={{ minWidth: 100, display: "flex", color: "#fff" }}
                          >
                            {column.headerName}
                          </TableCell>
                        )
                    )}
                  </TableRow>
                </TableHead>
              )}
              <TableBody>
                <TableRow {...props} sx={tableCellStyles} hover>
                  {Object.keys(option).map(
                    (key, index) =>
                      key !== "value" && (
                        <TableCell key={index} sx={{ minWidth: 100, display: "flex" }}>
                          {option[key]}
                        </TableCell>
                      )
                  )}
                </TableRow>
              </TableBody>
            </Table>
          )}
        />
      )}
    </>
  );
};
