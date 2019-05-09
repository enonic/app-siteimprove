const ErrorLoggerPlugin = require('error-logger-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const path = require('path');

const isProd = process.env.NODE_ENV === 'production';

const assets = path.join(__dirname, '/build/resources/main/assets');

module.exports = {
    context: path.join(__dirname, '/src/main/resources/assets'),
    entry: {
        'js/siteimprove': './js/main.ts',
        'styles/siteimprove': './styles/main.less'
    },
    output: {
        path: assets,
        filename: './[name].js'
    },
    resolve: {
        extensions: ['.ts', '.js', '.less', '.css']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [{loader: 'ts-loader', options: {configFile: 'tsconfig.build.json'}}]
            },
            {
                test: /\.less$/,
                use: [
                    {loader: MiniCssExtractPlugin.loader, options: {publicPath: '../', hmr: !isProd}},
                    {loader: 'css-loader', options: {sourceMap: !isProd, importLoaders: 1, url: false}},
                    {loader: 'postcss-loader', options: {sourceMap: !isProd}},
                    {loader: 'less-loader', options: {sourceMap: !isProd}},
                ]
            },
            {
                test: /\.(eot|woff|woff2|ttf)$|icomoon.svg/,
                use: 'file-loader?name=fonts/[name].[ext]'
            },
            {
                test: /^\.(svg|png|jpg|gif)$/,
                use: 'file-loader?name=img/[name].[ext]'
            }
        ]
    },
    plugins: [
        new ErrorLoggerPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: './styles/[id].css'
        }),
        new CircularDependencyPlugin({
            exclude: /a\.js|node_modules/,
            failOnError: true
        }),
        ...(isProd ? [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                uglifyOptions: {
                    mangle: false,
                    keep_classnames: true,
                    keep_fnames: true
                }
            })
        ] : [])
    ],
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? false : 'source-map'
};
