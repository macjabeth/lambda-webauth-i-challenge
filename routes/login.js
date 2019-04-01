const debug = require('debug')('server:db');
const router = require('express').Router();
const userDB = require('../models/users');
const bcrypt = require('bcryptjs');

router.post('/', async ({ body: { username, password } }, res) => {
  try {
    const [user] = await userDB.findBy({ username });
    user && bcrypt.compareSync(password, user.password)
      ? res.status(200).json({ message: 'Logged In' })
      : res.status(401).json({ message: 'Invalid Credentials' });
  } catch (error) {
    debug(error); res.status(500).json({
      error: 'Something went wrong; the login could not be completed.'
    });
  }
});

module.exports = router;
