import React, { FC } from "react";
import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
export const Login: FC = () => {
  const [searchParams] = useSearchParams();
  const { keycloak } = useKeycloak();
  const navigate = useNavigate();
  
  useEffect(() => {
    const destination = searchParams.get("redirect");
    if (keycloak.authenticated) {
      if ("/login" === destination) {
        navigate("/");
      } else {
        navigate(destination || "/");
      }
    }
  });

  return (
    <div className="login-page">
      <p>Login now</p>
      <button onClick={() => keycloak.login()}>Login here</button>
    </div>
  );
};

export default Login;
