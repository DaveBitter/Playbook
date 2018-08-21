const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, { mode }) => {
  const plugins =
    mode == "production"
      ? []
      : [
          new HtmlWebpackPlugin({
            template: "src/demo/index.html"
          })
        ];
  return {
    mode: mode || "production",
    entry: [mode == "production" ? "./src" : "./src/demo"],
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "index.min.js"
    },
    target: "web",
    watch: mode == "development",
    module: {
      rules: [
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: ["babel-loader"]
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        }
      ]
    },
    plugins,
    devServer: {
      port: 3000,
      contentBase: "./dist"
    }
  };
};
