/* eslint-env node */

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  mode: "production",
  entry: {
    main: path.resolve(__dirname, "dist/index.js"),
  },
  output: {
    filename: "built/[name].js",
    path: path.resolve(__dirname, "../build/resources/main/static"),
  },
  plugins: [new MiniCssExtractPlugin({ filename: "built/[name].css" })],
  optimization: {
    noEmitOnErrors: true,
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: "../" },
          },
          "css-loader",
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: "../" },
          },
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(svg|png|gif|ico)$/,
        loader: "url-loader?limit=10000&name=img/[name].[ext]",
      },
    ],
  },
};
