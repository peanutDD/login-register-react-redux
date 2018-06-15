/* jshint esversion: 6 */

import express from 'express';
import bodyParser from 'body-parser'

import users from './routers/users';
import auth from './routers/auth';
import events from './routers/events';

let app = express();

app.use(bodyParser.json())

app.use('/api/user', users)
app.use('/api/auth', auth)
app.use('/api/events', events)

app.get('/', (req, res) => {
  res.send('hello world!');
});

app.listen(6060, () => console.log('running on localhost:6060'));