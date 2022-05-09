module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jest/recommended",
    "plugin:jsdoc/recommended",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: "module",
  },
  plugins: [
    "react",
    "react-hooks",
    "jest",
    "eslint-plugin-no-inline-styles",
    "prefer-arrow",
    "jsdoc",
  ],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
    react: {
      version: "17",
    },
  },
  globals: {
    // Prevent React incorrectly marked as unknown global.
    React: "readonly",
  },
  rules: {
    // No console.log.
    "no-console": ["error", { allow: ["warn", "error"] }],

    // Semicolons must be at the end of lines, where appropriate.
    "semi-style": ["error", "last"],

    // Enforce consistent use of trailing commas.
    "comma-dangle": [
      "error",
      {
        arrays: "always-multiline",
        objects: "always-multiline",
        imports: "always-multiline",
        exports: "always-multiline",
        functions: "ignore",
      },
    ],

    // Yoda style, equality comparisons with literals must be.
    yoda: ["error", "always", { onlyEquality: true }],

    // No type coercion in comparisons.
    eqeqeq: ["error", "always"],

    // No declaring anything and not using it; did you finish cleaning up?
    "no-unused-vars": ["error", { args: "none" }],

    // Must use const or let.
    "no-var": "error",

    // Stops unknown globals.
    "no-undef": "error",

    // Arrow functions instead of classic function syntax. https://stackoverflow.com/a/64258560/5301718
    "prefer-arrow/prefer-arrow-functions": [
      "error",
      {
        disallowPrototype: true,
        singleReturnOnly: false,
        classPropertiesAllowed: false,
      },
    ],
    "prefer-arrow-callback": ["error", { allowNamedFunctions: true }],
    // Disabled for now, because this seems to be redundant, but it might not be in some cases; preserved for if we find those cases.
    //"func-style": [
    //  "error",
    //  "expression"
    //],

    // React.
    // Prevent React to be incorrectly marked as unused.
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    // No inline styles. 2 is the same as "error" for this plugin. https://www.npmjs.com/package/eslint-plugin-no-inline-styles
    "no-inline-styles/no-inline-styles": 2,

    // JSDoc
    // Require JSDoc block.
    "jsdoc/require-jsdoc": "error",
    // Line everything up when lint:fix is run.
    "jsdoc/check-line-alignment": ["warn", "always"],
    // Require a description in JSDoc block.
    "jsdoc/require-description": [
      "error",
      {
        descriptionStyle: "any",
        checkConstructors: false,
        checkGetters: false,
        checkSetters: false,
      },
    ],
    "jsdoc/newline-after-description": "error",
    // Require a return type. Don't require a return type description.
    "jsdoc/require-returns": "error",
    "jsdoc/require-returns-type": "error",
    "jsdoc/require-returns-description": "off",
    // Params need a type and description.
    "jsdoc/check-types": "error",
    "jsdoc/require-param-description": "error",
    // Trust that the type exists somewhere. Prevents having to import types that are unused except for only doc blocks.
    "jsdoc/no-undefined-types": "off",

    // Jest
    // Tests must have at least one assertion.
    "jest/expect-expect": "error",
  },
  overrides: [
    {
      // Separate linting for typescript. https://stackoverflow.com/a/60773716/5301718
      files: ["*.ts", "*.tsx"],
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint", "eslint-plugin-no-inline-styles", "prefer-arrow"],
      extends: ["plugin:@typescript-eslint/eslint-recommended"],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
      },
      settings: {
        react: {
          version: "17",
        },
      },

      /**
       * Typescript Rules
       */
      rules: {
        // Use of "any" type disallowed. Use the following if you really need "any": // eslint-disable-next-line @typescript-eslint/no-explicit-any
        "@typescript-eslint/no-explicit-any": "error",
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": ["error"],
      },
    },
  ],
};
