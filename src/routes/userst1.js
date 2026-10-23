// routes/userst1.js
//router for servert1.js

import express from "express"

//const express = require('express');
const router = express.Router();

// Define routes for users
router.get('/', (req, res) => {
    res.send('Get all users');
});

router.get('/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`Get user with ID: ${userId}`);
});

router.post('/', (req, res) => {
    res.send('Create a new user');
});

router.put('/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`Update user with ID: ${userId}`);
});

router.delete('/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`Delete user with ID: ${userId}`);
});

//module.exports = router;
export default router;