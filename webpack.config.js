const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const isDevelopment = process.env.NODE_ENV !== "production";
console.log(process.env.NODE_ENV, `, isDevelopment=${isDevelopment}`);

module.exports = {
  entry: "./src/index.js",
  mode: isDevelopment ? "development" : "production",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index_bundle.js",
  },
  devServer: {
    port: "3000",
    static: {
      directory: path.resolve(__dirname, "public"),
    },
    devMiddleware: { publicPath: "/" },
    hot: true,
    allowedHosts: "all",
    historyApiFallback: true,
  },
  devtool: isDevelopment ? "source-map" : false,
  watchOptions: {
    poll: true,
    ignored: "/node_modules",
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".css"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
      publicPath: isDevelopment ? "/" : "./",
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
