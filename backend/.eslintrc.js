module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended",
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
  plugins: ["jest", "eslint-plugin-no-inline-styles", "prefer-arrow", "jsdoc"],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  globals: {},
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
    // "func-style": [
    //   "error",
    //   "expression"
    // ],

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
      settings: {},

      /**
       * Typescript Rules
       */
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": ["error"],
      },
    },
    {
      // Permit classic function declarations for seeds and migrations, because that is what the generator tool creates.
      files: ["src/database/migrations/*.js", "src/database/seeds/*.js"],
      rules: {
        "prefer-arrow/prefer-arrow-functions": "off",
        "prefer-arrow-callback": "off",
      },
    },
  ],
};
