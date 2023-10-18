import { defaultTheme } from "@vuepress/theme-default";
import { sidebar } from "./configs";
import { defineUserConfig } from "vuepress";
import { searchPlugin } from "@vuepress/plugin-search";

export default defineUserConfig({
  base: "/gdx-agreements-tracker/",
  lang: "en-US",
  title: "GDX Agreements Tracker",
  description: "Developer Documentation for GDX Agreements Tracker",
  theme: defaultTheme({
    logo: "/images/BCID_H_rgb_pos.png",
    // sidebar array
    // all pages will use the same sidebar
    sidebar: [
      "/guide/README.md",
      // SidebarItem
      {
        text: "Frontend",
        collapsible: true,
        children: [
          "/guide/Frontend/react_components/Accordion",
          "/guide/Frontend/react_components/BudgetDisplay",
          "/guide/Frontend/react_components/BudgetDisplay",
          "/guide/Frontend/react_components/ChipNav",
          "/guide/Frontend/react_components/ConfirmationDialog",
          "/guide/Frontend/react_components/DBLock",
          "/guide/Frontend/react_components/Debug",
        ],
      },
      {
        text: "Backend",
        collapsible: true,
        children: ["/guide/Backend/backend_api.md"],
      },
      {
        text: "Openshift",
        collapsible: true,
        children: ["/guide/openshift/change_password"],
      },
      // string - page file path
    ],
  }),
  plugins: [
    searchPlugin({
      // options
    }),
  ],
});
