var http = require('http');
var url=require('url');
http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;
    var content = '';
    var opt = {
         host:'119.253.81.191',
         port:'80',
         method:'GET',
         path:pathname,
    };
    var req = http.request(opt, function(res) {
        res.on('data',function(body){
            console.log('return');
            content+=body;
        }).on("end", function () {
            response.writeHead(200, {'Content-Type': 'text/html;charset=gbk'});
            response.write(content);
            response.end();
        });
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });
    req.end();
}).listen(8061);//监听端口80,将80端口的请求转发到news.163.com
console.log("Server runing at port: " + 8061 + ".");