import { useState } from "react";

// Implements IUseDrawer Interface
export const useDrawer = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return { drawerOpen, handleDrawerToggle };
};
