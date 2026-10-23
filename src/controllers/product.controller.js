import express from "express"

const app = express()

// Middleware to parse JSON bodies
app.use(express.json());

//const db = require("../config/database");  //statement for commonjs based build
import db from "../config/database.js"


// ==> Method responsible for creating a new 'Product'

async function createProduct( req, res ) {

    console.log('product.controller:createProduct: Begin to create product by inserting row in db');
    //console.log('product.controller:createProduct: Product create request body, product_name : ' + req.body.product_name);
 
    const { product_name, quantity, price } = req.body;

    console.log('product.controller:createProduct: Values received product_name : '
        + product_name + ' quantity : ' + quantity + ' price : ' + price);

    const { rows } = await db.query(
        "INSERT INTO products (product_name, quantity, price) VALUES ($1, $2, $3)",
        [product_name, quantity, price]
    );

    res.status(201).send({
        message: "Product added successfully!",
        body: {
            product: { product_name, quantity, price }
        },
    });
};


// ==> Method responsible for listing all products created.
async function listAllProducts( req, res ) {
    console.log('product.controller:listAllProducts: Fetch list of all products in db');

    const response = await db.query('SELECT * from products ORDER BY product_name ASC');
    res.status(200).send(response.rows);
};

// ==> Method responsible for fetching a product on the basis of specfied id.
async function findProductById( req, res )  {
    const productId = parseInt(req.params.id);
    const response = await db.query('SELECT * from products WHERE productid = $1', [productId]);
    res.status(200).send(response.rows);
};

// ==> Method responsible for updating a product on the basis of specified id.
async function updateProductById( req, res ) {
    const productId = parseInt(req.params.id);
    const { product_name, quantity, price } = req.body;

    const response = await db.query('UPDATE products SET product_name = $1, quantity = $2, price = $3 WHERE productid = $4', [product_name, quantity, price, productId]);
    res.status(200).send({ message: "Product Updated Successfully"});
};

// ==> Method responsible for deleting a product on the basis of specified id.
async function deleteProductById( req, res ) {
    const productId = parseInt(req.params.id);

    const response = await db.query('DELETE FROM products WHERE productid = $1', [productId]);
    res.status(200).send({ message: "Product Deleted Successfully.", productId });
};

//export default job.controller
export default {
    createProduct,
    listAllProducts,
    findProductById,
    updateProductById,
    deleteProductById
}