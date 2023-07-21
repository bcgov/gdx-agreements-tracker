import { Checkbox, TextField, Typography } from "@mui/material";
import { IReturnValue } from "types";
import { GridItem } from "../../FormLayout/GridItem";

export const ReadField = ({
  width,
  title,
  value,
}: {
  width: string;
  title: string;
  value: IReturnValue;
}) => {
  const renderer = () => {
    switch (typeof value) {
      case "boolean":
        return (
          <div>
            <Typography variant="subtitle1" color="textSecondary">
              {title}:
            </Typography>
            <Checkbox disabled checked={value} />
          </div>
        );
      default:
        return (
          <div>
            <TextField
              disabled
              label={title}
              defaultValue={value}
              fullWidth
              sx={{
                "& .MuiInputLabel-root ": {
                  WebkitTextFillColor: "#16008fc4",
                },
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: "#333",
                  background: "#fff",
                },
              }}
              id="filled-size-small"
              variant="filled"
              size="small"
            />
          </div>
        );
    }
  };

  return <GridItem width={width}>{renderer()}</GridItem>;
};
