const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

const routes = require('./routes');

const { DB_CONNECTION_URI, PORT } = process.env;

mongoose.connect(DB_CONNECTION_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use((request, response, next) => {
  request.io = io;
  return next();
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on port ${PORT}`);
});
