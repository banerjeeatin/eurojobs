/**
 * File: src/routes/product.routes.js
 * Description: File responsible for API routes for 
 *         'Product' class
 * 
 */

import express from "express"
import productController from "../controllers/product.controller.js"

//statement for commonjs based build
//const express = require('express');

const router = express.Router();
//const productRoute = express.Router();

//statement for commonjs based build
//const productController = require('../controllers/product.controller');

/*
router.get('/', (req, res) => {
    const userAgent = req.headers['user-agent']; // Accessing the 'User-Agent' header
    const method = req.method; // Accessing the method

    console.log('User-Agent:', userAgent);
    
    res.send('Get all products');

    //res.send('Headers logged!');
});
*/
/*
// Middleware specific to this router
router.use((req, res, next) => {
    console.log('Time:', Date.now());
    next(); // pass control to the next handler
});
*/
// ==> Defining CRUD routes for 'Product':

/*
router.post('/', (req, res, next) => {
    console.log('request body: ', req.body);
    res.send('Request for creating a product');
    next(); // pass control to the next handler
});
*/

// ==> Route responsible for creating new Products: (POST) localhost: 3000/api/products
router.post('/', productController.createProduct);

/*
router.get( '/', (req, res, next ) => {
    console.log('request body: ', req.body );
    res.send('Get all products');
    next(); // pass control to the next handler
});
*/

// ==> Route responsible for listing all products created: (GET) localhost: 3000/api/products
router.get('/', productController.listAllProducts);

/*
// ==> Route responsible for fetching a product detail on the basis of Id. : (GET) localhost: 3000/api/products/:id
router.get('/products/:id', productController.findProductById);

// ==> Route responsible for updating a product on the basis a specified Id. : (PUT) localhost: 3000/api/products/:id
router.put('/products/:id', productController.updateProductById);

// ==> Route responsible for deleting a product on the basis of a specified Id. : (DELETE) localhost: 3000/api/products/:id
router.delete('/products/:id', productController.deleteProductById);

*/

export default router;
//export default productRoute;