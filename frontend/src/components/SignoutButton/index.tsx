import React, { useState } from "react";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { useKeycloak } from "@react-keycloak/web";
import { AccountCircle } from "@mui/icons-material";

/**
 * @Function SignoutButton is a component that combines sign out functionality and html in one place
 * @returns a component
 *
 *
 */
export const SignoutButton = () => {
  const [selected, setSelected] = useState<string>("");

  //Destructure the kecloak functionality
  const { keycloak } = useKeycloak();

  const handleChange = (event: SelectChangeEvent) => {
    setSelected(event.target.value);
    if (event.target.value === "Signout") {
      keycloak.logout();
    }
  };

  const StyledFormControl = styled(FormControl)({
    m: 1,
    minWidth: 120,
    marginLeft: "auto",
    background: "#fff",
    borderRadius: "10px",
  });

  return (
    <StyledFormControl>
      <Select
        displayEmpty
        value={selected}
        onChange={handleChange}
        renderValue={() => {
          return (
            <Stack direction="row" alignItems="center" gap={1}>
              <AccountCircle />
              <Typography variant="body1">{keycloak?.idTokenParsed?.name}</Typography>
            </Stack>
          );
        }}
        inputProps={{ "aria-label": "Without label" }}
      >
        <MenuItem value={"Signout"}>Signout</MenuItem>
        <MenuItem value={"Settings"}>Settings</MenuItem>
      </Select>
    </StyledFormControl>
  );
};
