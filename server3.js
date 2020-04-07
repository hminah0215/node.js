//서버가 되려면 http, express 외부모듈이 필요
var http = require("http");
var express = require("express");

//서버가 되려면 express객체를 생성
var app = express();

var items = [
  {name:"우유",  price:2000  },
  {name:"홍차",  price:5000  },
  {name:"커피",  price:4000  }
];

//미들웨어 설정
app.use(express.static("public"));
app.use(express.bodyParser());
app.use(app.router);

//몽고db에 만들어둔 member 컬렉션에 insert
app.get("/insertMember",function(request,response){
  var name = request.param("name");
  var age = request.param("age");
  var addr = request.param("addr");

  var doc = {name:name,age:age,addr:addr};
  console.log(doc);

    const MongoClient = require('mongodb').MongoClient;
    const assert = require('assert');

    // Connection URL
    const url = 'mongodb://localhost:27017';

    // Database Name
    const dbName = 'bit';

    // Create a new MongoClient
    const client = new MongoClient(url);

    // Use connect method to connect to the Server
    client.connect(function(err, client) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    const db = client.db(dbName);

    // Insert a single document
    db.collection('member').insertOne(doc, function(err, r) {
      // assert.equal(null, err);
      // assert.equal(1, r.insertedCount);
      client.close();
      // Insert multiple documents
      // db.collection('inserts').insertMany([{a:2}, {a:3}], function(err, r) {
      //   assert.equal(null, err);
      //   assert.equal(2, r.insertedCount);    
      //  });
      });
    });
  response.send(doc);
}); //inser끝


//몽고db에 만든 member와 연결
app.get("/member",function(request,response){
  //response.send("ok");
    const MongoClient = require('mongodb').MongoClient;
    const assert = require('assert');

    // Connection URL
    const url = 'mongodb://localhost:27017';

    // Database Name
    const dbName = 'bit';

    // Create a new MongoClient
    const client = new MongoClient(url);

    // Use connect method to connect to the Server
    client.connect(function(err, client) {
      assert.equal(null, err);
      console.log("Connected correctly to server");

      const db = client.db(dbName);

      const col = db.collection('member');

        //select 쿼리
        col.find().toArray(function(err, docs) {
          //assert.equal(null, err);
          client.close();

          //find한 결과 배열을 응답
          response.send(docs);
        });
    });
})

app.all("/data.html",function(request,response){
  var output ="";
  output += "<!DOCTYPE html>";
  output += "<html>";
  output += "<head>";
  output += "<title>Data html</title>";
  output += "<body>";
  items.forEach(function(item){
    output += "<div>";
    output += "<h1>"+item.name+"</h1>";
    output += "<h2>"+item.price+"</h2>";
    output += "</div>";
  });

  output += "</body>";
  output += "</head>";
  output += "</html>";
  response.send(output);
});

app.all("/data.json",function(request,response){
  response.send(items);
});

app.get("/products/:id",function(request, response){
  var id = Number(request.param("id"));
  if(isNaN(id)){  //숫자가 아닌가요?
    response.send({error:"숫자를 입력하세요."});
  }else if (items[id]) {
    response.send(items[id]);
  }else {
    response.send({error:"인덱스를 확인하세요."});
  }
  //response.send(items[id]);
});

app.post("/products",function(request,response){
  try{
    var name = request.param("name");
    var price = request.param("price");
    console.log("상품명: "+name);
    console.log("상품가격: "+price);
    var item = {name:name, price:price};
    items.push(item);

    response.send({message:"데이터를 추가했습니다.",
                   data:items});
  }catch(ex){
    console.log(ex);
  }
});

app.all("/data.xml",function(request,response){
  response.type("text/xml");
  var output = "";
  output += '<?xml version="1.0" encoding="UTF-8"?>';
  output += "<products>";
  items.forEach(function(item){
    output += "<product>";
    output += "<name>"+item.name+"</name>";
    output += "<price>"+item.price+"</price>";
    output += "</product>";
  });
  output += "</products>";
  response.send(output);
});

//createServer서버생성, 매개변수(익스프레스객체, listen)
http.createServer(app).listen(5273, function(){
  console.log("서버를 가동하였습니다.");
});
