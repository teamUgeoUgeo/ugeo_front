const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const isDevelopment = process.env.NODE_ENV !== "production";
console.log(process.env.NODE_ENV, `, isDevelopment=${isDevelopment}`);

module.exports = {
  entry: "./src/index.js",
  mode: isDevelopment ? "development" : "production",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index_bundle.js",
    publicPath: isDevelopment ? "/" : "",
    clean: true,
  },
  target: "web",
  devServer: {
    port: "3000",
    static: {
      directory: path.join(__dirname, "dist"),
    },
    hot: true,
    allowedHosts: "all",
    historyApiFallback: {
      index: "/index.html",
    },
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
      scriptType: "text/javascript",
      scriptLoading: "defer",
    }),
    isDevelopment && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
};
