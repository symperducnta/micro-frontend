const path = require("path");
const webpack = require("webpack");
const { ModuleFederationPlugin } = webpack.container;
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "production",
    entry: { container: path.resolve(__dirname, "src/index.ts") },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
        clean: true,
    },
    module: {
        rules: [{ test: /\.ts$/, use: "ts-loader", exclude: /node_modules/ }],
    },
    resolve: { extensions: [".tsx", ".ts", ".js"] },
    devServer: {
        static: { directory: path.join(__dirname, "public") },
        compress: true,
        port: 3000,
    },
    plugins: [
        new HtmlWebpackPlugin({ template: "./public/index.html" }),
        new ModuleFederationPlugin({
            name: "container",
            remotes: { loader: "loader@http://localhost:3001/remoteEntry.js" },
        }),
    ],
};
