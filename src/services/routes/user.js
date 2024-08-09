
const express = require('express');
const { socialAuth } = require('../controllers/user');


const authRoutes = express.Router();

authRoutes.post('/social-auth', socialAuth)

module.exports = { authRoutes }