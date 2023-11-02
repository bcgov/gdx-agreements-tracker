// docs/.vuepress/config.ts
import { defaultTheme } from "@vuepress/theme-default";
import { defineUserConfig } from "vuepress";
import { searchPlugin } from "@vuepress/plugin-search";
import copyCode from "vuepress-plugin-code-copy";
var config_default = defineUserConfig({
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
        text: "Getting Started",
        collapsible: true,
        children: [
          "/guide/GettingStarted/deploy_locally"
        ]
      },
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
          "/guide/Frontend/react_components/Debug"
        ]
      },
      {
        text: "Backend",
        collapsible: true,
        children: ["/guide/Backend/backend_api.md"]
      },
      {
        text: "Openshift",
        collapsible: true,
        children: ["/guide/openshift/change_password"]
      }
      // string - page file path
    ]
  }),
  plugins: [
    searchPlugin({
      // options
    }),
    copyCode
  ]
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZG9jcy8udnVlcHJlc3MvY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL3N0dXJwbGUvRGV2ZWxvcG1lbnQvdG9vbHMvZ2R4LWFncmVlbWVudHMtdHJhY2tlci9kb2N1bWVudGF0aW9uL2RvY3MvLnZ1ZXByZXNzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvc3R1cnBsZS9EZXZlbG9wbWVudC90b29scy9nZHgtYWdyZWVtZW50cy10cmFja2VyL2RvY3VtZW50YXRpb24vZG9jcy8udnVlcHJlc3MvY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9zdHVycGxlL0RldmVsb3BtZW50L3Rvb2xzL2dkeC1hZ3JlZW1lbnRzLXRyYWNrZXIvZG9jdW1lbnRhdGlvbi9kb2NzLy52dWVwcmVzcy9jb25maWcudHNcIjtpbXBvcnQgeyBkZWZhdWx0VGhlbWUgfSBmcm9tIFwiQHZ1ZXByZXNzL3RoZW1lLWRlZmF1bHRcIjtcblxuaW1wb3J0IHsgZGVmaW5lVXNlckNvbmZpZyB9IGZyb20gXCJ2dWVwcmVzc1wiO1xuaW1wb3J0IHsgc2VhcmNoUGx1Z2luIH0gZnJvbSBcIkB2dWVwcmVzcy9wbHVnaW4tc2VhcmNoXCI7XG5pbXBvcnQgIGNvcHlDb2RlICBmcm9tIFwidnVlcHJlc3MtcGx1Z2luLWNvZGUtY29weVwiXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZVVzZXJDb25maWcoe1xuICBiYXNlOiBcIi9nZHgtYWdyZWVtZW50cy10cmFja2VyL1wiLFxuICBsYW5nOiBcImVuLVVTXCIsXG4gIHRpdGxlOiBcIkdEWCBBZ3JlZW1lbnRzIFRyYWNrZXJcIixcbiAgZGVzY3JpcHRpb246IFwiRGV2ZWxvcGVyIERvY3VtZW50YXRpb24gZm9yIEdEWCBBZ3JlZW1lbnRzIFRyYWNrZXJcIixcbiAgdGhlbWU6IGRlZmF1bHRUaGVtZSh7XG4gICAgbG9nbzogXCIvaW1hZ2VzL0JDSURfSF9yZ2JfcG9zLnBuZ1wiLFxuICAgIC8vIHNpZGViYXIgYXJyYXlcbiAgICAvLyBhbGwgcGFnZXMgd2lsbCB1c2UgdGhlIHNhbWUgc2lkZWJhclxuICAgIHNpZGViYXI6IFtcbiAgICAgIFwiL2d1aWRlL1JFQURNRS5tZFwiLFxuICAgICAgLy8gU2lkZWJhckl0ZW1cbiAgICAgIHtcbiAgICAgICAgdGV4dDogXCJHZXR0aW5nIFN0YXJ0ZWRcIixcbiAgICAgICAgY29sbGFwc2libGU6IHRydWUsXG4gICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgXCIvZ3VpZGUvR2V0dGluZ1N0YXJ0ZWQvZGVwbG95X2xvY2FsbHlcIlxuICAgICAgICBdXG4gICAgICB9LCBcbiAgICAgIHtcbiAgICAgICAgdGV4dDogXCJGcm9udGVuZFwiLFxuICAgICAgICBjb2xsYXBzaWJsZTogdHJ1ZSxcbiAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICBcIi9ndWlkZS9Gcm9udGVuZC9yZWFjdF9jb21wb25lbnRzL0FjY29yZGlvblwiLFxuICAgICAgICAgIFwiL2d1aWRlL0Zyb250ZW5kL3JlYWN0X2NvbXBvbmVudHMvQnVkZ2V0RGlzcGxheVwiLFxuICAgICAgICAgIFwiL2d1aWRlL0Zyb250ZW5kL3JlYWN0X2NvbXBvbmVudHMvQnVkZ2V0RGlzcGxheVwiLFxuICAgICAgICAgIFwiL2d1aWRlL0Zyb250ZW5kL3JlYWN0X2NvbXBvbmVudHMvQ2hpcE5hdlwiLFxuICAgICAgICAgIFwiL2d1aWRlL0Zyb250ZW5kL3JlYWN0X2NvbXBvbmVudHMvQ29uZmlybWF0aW9uRGlhbG9nXCIsXG4gICAgICAgICAgXCIvZ3VpZGUvRnJvbnRlbmQvcmVhY3RfY29tcG9uZW50cy9EQkxvY2tcIixcbiAgICAgICAgICBcIi9ndWlkZS9Gcm9udGVuZC9yZWFjdF9jb21wb25lbnRzL0RlYnVnXCIsXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiBcIkJhY2tlbmRcIixcbiAgICAgICAgY29sbGFwc2libGU6IHRydWUsXG4gICAgICAgIGNoaWxkcmVuOiBbXCIvZ3VpZGUvQmFja2VuZC9iYWNrZW5kX2FwaS5tZFwiXSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6IFwiT3BlbnNoaWZ0XCIsXG4gICAgICAgIGNvbGxhcHNpYmxlOiB0cnVlLFxuICAgICAgICBjaGlsZHJlbjogW1wiL2d1aWRlL29wZW5zaGlmdC9jaGFuZ2VfcGFzc3dvcmRcIl0sXG4gICAgICB9LFxuICAgICAgLy8gc3RyaW5nIC0gcGFnZSBmaWxlIHBhdGhcbiAgICBdLFxuICB9KSxcbiAgcGx1Z2luczogW1xuICAgIHNlYXJjaFBsdWdpbih7XG4gICAgICAvLyBvcHRpb25zXG4gICAgfSksXG4gICAgXG4gICAgY29weUNvZGVcbiAgXSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFvYSxTQUFTLG9CQUFvQjtBQUVqYyxTQUFTLHdCQUF3QjtBQUNqQyxTQUFTLG9CQUFvQjtBQUM3QixPQUFRLGNBQWU7QUFFdkIsSUFBTyxpQkFBUSxpQkFBaUI7QUFBQSxFQUM5QixNQUFNO0FBQUEsRUFDTixNQUFNO0FBQUEsRUFDTixPQUFPO0FBQUEsRUFDUCxhQUFhO0FBQUEsRUFDYixPQUFPLGFBQWE7QUFBQSxJQUNsQixNQUFNO0FBQUE7QUFBQTtBQUFBLElBR04sU0FBUztBQUFBLE1BQ1A7QUFBQTtBQUFBLE1BRUE7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLGFBQWE7QUFBQSxRQUNiLFVBQVU7QUFBQSxVQUNSO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixhQUFhO0FBQUEsUUFDYixVQUFVO0FBQUEsVUFDUjtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sYUFBYTtBQUFBLFFBQ2IsVUFBVSxDQUFDLCtCQUErQjtBQUFBLE1BQzVDO0FBQUEsTUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sYUFBYTtBQUFBLFFBQ2IsVUFBVSxDQUFDLGtDQUFrQztBQUFBLE1BQy9DO0FBQUE7QUFBQSxJQUVGO0FBQUEsRUFDRixDQUFDO0FBQUEsRUFDRCxTQUFTO0FBQUEsSUFDUCxhQUFhO0FBQUE7QUFBQSxJQUViLENBQUM7QUFBQSxJQUVEO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
