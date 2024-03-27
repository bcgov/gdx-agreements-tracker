import { Autocomplete, TextField } from "@mui/material";
import { ListItem } from "@mui/material";
import SidebarMenuItemComponent from "../SidebarMenuItem/SidebarMenuItemComponent";

export const PickerOptionsMenu = () => {
  const menuItems = [
    { label: "Yes/No Option", link: "/admin/yes-no-option" },
    {
      label: "Project Agreement Types",
      link: "/admin/project-agreement-types",
    },
    {
      label: "Billing Period Option",
      link: "/admin/billing-period-option",
    },
    {
      label: "Contacts",
      link: "/admin/contacts",
    },
    {
      label: "Suppliers",
      link: "/admin/suppliers",
    },
    {
      label: "Subcontractors",
      link: "/admin/subcontractors",
    },
    {
      label: "Resources",
      link: "/admin/resources",
    },
    {
      label: "Ministries / Org Name",
      link: "/admin/ministries",
    },
  ];

  return (
    <ListItem>
      <Autocomplete
        disablePortal
        options={menuItems}
        sx={{ width: "100%" }}
        renderInput={(params) => <TextField {...params} label="Picker Options" />}
        renderOption={(props, option) => {
          const { label, link } = option;
          return (
            <SidebarMenuItemComponent url={link}>
              <span>{label}</span>
            </SidebarMenuItemComponent>
          );
        }}
      />
    </ListItem>
  );
};
