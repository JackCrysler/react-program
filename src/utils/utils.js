function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

//获取cookie
export function getCookie(name) {
    let cookieStr = document.cookie;
    if (cookieStr.length == 0) return;
    let arr;
    let res = null;
    if (cookieStr.indexOf(';') > -1) {
        arr = cookieStr.split('; ');
        arr.forEach((cookie, index) => {
            let tmp_arr = cookie.split('=');
            if (tmp_arr[0] == name) {
                res = tmp_arr[1]
            }
        })
    } else {
        let tmp_arr = cookieStr.split('=');
        if (tmp_arr[0] == name) {
            res = tmp_arr[1]
        }
    }
    return res
}
//登出，前端删除token
export function loginout(){
    let t = new Date();
    t.setTime(t.getTime()-1);
    document.cookie="token="+getCookie('token')+'; expires='+t.toUTCString();
}

/**
 * //同源策略：1.协议相同 2.域名相同 3:端口号相同
 * //基于fetch封装的请求方法，支持get和post
 * @argument get
 * @argument post
 */
//线上域名
let domin='http://www.lb717.com'

//开发环境服务器的域名
if(process.env.NODE_ENV=='development'){
    domin = 'http://localhost:9000' 
}
//测试服务器的域名
if(process.env.NODE_ENV=='production'){
    domin = 'http://localhost:8000' 
}

export let $http={
    get(url,data){
        if(data){
            if(Object.prototype.toString.call(data)!="[object Object]"){
                return {
                    then(callback){
                        callback('GET请求入参格式不正确，需要传OBJECT');
                        return {
                            catch(err){
                                err(new Error('入参格式不正确'))
                            }
                        }
                    }
                };
            }
            let queryString="?"
            for(let i in data){
                queryString+=(i+"="+data[i]+"&")
            }
            url = encodeURI(url+queryString.slice(0,-1));
    
        }
        
        return fetch(domin+url,{
            headers:{
                "Content-Type":"application/json;charset=utf-8"
            }
        }).then(res=>res.json())
    },
    post(url,data){
        if(Object.prototype.toString.call(data)!="[object Object]"){
            return {
                then(callback){
                    callback('GET请求入参格式不正确，需要传OBJECT');
                    return {
                        catch(err){
                            err(new Error('入参格式不正确'))
                        }
                    }
                }
            };
        }
        
        return fetch(domin+url,{
            body:JSON.stringify(data), //字符串
            headers:{
                "Content-Type":"application/json;charset=utf-8",
                "Token":"123213"
            },
            method:"POST"
        }).then(res=>res.json())
    },
    jsonp(url,callbackName){
        return new Promise((resolve,reject)=>{
            window[callbackName]=function(data){
                resolve(data)
            }
            let script = document.createElement('script')
            let body = document.body;
            script.src=url
            body.appendChild(script);
        })
    }
}


