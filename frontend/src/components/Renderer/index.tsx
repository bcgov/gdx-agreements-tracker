import { LinearProgress } from "@mui/material";
import React from "react";

export const Renderer = ({ isLoading, component }: { isLoading: boolean; component: any }) => {
  switch (isLoading) {
    case true:
      return <LinearProgress />;
    case false:
      return component;
  }
};
