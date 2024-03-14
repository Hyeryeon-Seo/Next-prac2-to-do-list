/** @type {import("prettier").Config} */
const config = {
  printWidth: 120,
  trailingComma: "none",
  tabWidth: 4,
  useTabs: false,
  semi: true,
  singleQuote: true,
  bracketSpacing: true,
  plugins: ["prettier-plugin-tailwindcss"],
};

module.exports = config;
