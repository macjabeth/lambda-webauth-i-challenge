const debug = require('debug')('server:db');
const router = require('express').Router();
const userDB = require('../models/users');
const bcrypt = require('bcryptjs');

router.post('/', async ({ body: newUser }, res) => {
  try {
    newUser.password = bcrypt.hashSync(newUser.password, 4);
    const [user] = await userDB.add(newUser);
    res.status(201).json(user);
  } catch (error) {
    debug(error); res.status(500).json({
      error: 'Something went wrong; the user could not be created.'
    });
  }
});

module.exports = router;
