const path = require('path');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const { VueLoaderPlugin } = require('vue-loader')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

module.exports = {
    mode: 'development',
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
        ],
    },
    optimization: {
        minimize: true,
    },
    resolve: {
        extensions: ['*', '.js', '.vue'],
        modules: ['node_modules'],
        alias: { vue: 'vue/dist/vue.esm.js' }
    },
    devServer: {
        disableHostCheck: true,
        host: '127.0.0.1',
        port: 3000,
        publicPath: '/hmr/',
        filename: 'app.js'
    },
    output: {
        filename: 'app.js',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin(),
        new VuetifyLoaderPlugin(),
    ]
}