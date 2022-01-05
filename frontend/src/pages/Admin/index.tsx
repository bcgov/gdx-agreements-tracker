import React, { FC, useState, useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import apiAxios from "../../utils/apiAxios";
import Sidebar from "../../components/Sidebar";
import Main from "../../components/Main";
import Debug from "../../components/Debug";

export const Admin: FC = () => {
  return (
    <>
      <Sidebar />
      <Main>
        <Outlet />
        <Debug />
      </Main>
    </>
  );
};

export const User: FC = () => {
  let { userId } = useParams();
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const axiosResponse = apiAxios();
    let uri = "users";
    if (userId) {
      uri = `${uri}/${userId}`;
    }
    axiosResponse
      .get(uri)
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  return (
    <div>
      <h2>User {userId}</h2>
      <div>
        <pre>{JSON.stringify(userData, null, 2)}</pre>
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
