var express = require("express");
var bodyParser = require("body-parser");

var app = express();

var urlencodedParser = bodyParser.urlencoded({extended: false});
var jsonParser = bodyParser.json();

app.use(express.static("./public"));

app.post("/register", urlencodedParser, (request, response) => {

  if(!request.body) return response.sendStatus(400);

  console.log(request.body);
  response.send(`${request.body.userName} - ${request.body.userAge}`);
});

app.post("/user", jsonParser, (request, response) => {
  if(!request.body) return response,sendStatus(400);

  console.log(request.body);
  response.json(`${request.body.userName} - ${request.body.userAge}`);
});

app.get("/", (request, response) => {

  response.send("<h1>Main page</h1>");
});

app.listen(8000);
