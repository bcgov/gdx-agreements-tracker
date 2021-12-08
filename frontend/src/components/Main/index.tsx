import React, { FC } from "react";
import "./index.scss";
import Header from "../Header";

const Main: FC = ({ children }) => {
  return (
    <section className="main-section">
      <Header />
      <main>{children}</main>
      <footer></footer>
    </section>
  );
};

export default Main;
