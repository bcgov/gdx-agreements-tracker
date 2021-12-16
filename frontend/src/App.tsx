import "./styles/App.scss";
import React, { FC } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";

const App: FC = () => {
  return (
    <BrowserRouter>
      <div className="pmo-app">
        <AppRouter />
      </div>
    </BrowserRouter>
  );
};

export default App;
