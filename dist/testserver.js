let express = require('express')
let app = express()
let ejs = require('ejs')
let http = require('http')
let jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
let querystring = require('querystring')
app.use(bodyParser.json())
app.engine('html', ejs.renderFile);
app.use('/', express.static(process.cwd()));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.all('*',function(req,res,next){
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Headers","Content-Type,Token")
    res.header('Content-Type',"application/json;charset=utf-8")
    next()
})

app.get('/',function(req,res){
    res.setHeader('Content-Type', 'text/html');
    res.render('index',{title:"Hello World"},function(err,html){
        if(err){
            console.log(err)
        } else{
            res.end(html)
        }
    })
})
app.get('/index/*',function(req,res){
    res.redirect('/')
})


    //登录过后获取购物车的商品记录
    app.post('/user/Cart/goodsList',function(req,res){

        jwt.verify(req.body.token, "1511", (err, decoded) => {
            if (err) {
                res.end(JSON.stringify({
                    info: "登录过期，请重新登陆",
                    detail: err.TokenExpiredError,
                    error:1
                }))
            }else{
                try{
                    let goodsRecord = JSON.parse(fs.readFileSync('./cart_info.json', { encoding: "utf-8" }))
                    let goodsList = goodsRecord[decoded.username] || [];
                    setTimeout(()=>{res.json(goodsList)},1500)
                    
                }
                catch(error){
                    res.json(error)
                }
                
            }
        })
            
        
    })


app.post('/mall/index/getGoodsChannel', function (req, res) {
    queryApi('/mall/index/getGoodsChannel',"post",req.body)
    .then((data)=>{
        res.end(data)
    })
})


app.listen(8000,function(){
    console.log('server listen at 8000')
})

function queryApi(url,methods,params){

    return new Promise((resolve,reject)=>{
        let data = ''
        const options = {
            hostname: 'www.lb717.com',
            port: 80,
            path: url,
            method: methods,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        };
    
        let request = http.request(options, (response) => {
            response.setEncoding('utf8');
            response.on('data', (chunk) => {
                data += chunk
            });
            response.on('end', () => {
                resolve(JSON.stringify(data))
            });
        })
        if(methods.toLowerCase()=='post'){
            request.write(querystring.stringify(params))
        }
        
        request.end()
    })
    

}
