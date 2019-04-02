const Joi = require('joi');
const debug = require('debug')('server:db');
const router = require('express').Router();
const userDB = require('../models/users');
const bcrypt = require('bcryptjs');

const schema = Joi.object().keys({
  username: Joi.string().max(35).required(),
  password: Joi.string().max(128).required()
});

router.post('/register', async ({ body: newUser }, res) => {
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

router.post('/login', async (req, res) => {
  const { body: creds } = req;
  const { error } = Joi.validate(creds, schema);
  if (error) return res.status(400).json({
    error: error.details[0].message
  });

  try {
    const { username, password } = creds;
    const [user] = await userDB.findBy({ username });
    if (user && bcrypt.compareSync(password, user.password)) {
      req.session.user = user;
      res.status(200).json({ message: `Welcome ${user.username}` });
    } else {
      res.status(401).json({ message: 'Invalid Credentials' });
    }
  } catch (error) {
    debug(error); res.status(500).json({
      error: 'Something went wrong; the login could not be completed.'
    });
  }
});

router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        debug(err);
        res.status(500).json({
          message: "No, you can't leave."
        });
      } else {
        res.status(200).json({ message: "You'll be missed." })
      }
    });
  } else {
    res.status(200).json({ message: "You'll be missed." });
  }
});

module.exports = router;
