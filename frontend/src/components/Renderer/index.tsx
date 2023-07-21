import { LinearProgress } from "@mui/material";

export const Renderer = ({
  isLoading,
  component,
}: {
  isLoading: boolean;
  component: JSX.Element;
}) => {
  switch (isLoading) {
    case true:
      return <LinearProgress />;
    case false:
      return component;
  }
};
