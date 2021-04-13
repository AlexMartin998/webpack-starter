const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "production",
    optimization: {
        minimize: true,
        minimizer: [new CssMinimizerPlugin()],
    },
    output: {
        filename: "main[chunkhash].js",
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
            {
                test: /\.css$/,
                exclude: /styles\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /styles\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
                options: {
                    minimize: false,
                },
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            esModule: false,
                            name: "assets/[name].[ext]",
                        },
                    },
                ],
            },
        ],
    },

    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html",
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[chunkhash].css",
            ignoreOrder: false,
        }),
        new CopyPlugin({
            patterns: [{ from: "src/assets", to: "assets/" }],
        }),
    ],
};
