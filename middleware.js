var connect = require('connect'),
    http = require('http');

var app = connect().use(test)
    .use(access)
    .use(test);

function access(req,res,next){
    var now = new Date().getHours();
    if(now <13 || now >21){
        res.writeHead(503,{'Content-Type':'text/plain'});
        res.end('下午1点到6点之外禁止访问！');
    }else{
        next();
    }
}

function test(req,res){
    res.writeHead(200,{'Connect-Type':'text/plain'});
    res.end('this is test page');
}

http.Server(app).listen(3000);