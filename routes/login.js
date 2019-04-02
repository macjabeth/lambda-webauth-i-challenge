const Joi = require('joi');
const debug = require('debug')('server:db');
const router = require('express').Router();
const userDB = require('../models/users');
const bcrypt = require('bcryptjs');

const schema = Joi.object().keys({
  username: Joi.string().max(35).required(),
  password: Joi.string().max(128).required()
});

router.post('/', async ({ body: creds }, res) => {
  const { error } = Joi.validate(creds, schema);
  if (error) return res.status(400).json({
    error: error.details[0].message
  });

  try {
    const { username, password } = creds;
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
