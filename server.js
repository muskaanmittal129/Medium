const express = require('express');
const bodyParser = require('body-parser');

const loginRoutes = require('./routes/login');

const app = express();

app.use(bodyParser.json());

app.use(loginRoutes);

app.listen(4200);