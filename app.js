const express = require('express');
const app = express();
// const pokemonesRoutes = require('./routes')

app.use(express.json())
// app.use('/pokemon', pokemonesRoutes)


module.exports = app;