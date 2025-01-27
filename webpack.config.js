const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const loader = require("sass-loader");
const autoprefixer = require("autoprefixer");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    entry: "./src/js/main.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
    },

    watch: false,
    devtool: "source-map",
    mode: "production",

    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            [
                                "@babel/preset-env",
                                {
                                    debug: true,
                                    corejs: 3,
                                    useBuiltIns: "usage",
                                },
                            ],
                        ],
                    },
                },
            },
            {
                test: /\.scss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            url: false,
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    autoprefixer({
                                        browsers: ["ie >= 8", "last 4 version"],
                                    }),
                                ],
                            },
                        },
                    },
                    {
                        loader: "sass-loader",
                    },
                ],
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
        ],
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: "style.css",
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "src/index.html",
            title: "Mono",
            scriptLoading: "defer",
            inject: "body",
            hash: true,
        }),

        new BrowserSyncPlugin({
            server: {
                baseDir: "dist",
            },
            files: ["dist/*.html", "dist/css/*.css", "dist/js/*.js"],
            notify: false,
            open: true,
            port: 3000,
            cors: true, // Включите CORS
            notify: false,
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: "src/fonts", to: "fonts" },
                { from: "src/icons", to: "icons" },
                { from: "src/images", to: "images" },
                { from: "src/css", to: "css" },
                { from: "src", to: "formhandler.php" },
                { from: "vendor", to: "vendor" },
              
            ],
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin({
                minimizerOptions: {
                    preset: [
                        "default",
                        {
                            // Отключение сортировки CSS-свойств
                            normalizeUrls: true,
                            cssDeclarationSorter: false,
                        },
                    ],
                },
            }),
            new TerserPlugin(),
        ],
    },
};
