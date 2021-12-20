import React, { FC, useState, useEffect } from "react";
import { Outlet, useParams, useOutletContext } from "react-router-dom";
import apiAxios from "../../utils/apiAxios";
import { useKeycloak } from "@react-keycloak/web";
import Sidebar from "../../components/Sidebar";
import Main from "../../components/Main";
import Debug from "../../components/Debug";
import type { KeycloakInstance } from "keycloak-js";

interface OutletContext {
  initialized: boolean;
  keycloak: KeycloakInstance;
}

export const Admin: FC = () => {
  const { initialized, keycloak } = useKeycloak();
  return (
    <>
      <Sidebar />
      <Main>
        <Outlet context={{ initialized, keycloak }} />
        <Debug keycloak={keycloak} />
      </Main>
    </>
  );
};

export const User: FC = () => {
  const { initialized, keycloak } = useOutletContext<OutletContext>();
  const [apiData, setApiData] = useState({});
  let { userId } = useParams();
  useEffect(() => {
    if (initialized && keycloak.authenticated) {
      const axiosResponse = apiAxios(keycloak.token);
      let uri = "user";
      if (userId) {
        uri = `${uri}/${userId}`;
      }
      axiosResponse
        .get(uri)
        .then((data) => {
          setApiData(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [initialized, keycloak, userId]);

  return (
    <div>
      <h2>User {userId}</h2>
      <div>
        <pre>{JSON.stringify(apiData, null, 2)}</pre>
      </div>
    </div>
  );
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
