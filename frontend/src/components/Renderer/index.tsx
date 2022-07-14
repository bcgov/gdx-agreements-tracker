import { LinearProgress } from "@mui/material";
import React from "react";
// todo: Define a good type. "Any" type temporarily permitted.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Renderer = ({ isLoading, component }: { isLoading: boolean; component: any }) => {
  switch (isLoading) {
    case true:
      return <LinearProgress />;
    case false:
      return component;
  }
};
