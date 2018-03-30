const jwt = require('jsonwebtoken')
const http = require('http');
const querystring = require('querystring')
const fs = require('fs')
const Mock = require('mockjs')
const _ = require('lodash')
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

module.exports = function (app) {

    //商品列表的接口
    app.post('/mall/index/getGoodsChannel', function (req, res) {
        queryApi('/mall/index/getGoodsChannel',"post",req.body)
        .then((data)=>{
            res.end(data)
        })
    })

    //注册接口
    app.post('/user/register', function (req, res) {
        let user = fs.readFileSync('user.json', { encoding: "utf-8" });
        user = JSON.parse(user);
        user.push(req.body);
        fs.writeFile('user.json', JSON.stringify(user), function () {
            res.end(JSON.stringify({
                "success": 1,
                "info": "register success"
            }))
        })
    })

    //login api
    app.post('/user/login', function (req, res) {
        let user = fs.readFileSync(__dirname + '/user.json', { encoding: "utf-8" });
        user = JSON.parse(user);
        let login = req.body;
        let resInfo = {
            success: 0,
            info: "用户名或密码错误",
            token: ''
        }
        user.forEach(usr => {
            if (usr.username == login.username && usr.password == login.password) {
                resInfo.success = 1;
                resInfo.info = "login success";
                resInfo.user ={
                    name:usr.username,
                    time:new Date().toLocaleTimeString(),
                    nickName:"Jacky"
                }
            }
        });

        if (resInfo.success == 1) {
            resInfo.token = jwt.sign(login, "1511", {
                expiresIn: 60*60
            })
        }

        res.end(JSON.stringify(resInfo))

    })

    //添加购物车
    app.post('/user/Cart/addCart', function (req, res) {
        jwt.verify(req.body.token, "1511", (err, decoded) => {
            if (err) {
                res.end(JSON.stringify({
                    info: "登录过期，请重新登陆",
                    detail: err.TokenExpiredError
                }))
            } else {
                let cartInfo = JSON.parse(fs.readFileSync(__dirname + '/cart_info.json', { encoding: 'utf-8' }));
                if (cartInfo[decoded.username]) {
                    let recordList = cartInfo[decoded.username];
                    let flag=false;//新加商品
                    recordList.forEach((item,index)=>{
                        if(item.goods_id==req.body.goods_info.goods_id){
                            ++item.count;
                            flag=true;//重复商品
                        }
                    })
                    if(!flag){
                        let record = req.body.goods_info;
                        record.count=1;
                        record.selected=0;
                        cartInfo[decoded.username].push(record)
                    }
                } else {
                    let record = req.body.goods_info;
                    record.count=1;
                    record.selected=0;
                    cartInfo[decoded.username] = [record]
                }
                fs.writeFile(__dirname + '/cart_info.json', JSON.stringify(cartInfo), function () {
                    res.end("1")
                })
            }
        })
    })

    //分类接口
    app.get('/mobile/Category/categorySon', function (req, res) {
        //let tbdata='https://acs.m.taobao.com/h5/mtop.relationrecommend.wirelessrecommend.recommend/2.0/?appKey=12574478&t=1521182790409&sign=a086d7ced93e708ea17093dfbd7db4d2&api=mtop.relationrecommend.WirelessRecommend.recommend&v=2.0&type=jsonp&dataType=jsonp&callback=mtopjsonp2&data=%7B%22appId%22%3A%223113%22%2C%22vm%22%3A%22nw%22%2C%22params%22%3A%22%7B%5C%22industry%5C%22%3A%5C%2224%5C%22%2C%5C%22catmap_version%5C%22%3A%5C%222.0%5C%22%7D%22%2C%22nxtype%22%3A%22h5%22%7D'
        
        res.json(1)
        
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

    //删除购物车指定商品
    app.post('/user/Cart/delGoods',function(req,res){
        
        let cartRecord = JSON.parse(fs.readFileSync('./cart_info.json',{encoding:'utf-8'}))
        jwt.verify(req.body.token,'1511',function(err,decoded){
            if(err){
                res.json(err)
            }else{
                let cartList = cartRecord[decoded.username];

                let delGoods = _.remove(cartList,function(item){
                    return req.body.selectedID.indexOf(item.goods_id)>-1
                })

                cartRecord[decoded.username] = cartList;
                fs.writeFile(__dirname + '/cart_info.json', JSON.stringify(cartRecord), function () {
                    setTimeout(()=>{
                        res.json({
                            success:1,
                            info:'删除成功',
                            delGoods: delGoods,
                            leftGoods:cartList
                        })
                    },2000)
                })
            }
        })
    })

    //新加邮寄地址
    app.post('/user/Mail/addNew',function(req,res){

        jwt.verify(req.body.token,'1511',function(err,decoded){
            if(err){
                res.json(err)
            }else{
                let usr = decoded.username;
                let delivery = JSON.parse(fs.readFileSync('./delivery.json',{encoding:'utf-8'}))
                delete req.body.token;
                if(delivery[usr]){
                    delivery[usr].push(req.body)
                }else{
                    delivery[usr] = [req.body]
                }
                fs.writeFile('./delivery.json',JSON.stringify(delivery),function(err){
                    if(err){
                        res.json(err)
                    }else{
                        res.json({
                            success:'1',
                            info:'地址添加成功'
                        })
                    }
                    
                })
                
            }
        })
        
    })

    //获取邮寄地址列表
    app.post('/user/Mail/list',function(req,res){
        jwt.verify(req.body.token,'1511',function(err,decoded){
            if(err){
                res.json(err)
            }else{
                let list = JSON.parse(fs.readFileSync('./delivery.json',{encoding:'utf-8'}))
                setTimeout(()=>{
                    res.json(list[decoded.username])
                },1500)

            }
        })
        
    })


    //删除邮寄地址列表
    app.post('/user/Mail/deletelist',function(req,res){
        jwt.verify(req.body.token,'1511',function(err,decoded){
            if(err){
                res.json(err)
            }else{
                let deliveryList = JSON.parse(fs.readFileSync('./delivery.json',{encoding:'utf-8'}));
                let list = deliveryList[decoded.username]
                list.splice(req.body.index,1);
                deliveryList[decoded.username] = list;

                fs.writeFile(__dirname + '/delivery.json', JSON.stringify(deliveryList), function () {
                    setTimeout(()=>{
                        res.json({
                            success:1,
                            info:'删除成功',
                            leftList:list
                        })
                    },2000)
                })

            }
        })
        
    })
    //编辑邮寄地址列表
    app.post('/user/Mail/editlist',function(req,res){
        jwt.verify(req.body.token,'1511',function(err,decoded){
            if(err){
                res.json(err)
            }else{
                let list = JSON.parse(fs.readFileSync('./delivery.json',{encoding:'utf-8'}))[decoded.username]
                setTimeout(()=>{
                    res.json(list[req.body.index])
                },1500)
            }
        })
        
    })

    //地址管理省市区数据
    app.get('/user/Mail/pcr',function(req,res){
        let pcrData = fs.readFileSync('./pcr.json',{encoding:'utf-8'})
        setTimeout(()=>{
            res.end(pcrData)

        },2000)
    })

}

