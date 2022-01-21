import React, { FC } from "react";
import Header from "../Header";
import Footer from "../Footer";
export const Main: FC = ({ children }: any) => {
  return (
    <body>
      <Header />
      <main>{children}</main>
      <Footer />
    </body>
  );
};

export default Main;
