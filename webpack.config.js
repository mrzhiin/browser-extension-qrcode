const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    newTab: path.resolve(__dirname, "./src/popup.ts")
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[chunkhash].js"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader",
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/popup.html",
      filename: "popup.html",
      inject: "head"
    }),
    new CopyPlugin([path.resolve(__dirname, "./src/public")])
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  }
};
