const express = require('express');
const fileUpload = require('express-fileupload');
const http = require('http');
const bodyParser = require('body-parser');
const controller = require('./controllers/create-user');

var app = express();
app.use(bodyParser.json());
var port = process.env.PORT || 8080;
var server = http.createServer(app);


server.listen(port,() => {
  console.log(`server is up on http://localhost:${port}`);
  console.error('press CTRL+C to exit');
});
app.use(fileUpload());
app.get('/',(req,res) => {
  controller.getUsers(req,res);
});

app.post('/create-user', (reqq,res) => {
  controller.createUsers(reqq,res);
});
