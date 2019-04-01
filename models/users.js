const db = require('../data/db');

module.exports = {
  find: () => db('users'),

  findBy: (filter) => db('users').where(filter),

  findById: (id) => db('users').where({ id }),

  add: async function(user) {
    const [id] = await db('users').insert(user);
    return this.findById(id);
  }
}
