import React, { FC, useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import apiAxios from "../../utils/apiAxios";
import { useKeycloak } from "@react-keycloak/web";
import Sidebar from "../../components/Sidebar";
import Main from "../../components/Main";

export const Admin: FC = () => {
  const { initialized, keycloak } = useKeycloak();

  /**
   * Check keycloak init and auth on component load.
   *
   * @todo Need a better way to get access to the keycloak token.
   */
  useEffect(() => {
    if (initialized && keycloak.authenticated) {
      const axiosResponse = apiAxios(keycloak.token);
      axiosResponse
        .get("user")
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });

  return (
    <>
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
    </>
  );
};

export const User: FC = () => {
  let { userId } = useParams();
  return <h2>User {userId}</h2>;
};

export const Contacts: FC = () => {
  let { id } = useParams();
  return <h2>Contacts {id}</h2>;
};

export const Suppliers: FC = () => {
  let { id } = useParams();
  return <h2>Suppliers {id}</h2>;
};

export const SubContractors: FC = () => {
  let { id } = useParams();
  return <h2>Subcontractors {id}</h2>;
};

export const Resources: FC = () => {
  let { id } = useParams();
  return <h2>Resources {id}</h2>;
};

export const Ministries: FC = () => {
  let { id } = useParams();
  return <h2>Ministries {id}</h2>;
};
