const path = require("path");
const prependFile = require("prepend-file");
const webpack = require("webpack");

const userScriptHeader = `// ==UserScript==
// @name         novahack-ui
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Try to take over the world!
// @author       scar17off
// @match        https://evades.io/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

`;

module.exports = {
    mode: "production",
    entry: path.resolve(__dirname, "src", "index.js"),
    output: {
        filename: "novahack-ui.user.js",
        path: path.resolve(__dirname),
    },
    plugins: [
        {
            apply: (compiler) => {
                compiler.hooks.afterEmit.tap('PrependUserScriptHeader', compilation => {
                    prependFile(path.resolve(__dirname, "novahack-ui.user.js"), userScriptHeader, function (err) {
                        if (err) {
                            console.error("Failed to prepend UserScript header:", err);
                        }
                    });
                });
            }
        },
        new webpack.ProvidePlugin({
            React: 'react',
            ReactDOM: 'react-dom'
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', {
                    loader: 'css-loader',
                    options: {
                        modules: {
                            localIdentName: '[name]__[local]__[hash:base64:5]'
                        }
                    }
                }],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    optimization: {
        minimize: true,
        concatenateModules: true
    }
};