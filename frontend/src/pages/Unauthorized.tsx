import { Grid, Typography, Button, styled } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { useKeycloak } from "@react-keycloak/web";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const { keycloak, initialized } = useKeycloak();
  const StyledLine = styled("div")(() => ({
    margin: "0 50px",
    height: "4rem",
    borderLeft: "1px solid #999",
  }));
  ``;
  const navigate = useNavigate();
  useEffect(() => {
    if (initialized && keycloak.authenticated) {
      keycloak.login();
      return;
    }
    navigate("/");
  }, [initialized, keycloak]);

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: "80vh" }}
    >
      <Grid item>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <Typography variant="h5">401</Typography>
          </Grid>
          <Grid item>
            <StyledLine />
          </Grid>
          <Grid item>
            <Typography variant="h5">You are unauthorized to view this page</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          endIcon={<LoginIcon />}
          onClick={() => {
            keycloak.login();
          }}
        >
          Login
        </Button>
      </Grid>
    </Grid>
  );
};

export default Unauthorized;
