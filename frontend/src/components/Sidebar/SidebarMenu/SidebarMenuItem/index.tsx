import React from "react";
import PropTypes from "prop-types";
import SidebarMenuItemComponent from "./SidebarMenuItemComponent";
import { Collapse, Divider, ListItemText, List, styled } from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const SidebarMenuItemPropTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string,
  Icon: PropTypes.elementType,
  items: PropTypes.array,
};

type SidebarMenuItemPropTypes = PropTypes.InferProps<typeof SidebarMenuItemPropTypes>;
type SidebarMenuItemPropsWithoutItems = Omit<SidebarMenuItemPropTypes, "items">;

// Improve child items declaration
export type SidebarMenuItemProps = SidebarMenuItemPropsWithoutItems & {
  items?: SidebarMenuItemProps[];
  color?: string;
};

export const SidebarMenuItem: React.FC<SidebarMenuItemProps> = (props) => {
  const StyledListItemText = styled(ListItemText)({
    color: props.color,
  });

  const StyledCollapse = styled(Collapse)({
    backgroundColor: "#fff",
  });

  const { name, url, items = [] } = props;
  const isExpandable = items && items.length > 0;
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const MenuItemRoot = (
    <SidebarMenuItemComponent url={url} onClick={handleClick}>
      {/* Display an icon if any */}
      <StyledListItemText primary={name} />
      {/* Display the expand menu if the item has children */}
      {isExpandable && !open && <ExpandMoreIcon htmlColor="#fff" />}
      {isExpandable && open && <ExpandLessIcon htmlColor="#fff" />}
    </SidebarMenuItemComponent>
  );

  const MenuItemChildren = isExpandable ? (
    <StyledCollapse in={open} timeout="auto" unmountOnExit>
      <Divider />
      <List>
        {items.map((item, index) => (
          <SidebarMenuItem {...item} key={index} color={"#000"} />
        ))}
      </List>
    </StyledCollapse>
  ) : null;

  return (
    <>
      {MenuItemRoot}
      {MenuItemChildren}
    </>
  );
};
