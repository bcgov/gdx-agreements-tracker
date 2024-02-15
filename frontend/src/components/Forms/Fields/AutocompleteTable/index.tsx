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
import { ReadField } from "components/Forms/ReadForm/ReadField";

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
  multiple,
}: IAutocompleteTable) => {
  const tableCellStyles = {
    width: "100%",
    "&:hover": {
      backgroundColor: "#ddd!important", // Change this to your desired hover color
    },
    borderBottom: "1px solid #D3D3D3",
  };

  return (
    <>
      {pickerData?.definition.length <= 0 ? (
        <TextField disabled label={fieldLabel ? fieldLabel : pickerData?.title} name={fieldName} fullWidth required={required} error helperText={"There are no options available, you may need to enter data in a previous section for options to appear."}/>
      ) : (
        <Autocomplete
          // allows text box to contain an arbitrary value https://mui.com/material-ui/react-autocomplete/#free-solo
          multiple={multiple}
          freeSolo
          id={fieldName}
          autoHighlight
          options={pickerData?.definition}
          onChange={(e, selection) => {
            onChange(selection);
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
                <TableHead sx={{ background: "#444", display: "flex" }}>
                  <TableRow>
                    {autocompleteTableColumns.map((column, index) => (
                      <TableCell
                        key={index}
                        sx={{ paddingLeft: 3, width: 255, color: "#fff" }}
                        // sx={{ color: "#fff" }}
                      >
                        {column.headerName}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
              )}
              <TableBody>
                <TableRow {...props} sx={tableCellStyles} hover>
                  {Object.keys(option).map(
                    (key, index) =>
                      key !== "value" && (
                        <TableCell
                          key={index}
                          sx={{ maxWidth: 250, minWidth: 250, display: "flex", border: "none" }}
                          component="th"
                          scope="row"
                        >
                          {"boolean" === typeof option[key] ? (
                            <ReadField
                              width={""}
                              title={""}
                              value={option[key]}
                              type={"checkbox"}
                            />
                          ) : (
                            option[key]
                          )}
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
