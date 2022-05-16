import { ListItem } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export interface SidebarMenuItemComponentProps {
  url?: string | null; // because the InferProps props allows alows null value`
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

const SidebarMenuItemComponent: React.FC<SidebarMenuItemComponentProps> = (props) => {
  const { onClick, url, children } = props;

  // If url is not set return the orinary ListItem
  if (!url || typeof url !== "string") {
    return (
      <ListItem button onClick={onClick}>
        {children}
      </ListItem>
    );
  }

  // Return a LitItem with a url component
  return (
    <ListItem button component={Link} to={url}>
      {children}
    </ListItem>
  );
};

export default SidebarMenuItemComponent;
