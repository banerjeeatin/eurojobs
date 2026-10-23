// servert1.js is a trial file to check working of express Router
import express from "express"

// Import the users router
import usersRouter from './src/routes/userst1.js'

import productRoute from "./src/routes/product.routes.js"

//const express = require('express');
const app = express();
const port = 3000;



// Use the users router for all requests starting with '/users'
app.use('/userst1', usersRouter);

// Use the product router for all requests starting with '/api/products'
app.use('/api/products', productRoute);

// Basic root route
app.get('/', (req, res) => {
    res.send('Welcome to the Express Router Example!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});