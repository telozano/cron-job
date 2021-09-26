const express = require('express')
const api = express.Router();
const auth = require('../middelware/auth')

const marvelController = require('../controllers/marvel.controller');


module.exports = api