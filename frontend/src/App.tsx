import "./styles/App.scss";
import React, { FC, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import apiAxios from "./apiAxios";
import AppRouter from "./router/AppRouter";

const App: FC = () => {
  useEffect(() => {
    let axioResponse = apiAxios();
    axioResponse
      .get("users")
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <BrowserRouter>
      <div className="pmo-app">
        <AppRouter />
      </div>
    </BrowserRouter>
  );
};

export default App;
