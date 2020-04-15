// npm init -y
// npm start
// npm install express
// npm install -D nodemon (depois troca no arq package.json para nodemon)
// npm start novamente
// npm install nunjucks
// install njk template (extensions)

const express = require('express');
const nunjucks = require('nunjucks');
const routes = require('./routes');


const server = express();

server.use(express.static('public')); // css
server.use(routes);

server.set("view engine", "njk"); // para nao ter que colocar index.html

nunjucks.configure("views", {
  express:server,
  autoescape: false,
  noCache: true
})

server.listen(5000, function(){
  console.log('server is running');
})