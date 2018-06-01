// var http = require('http')
// var fs = require('fs')
// var url = require('url')
// const path = require('path');
// // create serve
// http.createServer( function (req, res){
//   解析请求，包括文件名
//   var pathname = url.parse(request.url).pathname;
//   // 输出请求的文件名
//   console.log("Request for " + pathname + " received.");
//   // 从文件系统中读取请求的文件内容
//   fs.readFile(pathname.substr(1), function (err, data) {
//      if (err) {
//         console.log(err);
//         // HTTP 状态码: 404 : NOT FOUND
//         // Content Type: text/plain
//         response.writeHead(404, {'Content-Type': 'text/html'});
//      }else{             
//         // HTTP 状态码: 200 : OK
//         // Content Type: text/plain
//         response.writeHead(200, {'Content-Type': 'text/html'});    
        
//         // 响应文件内容
//         response.write(data.toString());        
//      }
//      //  发送响应数据
//      response.end();
//   });
// }).listen(8096)
// console.log('Server running at http://localhost:8096/')
var http = require("http")  
var fs = require("fs")  
http.createServer(function(req,res){ 
  var path1 = req.url;
  if(path1 == "/tkphysical/"){  
    path1 = "/tkphysical/index.html";  
  } 
  path = process.cwd()+path1;
  var type = path.substr(path.lastIndexOf(".")+1,path.length)
  let conType = 'text/'+type+'; charset=utf-8'
  if (path.indexOf('operation')>-1) {
    var options = {
      host: '119.253.81.191',
      port: 80,
      path: path1,
      method: req.method,
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    }
    // var sreq = http.request(options, function (req1, res1) {
    //   req1.pipe(req)
    //   console.log(req1.url)
    //   req1.on('end', function(){
    //     console.log('done');
    //   });
    //   sreq.end();
    // })
    let content = ''
    var req = http.request(options, function(res1) {
        res1.on('data',function(body){
          content+=body;
        }).on("end", function () {
          res.writeHead(200, {'Content-Type': 'application/json;charset=UTF-8'});
          res.write(content);
          res.end();
        });
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });
    req.end();
  }
  else if ( type==="map" || type==="ico") {
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.end();
    console.log('404 ')
  }
  else {
    if (type === 'png' || type === 'jpg' || type==="map"){
      conType = 'image/'+type
      //设置请求的返回头type,content的type类型列表见上面
      res.setHeader("Content-Type", conType);
      //格式必须为 binary 否则会出错
      fs.readFile(path, "binary", function (err, data) {
        if (err) {
          console.log('We cannot open "index.htm" file.')
        }
        res.writeHead(200, "Ok");
        res.write(data,"binary"); //格式必须为 binary，否则会出错
        res.end();
      })
    } else if (type === 'js' || type === 'css' ){
      fs.readFile(path, 'utf-8', (err, content) => {
        if (err) {
          console.log('We cannot open "index.htm" file.')
        }
        res.writeHead(200, {
          'Content-Type': conType
        })
        res.write(content)  
        res.end()
      })
    } else{
      fs.readFile('tkphysical/index.html', 'utf-8', (err, content) => {
        if (err) {
          console.log('We cannot open "index.htm" file.')
        }
        res.writeHead(200, {
          'Content-Type': 'text/html; charset=utf-8'
        })
        res.end(content)
      })
    }
  }
}).listen(8096)  
console.log('run in 8096')