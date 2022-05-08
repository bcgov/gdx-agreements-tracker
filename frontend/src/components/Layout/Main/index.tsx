import * as React from "react";
import Box from "@mui/material/Box";
import bcgovTheme from "../../../bcgovTheme";
import { PageFooter } from "../PageFooter";
import { Sidebar } from "../../Sidebar";
import { useDrawer } from "../../../hooks/useDrawer";
import { PageHeader } from "../PageHeader";
import { Outlet, useParams } from "react-router-dom";


const drawerWidth = bcgovTheme.customSettings.drawerWidth;

export const Main = ({ children }: any) => {
  const { drawerOpen, handleDrawerToggle } = useDrawer();
  return (
    <>   
      {/* left hand side */}
      <Sidebar drawerOpen={drawerOpen} handleDrawerToggle={handleDrawerToggle} />
      {/* right hand side */}
      <Box
        sx={{
          flexFlow: "column",
          display: "flex",
          height: "100vh",
          width: "100%",
        }}
      >
        <PageHeader drawerOpen={drawerOpen} handleDrawerToggle={handleDrawerToggle} />

        <Box
          sx={{
            // flexGrow: 1,
            p: 0,
            // width: { sm: `calc(100% - ${drawerWidth}px)` }
            flex: 1,
            display: "flex",
            flexDirection: "column",
            boxSizing: "border-box",
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Box
            component="main"
            sx={
              {
                // overflowX: "scroll",
              }
            }
          >
            <Outlet />
          </Box>
          <PageFooter />
        </Box>
      </Box>
    </>
  );
};
