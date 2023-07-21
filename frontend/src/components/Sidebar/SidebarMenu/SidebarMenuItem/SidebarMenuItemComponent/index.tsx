import { ListItem } from "@mui/material";

import { Link } from "react-router-dom";

export interface SidebarMenuItemComponentProps {
  url?: string | null; // because the InferProps props allows null value`
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

const SidebarMenuItemComponent: React.FC<SidebarMenuItemComponentProps> = (
  props: React.PropsWithChildren<SidebarMenuItemComponentProps>
) => {
  const { onClick, url, children } = props;

  // If url is not set return the orinary ListItem
  if (!url || typeof url !== "string") {
    return <ListItem onClick={onClick}>{children}</ListItem>;
  }

  // Return a LitItem with a url component
  return (
    <ListItem component={Link} to={url}>
      {children}
    </ListItem>
  );
};

export default SidebarMenuItemComponent;
