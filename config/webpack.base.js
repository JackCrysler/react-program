
//dev: 起服务，不用进行压缩
//build: 不用其服务，要进行压缩，代码分离
let path = require('path')

let dir = process.cwd()//获取当前程序运行的目录
console.log(process.env.NODE_ENV)

let baseConfig={//commonjs规范
    entry:{
        "bundle":dir+'/src/main'
    },
    output:{
        "path":dir+"/dist",
        "filename":"[name].js",
        "chunkFilename":"[name].bundle.js",
        publicPath: "/"
    },
    module:{
        rules:[
            {
                test:/\.(js|jsx)$/,
                use:['babel-loader']
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test:/\.scss$/,
                use:['style-loader','css-loader','sass-loader']
            },
            {
                test:/\.less$/,
                use:['style-loader','css-loader','less-loader']
            },
            {
                test:/.(eot|svg|ttf|woff)$/,
                use:['url-loader']
            },
            {
                test:/.(jpg|png|gif|jpeg)$/,
                use:[
                    {
                      loader: 'url-loader',
                      options: {
                        limit: 8192,
                        name: '[path][name].[ext]?[hash]'
                      }
                    }
                  ]
            }
        ]
    },
    plugins:[],   
    resolve:{
        extensions:['.js','.jsx']
    }
}

module.exports=baseConfig
