import {
  Checkbox,
  Chip,
  Divider,
  FilledInput,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { IReturnValue } from "types";
import { GridItem } from "../../FormLayout/GridItem";
import { useNavigate } from "react-router-dom";
import DescriptionIcon from "@mui/icons-material/Description";
/**
 * Represents a read-only field component.
 *
 * @param   {object}       props        - The properties object.
 * @param   {string}       props.width  - The width of the field.
 * @param   {string}       props.title  - The title of the field.
 * @param   {IReturnValue} props.value  - The value to display.
 * @param   {string}       [props.type] - The type of the field.
 * @returns {JSX.Element}               The rendered ReadField component.
 */

export const ReadField = ({
  width,
  title,
  value,
  type,
}: {
  width: string;
  title: string;
  value: IReturnValue;
  type?: string;
}) => {
  const navigate = useNavigate();
  const renderer = () => {
    switch (type) {
      case "multiSelect":
        return (
          <FormControl fullWidth>
            <InputLabel>{title}</InputLabel>
            <Select
              disabled
              multiple
              value={value}
              IconComponent={() => null} //To hide dropdown arrow
              input={
                <FilledInput
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      WebkitTextFillColor: "#333",
                      background: "#fff",
                    },
                    "& .MuiInputBase-root": {
                      WebkitTextFillColor: "#333",
                      background: "#fff!important",
                    },
                  }}
                />
              }
              renderValue={(selected) => (
                <Stack gap={1} direction="row" flexWrap="wrap">
                  {(value as string[]).map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Stack>
              )}
            ></Select>
          </FormControl>
        );
      case "checkbox":
        return (
          <div>
            <Typography variant="subtitle1" color="textSecondary">
              {title}:
            </Typography>
            <Checkbox disabled checked={value as boolean} />
          </div>
        );

      case "link":
        return (
          <List
            sx={{ width: "100%", maxWidth: "13rem", bgcolor: "#fbfbfb" }}
            subheader={
              <ListSubheader sx={{ bgcolor: "#2d2b2b", color: "#fff" }}>{title}</ListSubheader>
            }
          >
            {(value as unknown as { link: string; label: string }[]).map((value) => {
              return (
                <>
                  <Divider />
                  <ListItem component="div" disablePadding>
                    <ListItemButton onClick={() => navigate(value.link)}>
                      <ListItemText sx={{ color: "blue" }} primary={`${value.label}`} />
                      <ListItemIcon sx={{ color: "inherit" }}>
                        <DescriptionIcon />
                      </ListItemIcon>
                    </ListItemButton>
                  </ListItem>
                </>
              );
            })}
          </List>
        );

      default:
        return (
          <TextField
            disabled
            label={title}
            value={value}
            fullWidth
            sx={{
              "& .MuiInputLabel-root ": {
                WebkitTextFillColor: "#16008fc4",
              },
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: "#333",
                background: "#fff",
              },
              "& .MuiInputBase-root": {
                WebkitTextFillColor: "#333",
                background: "#fff!important",
              },
            }}
            id="filled-size-small"
            variant="filled"
            size="small"
            multiline
          />
        );
    }
  };

  return <GridItem width={width}>{renderer()}</GridItem>;
};
