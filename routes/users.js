const debug = require('debug')('server:db');
const router = require('express').Router();
const userDB = require('../models/users');
const auth = require('../api/auth');

router.get('/', auth.restricted, async (req, res) => {
  try {
    const users = await userDB.find();
    res.status(200).json(users);
  } catch (error) {
    debug(error); res.status(500).json({
      error: 'Something went wrong; the users could not be retrieved.'
    });
  }
});

module.exports = router;
