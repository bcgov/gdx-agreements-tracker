import React, { FC } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TitleProvider } from "context/TitleContext";

// Create a client
const queryClient = new QueryClient();

const App: FC = () => {
  return (
    <TitleProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <div className="pmo-app">
            <AppRouter />
          </div>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </TitleProvider>
  );
};

export default App;
