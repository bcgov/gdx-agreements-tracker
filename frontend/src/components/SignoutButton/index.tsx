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
import { useNavigate } from "react-router-dom";

/**
 * A component that combines sign out functionality and html in one place.
 *
 * @returns {React.ReactNode} a component
 */
export const SignoutButton = () => {
  const [selected, setSelected] = useState<string>("");
  const navigate = useNavigate();
  //Destructure the keycloak functionality
  const { keycloak } = useKeycloak();

  const handleChange = (event: SelectChangeEvent) => {
    setSelected(event.target.value);
    if ("Signout" === event.target.value) {
      navigate("/Signout");
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
      {keycloak.authenticated && (
        <Select
          sx={{ height: "40px" }}
          data-testid="signout-select"
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
        </Select>
      )}
    </StyledFormControl>
  );
};
