import React from "react";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";

export const Home = () => {
  return (
    <>
      <Sidebar />
      <Main>
        <h1>Welcome home</h1>
      </Main>
    </>
  );
};
