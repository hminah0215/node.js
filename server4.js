var http = require("http");
var express = require("express");
var app = express();

app.use(express.static("public"));

//동적 라우터 미들웨어
app.use(app.router);

//id가 파라메터로 가져올 변수?가 된다고 함
app.all("/wiki/:id",function(request,response){
  var id = request.param("id");
  response.send("<h1>"+id+"</h1>")
});

http.createServer(app).listen(5273, function(){
  console.log("서버를 가동했습니다.");
})
