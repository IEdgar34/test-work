const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const loader = require("sass-loader");
const autoprefixer = require("autoprefixer");
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const compression = require("compression");
const HtmlWebpackTagsPlugin = require("html-webpack-tags-plugin");
//Передаем массив объектов конфига
module.exports = [
    {
        //входные точки
        entry: {
            main: "./src/js/main.js",
            another: "./src/js/index.js",
        },
        //итоговые файлы
        output: {
            filename: "[name].bundle.js",
            path: path.resolve(__dirname, "dist"),
        },

        watch: false,
        /* devtool: "source-map", */
        mode: "production",
        //модуль правил
        module: {
            //правила в который передаются объекты правил разных типов файлов
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
                                        targets: { esmodules: true }, // Поддержка ES-модулей
                                        modules: false, // Отключаем трансформацию ES-модулей
                                        useBuiltIns: false, // Без полифилов
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
        //плагины
        plugins: [
            new MiniCssExtractPlugin({
                filename: "styles.css",
            }),
            new HtmlWebpackPlugin({
                filename: "original.html",
                template: "src/original.html",
                title: "Mono",
                scriptLoading: "blocking",
                inject: "body",
                hash: true,
                excludeChunks: ["main", "another", "styles"],
            }),
            new HtmlWebpackTagsPlugin({
                scripts: [
                    { path: "main.bundle.js", attributes: { defer: true } },
                    { path: "another.bundle.js", attributes: { defer: true } },
                ],
                tags: [{ path: "styles.css", attributes: { media: "print", onload: "this.onload=null;this.media='all'" } }],
                useHash: true,
                append: false, // Вставляет перед другими скриптами
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
          /*   new BrowserSyncPlugin({
                server: {
                    baseDir: "dist",
                    middleware: [compression()],
                },
                files: ["dist/*.html", "dist/css/*.css", "dist/js/*.js"],
                notify: false,
                open: true,
                port: 3000,
                cors: true, // Включите CORS
                notify: false,
                reloadDelay: 500,
            }), */
            /* new CompressionPlugin({
                test: /\.m?js$/,
                algorithm: "gzip",
            }),
            new CompressionPlugin({
                test: /\.css$/i,
                algorithm: "gzip",
            }), */
        ],
        //оптимизация
        optimization: {
            splitChunks: {
                cacheGroups: {
                    styles: {
                        name: "styles", // Название файла
                        test: /\.(s?css)$/, // Указываем, что это стили
                        chunks: "all",
                        enforce: true,
                    },
                },
            },
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
    },
    //Второй блок конфига,для старых браузеров
    {
        entry: {
            main: "./src/js/main.js",
            another: "./src/js/index.js",
        },
        output: {
            filename: "[name].legacy.js",
            path: path.resolve(__dirname, "dist"),
        },

        watch: false,
        /* devtool: "source-map", */
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
                filename: "styles.css",
            }),
            new HtmlWebpackPlugin({
                filename: "index.html",
                template: "dist/original.html",
                title: "Mono",
                scriptLoading: "blocking", // 🔹 Обычные `<script>`
                hash: true,
                excludeChunks: ["main", "another", "styles"],
            }),
            new HtmlWebpackTagsPlugin({
                scripts: [
                    { path: "main.legacy.js", attributes: { nomodule: true } },
                    { path: "another.legacy.js", attributes: { nomodule: true } },
                ],
                useHash: true,
                append: false, // Вставляет перед другими скриптами
            }),

            new BrowserSyncPlugin({
                server: {
                    baseDir: "dist",
                    middleware: [compression()],
                },
                files: ["dist/*.html", "dist/css/*.css", "dist/js/*.js"],
                notify: false,
                open: true,
                port: 3000,
                cors: true, // Включите CORS
                notify: false,
                reloadDelay: 500,
            }),

            /*  new CompressionPlugin({
                test: /\.m?js$/,
                algorithm: "gzip",
            }),
            new CompressionPlugin({
                test: /\.css$/i,
                algorithm: "gzip",
            }), */
        ],
        optimization: {
            splitChunks: {
                cacheGroups: {
                    styles: {
                        name: "styles",
                        test: /\.(s?css)$/,
                        chunks: "all",
                        enforce: true,
                    },
                },
            },
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
    },
];
