# 此目录存放工具类的方法

    1. query-api(基于fetch请求)，向下兼容

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "auth,Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", ' 3.2.1');
        res.header("Content-Type", "application/json;charset=utf-8");