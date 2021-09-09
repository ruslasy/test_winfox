const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

const PUBLIC_PATH = path.resolve(__dirname, '../../public/src/');

module.exports = {
    mode: 'production',
    entry: {
        index: path.resolve(__dirname, '../src/js/main.js'),
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.s(c|a)ss$/,
                use: [
                  'vue-style-loader',
                  'css-loader',
                  {
                    loader: 'sass-loader',
                    options: {
                    },
                  },
                ],
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.svg/,
                use: [
                    {
                        loader: 'svg-url-loader',
                        options: {
                            publicPath: "images/"
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: "images/[hash].[ext]"
                        }
                    }
                ]
            },
        ],
    },
    resolve: { extensions: ['*', '.js', '.vue'], modules: ['node_modules'] },
    output: {
        path: PUBLIC_PATH,
        publicPath: '/',
        filename: 'build.js',
    },
    plugins: [
        new VueLoaderPlugin(),
        new VuetifyLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename     : 'build.css',
        }),
        new CleanWebpackPlugin({
             cleanOnceBeforeBuildPatterns: ['build.css', 'build.js', 'images/*'],
        }),
    ]
}