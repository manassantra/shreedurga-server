const express = require('express');
const userApi = express();
const {     
         login,
         signup
                 } = require('../controllers/authController');


userApi.post('/signup', signup);
userApi.post('/login', login);


module.exports = userApi;