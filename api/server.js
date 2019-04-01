const debug = require('debug')('server:log');
const compression = require('compression');
const helmet = require('helmet');
const express = require('express');
const auth = require('./auth');
const server = express();

// Middleware
server.use(express.json());
server.use(compression());
server.use(helmet());
server.use((req, res, next) => {
  res.on('finish', () =>
    debug(`${req.method} ${req.originalUrl} - ${res.statusCode} [${res.statusMessage}]`));
  next();
});

// Routes
server.use('/api/register', require('../routes/register'));
server.use('/api/login', require('../routes/login'));
server.use('/api/users', require('../routes/users'));
server.use('/api/restricted/*', auth.restricted);

server.use('/api', (req, res) => {
  res.status(418).json({ message: "It's working! It's working!!!" });
});

module.exports = server;
