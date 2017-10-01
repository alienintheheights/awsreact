'use strict'

const webpack = require('webpack');
const Merge = require('webpack-merge');
const path = require('path');
let makeWebpackConfig = require('./makeConfig');

module.exports = Merge(makeWebpackConfig, {
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
});