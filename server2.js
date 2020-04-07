var http = require("http");
var express = require("express");

var app = express();

//정적인 문서를 여기(public)에 두겠습니다.
app.use(express.static("public"));
app.use(app.router);

//list를 요청하면 글 목록보기 응답
app.all("/list",function(request,response){
  response.send("<h1>글 목록보기</h1>");
})

app.all("/write",function(request,response){
  response.send("<h1>글 작성하기</h1>");
})

app.all("/update",function(request,response){
  response.send("<h1>글 수정하기</h1>");
})

//서버를 가동, 5273은 포트번호
http.createServer(app).listen(5273, function(){
  console.log("서버를 가동하였습니다.");
});
