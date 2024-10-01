const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { url: false },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    clean: {
      keep: /openscad-worker\.js$/,
    },
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
      publicPath: "/",
    },
    compress: true,
    port: 4000,
    host: "0.0.0.0",
    allowedHosts: "all",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    },
    setupMiddlewares: (middlewares, devServer) => {
      devServer.app.use((req, res, next) => {
        console.log("Request URL:", req.url);
        next();
      });
      return middlewares;
    },
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  devtool: "source-map",
  performance: {
    hints: false,
    maxAssetSize: Infinity,
    maxEntrypointSize: Infinity,
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "public"),
          to: path.resolve(__dirname, "dist"),
        },
        {
          from: path.resolve(__dirname, "node_modules/primeicons/fonts"),
          to: path.resolve(__dirname, "dist/fonts"),
        },
        {
          from: path.resolve(__dirname, "src/wasm/openscad.js"),
          to: path.resolve(__dirname, "dist/openscad.js"),
        },
        {
          from: path.resolve(__dirname, "src/wasm/openscad.wasm"),
          to: path.resolve(__dirname, "dist/openscad.wasm"),
        },
      ],
    }),
  ],
};
