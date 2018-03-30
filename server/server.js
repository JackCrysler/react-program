const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const api = require('./api')

app.use(bodyParser.json())

//设置跨域 cors
app.all('*',function(req,res,next){
    res.header("Access-Control-Allow-Origin","http://localhost:3000")
    res.header("Access-Control-Allow-Headers","Content-Type,Token")
    res.header('Content-Type',"application/json;charset=utf-8")
    next()
})
//启动后端接口
api(app)

app.listen(9000,function(){
    console.log('server listen 9000')
})

