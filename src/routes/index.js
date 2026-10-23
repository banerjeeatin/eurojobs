/** 
 * File: src/routes/index.js
 * Description: File responsible for the applications API call
*/
const users = require('./users');

const express = require('express');

const router = express.Router();

router.get('/api/users', (req, res) => {
    console.log('req received at /api/users ');
    res.status(200).send(users);

});

router.get('/api', (req, res) => {
    console.log('req received at api ');
    res.status(200).send({
        "swagger": "2.0",
        "title": "Euro Jobs API Documentation",
        success: 'true',
        message: 'Welcome to Euro Jobs API',
        version: '1.0.0',

    });

});

module.exports = router;
