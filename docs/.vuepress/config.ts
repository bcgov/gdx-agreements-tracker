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
        text: "React Components",
        children: [
          "/guide/react_components/Accordion",
          "/guide/react_components/BudgetDisplay",
          "/guide/react_components/BudgetDisplay",
          "/guide/react_components/ChipNav",
          "/guide/react_components/ConfirmationDialog",
          "/guide/react_components/DBLock",
          "/guide/react_components/Debug",
          "/guide/react_components/DeleteButton",
        ],
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
