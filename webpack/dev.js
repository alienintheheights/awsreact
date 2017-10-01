'use strict'

const webpack = require('webpack');
const Merge = require('webpack-merge');
const DashboardPlugin = require('webpack-dashboard/plugin');

let makeWebpackConfig = require('./makeConfig');

module.exports = Merge(makeWebpackConfig, {
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        host: 'localhost',
        port: 8080,
        compress: true,
        historyApiFallback: true,
        // respond to 404s with index.html
        watchOptions: {
            ignored: /node_modules/
        },
        hot: true,
        open: true
    },
    plugins: [
        // webpack-dev-server enhancement plugins
        new DashboardPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        // do not emit compiled assets that include errors
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ]
});

