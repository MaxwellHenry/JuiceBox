/// CRUD Web Server

///          HTTP         SQL
/// Create   ---> POST   ---> INSERT
/// Retrieve ---> GET    ---> SELECT
/// Update   ---> PUT    ---> UPDATE
/// Delete   ---> DELETE ---> DELETE

require('dotenv').config();

const PORT = 3000;
const { response } = require('express');
const express = require('express');
const server = express();



const bodyParser = require('body-parser');
server.use(bodyParser.json());

const morgan = require('morgan');
server.use(morgan('dev'));

const { client } = require('./db');
client.connect();

const apiRouter = require('./api');
server.use('/api', apiRouter);

server.use((request, response, next) => {
    console.log("<____Body Logger START____>");
    console.log(request.body);
    console.log("<_____Body Logger END_____>");
  
    next();
});



server.get ('/', (require, response, next) => {
    response.send("hElLo WoRLd?")
});

server.use('/api', (req, res, next) => {
    console.log("A request was made to /api");
    next();
});
  
server.get('/api', (req, res, next) => {
    console.log("A get request was made to /api");
    res.send({ message: "success" });
});

server.listen(PORT, () => {
  console.log('The server is up on port', PORT)
});

