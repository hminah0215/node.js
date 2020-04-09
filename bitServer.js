//1번,서버가 되려면 필요함
var http = require("http");
var express = require("express");

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';
const dbName = 'bit';

var app = express();

//3번,스테이틱 미들웨어 설정
app.use(express.static("public"));
//4번, 사용자로부터 파라메터를 받아 처리 할 수 있도록bodyParser사용
//위치가 중요!!!  라우터가 오기전에 써야함
app.use(express.bodyParser());
app.use(app.router);  //3번

app.get("/blogList", function(request, response){
  const client = new MongoClient(url);
  client.connect(function(err, client) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
    const db = client.db(dbName);
    const col = db.collection('articles');
        col.find({}).toArray(function(err, docs) {
        client.close();
        response.send(docs);
      });
  });
});

app.all("/blogInsert", function(request,respone){
  var title = request.param("title");
   var content = request.param("content");
   var saved_at = new Date();
   var doc = {title:title, content:content, saved_at:saved_at};

     const client = new MongoClient(url);
     client.connect(function(err, client) {
     const db = client.db(dbName);
     db.collection('articles').insertOne(doc, function(err, r) {
       _id = r.insertedId;
       client.close();
       respone.send(_id);
     });
   });
 });


//2번,서버생성
http.createServer(app).listen(52273,function(){
  console.log("서버가 가동되었습니다 :>");
});
