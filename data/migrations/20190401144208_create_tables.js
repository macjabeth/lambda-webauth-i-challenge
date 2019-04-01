exports.up = function(knex) {
  return knex.schema
    .createTable('users', (table) => {
      table.increments();
      table.string('username', 35).notNullable().unique();
      table.string('password', 128).notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('users');
};
