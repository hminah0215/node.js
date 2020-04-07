var http = require("http");
var express = require("express");
var app = express();

app.use(express.static("public"));

app.use(function(request, response){
  response.send("<h1>안녕하세요</h1>");
})

http.createServer(app).listen(5273, function(){
  console.log("서버를 가동했습니다.");
})
