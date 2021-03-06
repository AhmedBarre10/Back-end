const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const classes = require('../users/classes');

const server = express();

const corsConfig = {
  credentials: true
};

server.use(helmet());
server.use(cors(corsConfig));
server.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
server.use(express.json());

server.use('/api/auth', [logger, authRouter]);
server.use('/api/classes', authenticate, [logger, classes]);

server.get('/', (req, res) => {
  res.json({ server: 'online' });
});

function logger(req, res, next) {
  console.log(req.method, req.url, Date.now());
  next();
}

module.exports = server;