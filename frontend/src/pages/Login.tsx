import React, { FC } from "react";
import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import { Box, LinearProgress } from "@mui/material";
export const Login: FC = () => {
  const [searchParams] = useSearchParams();
  const { keycloak } = useKeycloak();
  const navigate = useNavigate();

  useEffect(() => {
    // const destination = searchParams.get("redirect");
    // if (keycloak.authenticated) {
    //   if ("/login" === destination) {
    //     navigate("/");
    //   } else {
    //     navigate(destination || "/");
    //   }
    // }
    keycloak.login();
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgress />
    </Box>
  );
};

export default Login;
