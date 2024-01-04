const path = require("path");
const webpack = require("webpack");
const { ModuleFederationPlugin } = webpack.container;

module.exports = {
    mode: "production",
    // file index.ts làm entry point để webpack xây Dependency Graph cho việc bundle
    entry: {
        loader: path.resolve(__dirname, "src/index.ts"),
    },
    output: {
        path: path.resolve(__dirname, "dist"), // file sau khi bundle sẽ lưu ở folder dist
        filename: "[name].bundle.js", // [name] ứng với các entry name. Ở đây là loader
        clean: true, // làm sạch folder dist trước mỗi lần build
    },
    module: {
        // rules để load file typescript
        rules: [
            {
                test: /\.ts$/, // tìm các file kết thúc với ts để build
                use: "ts-loader", // sử dụng loader tương ứng là ts-loader
                exclude: /node_modules/, // bỏ qua các file trong node_modules
            },
        ],
    },
    resolve: {
        // resolve các phần mở rộng của các file theo thứ tự: tsx, ts và js.
        extensions: [".tsx", ".ts", ".js"],
    },
    devServer: {
        // serve file ở folder dist
        static: { directory: path.join(__dirname, "dist") },
        compress: true,
        // server nghe ở cổng 3001
        port: 3001,
    },
    devtool: false,
    plugins: [
        // Plugin expose code của module này để các module khác có thể consume
        new ModuleFederationPlugin({
            name: "loader", // cần giống với tên của entry
            filename: "remoteEntry.js", // code bundled các module khác gọi đến
            // Expose file index dưới tên LoaderIndex. Các module khác muốn sử
            // dụng code file src/index sẽ truy cập với tên LoaderIndex
            exposes: { "./LoaderIndex": "./src/index" },
        }),
    ],
};
