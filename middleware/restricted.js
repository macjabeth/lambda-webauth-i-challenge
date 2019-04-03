const debug = require('debug')('server:mw');

module.exports = (req, res, next) => {
  try {
    if (req.session && req.session.user) {
      next();
    } else {
      res.status(401).json({ message: 'Invalid Credentials' });
    }
  } catch (error) {
    debug(error); res.status(500).json({
      message: 'Something went wrong; authentication could not be completed.'
    });
  }
};
