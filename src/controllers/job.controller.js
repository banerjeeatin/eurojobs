import express from "express"

const app = express()
// Middleware to parse JSON bodies
app.use(express.json());

//const db = require("../config/database"); ////export statement for commonjs based build or non-module based build
import db from "../config/database.js"

// ==> Method responsible for creating a new 'Job'

async function createJob(req, res) {
    //Debug Statement
    console.log('jobs.controller:createJob: request received', req.body);
    //console.log('jobs.controller:createJob: request body : ', req.body);

    const { jobtitle, joblocation, jobtype, jobsalaryrange, jobdescription, jobrequirements, jobresponsibilities, jobishousingprovided, jobvisapermit, jobbenefitsperks } = req.body;
    const { rows } =  await db.query(
        "INSERT INTO jobs (jobtitle, joblocation, jobtype, jobsalaryrange, jobdescription, jobrequirements, jobresponsibilities, jobishousingprovided, jobvisapermit, jobbenefitsperks) VALUES ($1, $2, $3, $4,$5, $6, $7, $8, $9, $10)",
        [jobtitle, joblocation, jobtype, jobsalaryrange, jobdescription, jobrequirements, jobresponsibilities, jobishousingprovided, jobvisapermit, jobbenefitsperks]
    );

    res.status(201).send({
        message: "Job added successfully!",
        body: {
            job: { jobtitle, joblocation, jobtype, jobsalaryrange, jobdescription, jobrequirements, jobresponsibilities, jobishousingprovided, jobvisapermit, jobbenefitsperks }
        },
    });
};


// ==> Method responsible for listing all jobs created.
async function listAllJobs (req, res)  {
    //Debug Statement
    console.log('jobs.controller:listAllJobs: request received', req.header);

    //const response = await db.query('SELECT * from jobs ORDER BY jobtitle ASC');
    
    const response = await db.query("SELECT jobid, jobtitle, joblocation, jobtype, TO_CHAR(jobposted, 'YYYY-MM-DD') as jobposted, \
         jobsalaryrange, jobdescription, jobrequirements, jobresponsibilities, jobishousingprovided, \
         jobvisapermit, jobbenefitsperks, jobstatus, jobapplicants from jobs ORDER BY jobtitle ASC");

    
    //const response = await db.query("SELECT jobid, jobtitle, TO_CHAR(jobposted, 'YYYY-MM-DD') as jobposted from jobs");

    //Debug Statement
    console.log('jobs.controller:listAllJobs: job list ', response.rows);

    res.status(200).send(response.rows);
};

// ==> Method responsible for fetching a job detail on the basis of specfied id.
async function findJobById (req, res)  {
    //Debug Statement
    console.log('jobs.controller:findJobById: request received', req.body);

    const jobId = parseInt(req.params.id);
    const response = await db.query('SELECT * from jobs WHERE jobid = $1', [jobId]);
    //Debug Statement
    console.log('jobs.controller:findJobById: job details ', response.rows);
    res.status(200).send(response.rows);
};

// ==> Method responsible for updating a job on the basis of specified id.
async function updateJobById (req, res) {
    const jobId = parseInt(req.params.id);
    const { jobtitle, joblocation, jobtype, jobsalaryrange, jobdescription, jobrequirements, jobresponsibilities, jobishousingprovided, jobvisapermit, jobbenefitsperks } = req.body;

    const response = await db.query('UPDATE jobs SET jobtitle = $1, joblocation = $2, jobtype = $3 jobsalaryrange = $4, jobdescription = $5, jobrequirements = $6, jobresponsibilities = $7, jobishousingprovided = $8, jobvisapermit = $9, jobbenefitsperks = $10  WHERE jobid = $11',
        [jobtitle, joblocation, jobtype, jobsalaryrange, jobdescription, jobrequirements, jobresponsibilities, jobishousingprovided, jobvisapermit, jobbenefitsperks, jobId]);
    res.status(200).send({ message: "Job Updated Successfully" });
};

// ==> Method responsible for deleting a job on the basis of specified id.
async function deleteJobById (req, res) {
    const jobId = parseInt(req.params.id);

    const response = await db.query('DELETE FROM jobs WHERE jobid = $1', [jobId]);
    res.status(200).send({ message: "Job Deleted Successfully. ", jobId });
};

//export default job.controller
export default {
    createJob,
    listAllJobs,
    findJobById,
    updateJobById,
    deleteJobById

}