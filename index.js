require('dotenv').config();

const debug = require('debug')('server:init');
const server = require('./api/server');

const port = process.env.PORT || 3000;
server.listen(port, () => debug(`Listening {${port}}`));
