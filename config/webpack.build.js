let baseConfig=require('./webpack.base')
const webpack=require('webpack')
let ExtractText = require('extract-text-webpack-plugin')
let UglifyPlugin = webpack.optimize.UglifyJsPlugin;
let DefinePlugin = webpack.DefinePlugin;
baseConfig.plugins.push(new UglifyPlugin())
baseConfig.plugins.push(new DefinePlugin({
    "process.env.NODE_ENV":'"production"'
}))
module.exports={
    ...baseConfig,
    externals:{
        'react':'React',
        'react-dom':'ReactDOM'
    }
}