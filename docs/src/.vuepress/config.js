const { description } = require("../../package");

module.exports = {
  base: "/gdx-agreements-tracker/",
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: "GDX Agreements Tracker",
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ["meta", { name: "theme-color", content: "#3eaf7c" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    ["meta", { name: "apple-mobile-web-app-status-bar-style", content: "black" }],
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    logo: '/images/BCID_H_rgb_pos.png',
    repo: "https://github.com/bcgov/gdx-agreements-tracker",
    editLinks: false,
    docsDir: "",
    editLinkText: "",
    lastUpdated: false,
    nav: [
      {
        text: "Guide",
        link: "/guide/",
      },
    ],
    sidebar: {
      "/guide/": [
        {
          title: "Guide",
          collapsable: false,
          children: [
            "",
            {
              title: "React Components",
              path: "/guide/react_components/",
              collapsable: true,
              children: [
                "/guide/react_components/Accordion",
                "/guide/react_components/BudgetDisplay",
                "/guide/react_components/BudgetDisplay",
                "/guide/react_components/ChipNav",
                "/guide/react_components/ConfirmationDialog",
                "/guide/react_components/DBLock",
                "/guide/react_components/Debug",
                "/guide/react_components/DeleteButton",
                {
                  title: "Forms",
                  collapsable: true,
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    },
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: ["@vuepress/plugin-back-to-top", "@vuepress/plugin-medium-zoom"],
};
