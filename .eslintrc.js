const config = {
  extends: ["eslint:recommended", "plugin:node/recommended"],
  rules: {
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "no-process-exit": ["off"],
  },
  overrides: [
    {
      files: [`**/__tests__/*.js`],
      plugins: ["jest"],
      rules: {
        "jest/no-disabled-tests": "warn",
        "jest/no-focused-tests": "error",
        "jest/no-identical-title": "error",
        "jest/prefer-to-have-length": "warn",
        "jest/valid-expect": "error",
      },
      env: {
        "jest/globals": true,
      },
    },
  ],
};

module.exports = config;
