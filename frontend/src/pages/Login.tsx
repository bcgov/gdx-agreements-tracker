import { FC } from "react";
import { useEffect } from "react";
import { useKeycloak } from "@react-keycloak/web";
import { Box, LinearProgress } from "@mui/material";
export const Login: FC = () => {
  const { keycloak } = useKeycloak();

  useEffect(() => {
    keycloak.login();
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgress />
    </Box>
  );
};

export default Login;
