import { defaultTheme } from "@vuepress/theme-default";

import { defineUserConfig } from "vuepress";
import { searchPlugin } from "@vuepress/plugin-search";

export default defineUserConfig({
  base: "/gdx-agreements-tracker/",
  lang: "en-US",
  title: "GDX Agreements Tracker",
  description: "Developer Documentation for GDX Agreements Tracker",
  theme: defaultTheme({
    logo: "/images/BCID_H_rgb_pos.png",
    logoDark: "/images/BCID_H_rgb_rev.png",
    editLink: false,
    lastUpdated: false,
    repo: 'bcgov/gdx-agreements-tracker',
    repoLabel: 'Github',
    navbar: [
      {
        text: 'Home',
        link: '/',
      },
    ],
    // sidebar array
    // all pages will use the same sidebar
    sidebar: [
      // SidebarItem
      {
        text: "Getting Started",
        collapsible: true,
        children: [
          "/guide/GettingStarted/deploy_locally",
          "/guide/GettingStarted/deploy_kubernetes",
          "/guide/GettingStarted/deploy_openshift",
          "/guide/GettingStarted/building_images",
        ]
      }, 
      {
        text: "Frontend",
        collapsible: true,
        children: [
          "/guide/Frontend/react_components/Accordion",
          "/guide/Frontend/react_components/BudgetDisplay",
          "/guide/Frontend/react_components/ChipNav",
          "/guide/Frontend/react_components/ConfirmationDialog",
          "/guide/Frontend/react_components/DBLock",
          "/guide/Frontend/react_components/Debug",
          "/guide/Frontend/react_components/DeleteButton",
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
        children: [
          "/guide/openshift/change_password",
          "/guide/openshift/temp"
        ],

      },
      // string - page file path
    ],
  }),
  plugins: [
    searchPlugin({
      // options
    })
  ],
});
