const debug = require('debug')('server:db');
const userDB = require('../models/users');
const bcrypt = require('bcryptjs');

module.exports = {
  restricted: async (req, res, next) => {
    const { username, password } = req.headers;

    if (username && password) {
      try {
        const [user] = await userDB.findBy({ username });
        user && bcrypt.compareSync(password, user.password)
          ? next()
          : res.status(401).json({ message: 'You shall not pass!' })
      } catch (error) {
        debug(error); res.status(500).json({
          error: 'Something went wrong; authentication could not be completed.'
        });
      }
    } else {
      res.status(401).json({ message: 'Please provide credentials.' });
    }
  }
}
