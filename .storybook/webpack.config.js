const createCompiler = require("@storybook/addon-docs/mdx-compiler-plugin");

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.mdx$/,
    use: [
      {
        loader: "babel-loader",
        options: {
          presets: [["react-app", { flow: false, typescript: true }]]
        }
      },
      {
        loader: "@mdx-js/loader",
        options: {
          compilers: [createCompiler({})]
        }
      }
    ]
  });

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve("awesome-typescript-loader")
      },
      // Optional
      {
        loader: require.resolve("react-docgen-typescript-loader")
      }
    ]
  });
  config.resolve.extensions.push(".ts", ".tsx", ".js", ".jsx", ".mdx");
  return config;
};
