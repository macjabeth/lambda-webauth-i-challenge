const session = require('express-session');
const KSS = require('connect-session-knex')(session);
const configuredKnex = require('../data/db');

module.exports = {
  name: 'monster',
  secret: 'How should I feel? Creatures lie here, looking through my window!',
  cookie: {
    maxAge: 10 * 60 * 1000, // milliseconds (ten minutes)
    secure: false, // use cookie over https
    httpOnly: true // false means JS can access the cookie on the client
  },
  resave: false, // avoid recreating unchanged sessions
  saveUninitialized: false, // GDPR compliance
  store: new KSS({
    knex: configuredKnex,
    createtable: true,
    clearInterval: 30 * 60 * 1000 // delete expired sessions
  })
}
