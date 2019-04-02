const casual = require('casual');

const generateUser = () => ({
  username: casual.username,
  password: casual.password
});

exports.seed = (knex) => knex('users').insert(
  Array.from(Array(10), () => generateUser())
);
