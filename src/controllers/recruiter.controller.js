import express from "express"
const app = express()

// Middleware to parse JSON bodies
app.use(express.json());

//const db = require("../config/database"); ////export statement for commonjs based build or non-module based build
import db from "../config/database.js"

// ==> Method responsible for creating a new 'Recruiter' Company

async function createRecruiter(req, res) {
    //Debug Statement
    console.log('recruiter.controller:createRecruiter: request received', req.body);

    const { companyname, addressline1, addressline2, citytownvillage, statecounty, countryid, phonecontact, website, primarybusiness } = req.body;
    const { rows } =  await db.query(
        //"INSERT INTO recruiter (companyname, addressline1, addressline2, citytownvillage, statecounty, countryid, phonecontact, website, primarybusiness) VALUES ($1, $2, $3, $4,$5, $6, $7, $8, $9)",
        "INSERT INTO companydetailed (companyname, addressline1, addressline2, citytownvillage, statecounty, countryid, phonecontact, website, primarybusiness) VALUES ($1, $2, $3, $4,$5, $6, $7, $8, $9)",
        [companyname, addressline1, addressline2, citytownvillage, statecounty, countryid, phonecontact, website, primarybusiness]
    );

    res.status(201).send({
        message: "Recruiter Company added successfully!",
        body: {
            recruiter: { companyname, addressline1, addressline2, citytownvillage, statecounty, countryid, phonecontact, website, primarybusiness }
        },
    });
};


// ==> Method responsible for listing all recruiter companies created.
async function listAllRecuiters (req, res)  {
    const response = await db.query('SELECT * from companydetailed ORDER BY companyname ASC');
    res.status(200).send(response.rows);
};

// ==> Method responsible for fetching a recruiter company on the basis of specfied id.
async function findRecruiterById (req, res)  {
    const companyId = parseInt(req.params.id);
    const response = await db.query('SELECT * from recruiter WHERE companyId = $1', [companyId]);
    res.status(200).send(response.rows);
};

// ==> Method responsible for updating a recruiter company on the basis of specified id.
async function updateRecruiterById (req, res) {
    const companyId = parseInt(req.params.id);
    const { companyname, addressline1, addressline2, citytownvillage, phonecontact } = req.body;

    const response = await db.query('UPDATE recruiter SET companyname = $1,  addressline1 = $2, addressline2 = $3 citytownvillage = $4, phonecontact = $5  WHERE companyId = $6',
        [companyname, addressline1, addressline2, citytownvillage, phonecontact, companyId]);
    res.status(200).send({ message: "Compnay Updated Successfully" });
};

// ==> Method responsible for deleting a recruiter company on the basis of specified id.
async function deleteRecruiterById (req, res) {
    const companyId = parseInt(req.params.id);

    const response = await db.query('DELETE FROM recruiter WHERE companytid = $1', [companyId]);
    res.status(200).send({ message: "Recruiter company Deleted Successfully. ", companyId });
};

//export default recruiter.controller
export default {
    createRecruiter,
    listAllRecuiters,
    findRecruiterById,
    updateRecruiterById,
    deleteRecruiterById

}