const faker = require('faker');

const generateUser = () => ({
  username: faker.internet.userName(),
  password: faker.internet.password()
});

exports.seed = (knex) => knex('users').insert(
  Array.from(Array(10), () => generateUser())
);
