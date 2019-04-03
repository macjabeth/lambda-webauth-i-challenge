const casual = require('casual');
const bcrypt = require('bcryptjs');

const generateUser = () => ({
  username: casual.username,
  password: bcrypt.hashSync(casual.password, 4)
});

exports.seed = (knex) => knex('users').insert(
  Array.from(Array(10), () => generateUser())
);
