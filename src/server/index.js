const dotenv = require('dotenv');
const http = require('http');
const httpContext = require('express-http-context');
const express = require('express');
const bodyParser = require('body-parser');

dotenv.config();
//Routes
const routes = require('./router');

const config = require('../../config');

const app = express();
const server = http.createServer(app);

app
  .use(express.urlencoded({ extended: false }))
  .use(express.json())
  .use(httpContext.middleware)
  .use('/', routes)
  .listen(config.server.port, () =>
    console.log({ message: `Server ᕕ(ಠ‿ಠ)ᕗ in the port ${config.server.port}` }),
  );

server.on('error', () => console.log({ error: 'algo salio mal' }));
