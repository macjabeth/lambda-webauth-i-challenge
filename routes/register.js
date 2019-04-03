const Joi = require('joi');
const debug = require('debug')('server:db');
const router = require('express').Router();
const userDB = require('../models/users');
const bcrypt = require('bcryptjs');

const schema = Joi.object().keys({
  username: Joi.string().max(35).required(),
  password: Joi.string().max(128).required()
});

router.post('/', async ({ body: newUser }, res) => {
  const { error } = Joi.validate(newUser, schema);
  if (error) return res.status(400).json({
    error: error.details[0].message
  });

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
