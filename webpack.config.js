'use strict'
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
    mode: 'development',

    entry: [
        './src/index.js'
    ],
    optimization: {
        minimizer: [new UglifyJsPlugin()],
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: [/\.vert$/, /\.frag$/],
                use: 'raw-loader'
            }
        ]
    },
    /* devtool: 'eval-source-map', */
    devServer: {
        host: '127.0.0.1',
        port:'8080',
        contentBase: './build'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        pathinfo: false,
        filename: '[name].js',
        devtoolModuleFilenameTemplate: '../[resource-path]'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        new CopyWebpackPlugin(
            [
                {
                    from: './assets',
                    to: './assets',
                    force: true
                },
                {
                    from:'./lib',
                    to:'./lib'
                },
               
                {
                    from: './app.css',
                    to: './app.css',
                    force: true
                },
                {
                    from:'./fonts',
                    to:'./fonts'
                }
            ]),
        new webpack.DefinePlugin({
            'CANVAS_RENDERER': JSON.stringify(true),
            'WEBGL_RENDERER': JSON.stringify(true)
        })
    ]
}