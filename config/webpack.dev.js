const webpack = require('webpack')
let baseConfig = require('./webpack.base')
let DefinePlugin = webpack.DefinePlugin;
baseConfig.plugins.push(new DefinePlugin({
    "process.env.NODE_ENV":JSON.parse(process.env.NODE_ENV)
}))
console.log(process.cwd())
module.exports = {
    ...baseConfig,
    devServer:{
        historyApiFallback: true,
        inline:true,
        open:true,
        port:3000,
        noInfo:true
    },
    devtool:"eval-source-map"
}