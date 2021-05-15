/// CRUD Web Server

///          HTTP         SQL
/// Create   ---> POST   ---> INSERT
/// Retrieve ---> GET    ---> SELECT
/// Update   ---> PUT    ---> UPDATE
/// Delete   ---> DELETE ---> DELETE


const { PORT = 3000 } = process.env;
const express = require("express");
const server = express();
server.use(express.json());
const morgan = require("morgan");
server.use(morgan("dev"));
require("dotenv").config();
const dino = `               __
              /  )
     _.----._/ /
    /         /
 __/ (  | (  |
/__.-'|_|--|_|
Dont Mess with Codeasaurus
`;

server.use((req, res, next) => {
  const now = Date.now();
  req.timeOfRequest = now;
  console.log("<____Body Logger START____>");
  console.log(req.body);
  console.log("<_____Body Logger END_____>");

  next();
}); 

const apiRouter = require("./api");
server.use("/api", apiRouter);

const { client } = require("./db");
client.connect();

server.listen(PORT, () => {
  console.log("The server is up on port", PORT);
  console.log(dino);
});

server.get('/add/:first/to/:second', (req, res, next) => {
  res.send(`<h1>${ req.params.first } + ${ req.params.second } = ${
    Number(req.params.first) + Number(req.params.second)
   }</h1>`);
});


// require('dotenv').config();

// const PORT = 3000;
// const express = require('express');
// const server = express();


// const { response } = require('express');



// const bodyParser = require('body-parser');
// server.use(bodyParser.json());

// const morgan = require('morgan');
// server.use(morgan('dev'));

// const { client } = require('./db');
// client.connect();

// const apiRouter = require('./api');
// server.use('/api', apiRouter);

// server.use((request, response, next) => {
//     console.log("<____Body Logger START____>");
//     console.log(request.body);
//     console.log("<_____Body Logger END_____>");
  
//     next();
// });



// server.get ('/', (require, response, next) => {
//     response.send("hElLo WoRLd?")
// });

// server.use('/api', (req, res, next) => {
//     console.log("A request was made to /api");
//     next();
// });
  
// server.get('/api', (req, res, next) => {
//     console.log("A get request was made to /api");
//     res.send({ message: "success" });
// });

// server.listen(PORT, () => {
//   console.log('The server is up on port', PORT)
// });


