const { request } = require('express')
const express = require('express')
const res = require('express/lib/response')
const applicationRouter = express.Router()
const { ApplicationDB } = require("../../../database/applicationDB")
const applicationDB = new ApplicationDB()
homeUrl = `<a href="http://localhost:4000/">HOME</a>`


/* 
    Handles these URLS:
    POST http://localhost:4000/api/v1/application
*/
applicationRouter.post("/application", (request, response) => {
    let application = {
        name: request.body.name,
        email: request.body.email,
        gpa: request.body.gpa,
        info: request.body.info
    }
    // console.log(application)

    applicationDB.insertApplication(application)
    response.status(201).json(application)
})

/* 
    Handles these URLS:
    GET http://localhost:4000/api/v1/application
    GET http://localhost:4000/api/v1/application?email=
    GET http://localhost:4000/api/v1/application?gpa=“”&comparison=“” 
*/
applicationRouter.get("/application", (request, response) => {
    let email = request.query.email
    let gpa = request.query.gpa
    let comparison = request.query.comparison

    if (email !== undefined) { /* Email Filter */
        // console.log(email)
        applicationDB.lookUpApplication(email)
            .then(res => {
                response.status(200).json(res)
            })
            .catch(error => {
                response.status(404).json(error)
            })
    } else if (gpa !== undefined) { /* GPA and comparison filter */
        // console.log(gpa, comparison)
        applicationDB.filterByGPAWithComparison(gpa, comparison)
            .then(res => {
                response.status(200).json(res)
            })
            .catch(error => {
                response.status(404).json(error)
            })
    } else { /* Everyone has gpa >= 0.0 so returns everything */
        // console.log("No params provided")
        applicationDB.lookUpGPA("0.0")
            .then(res => {
                response.status(200).json(res)
            })
            .catch(error => {
                response.status(404).json(error)
            })
    }
})

/* 
    Handles these URLS:
    GET http://localhost:4000/api/v1/application/:id
*/
applicationRouter.get("/application/:id", (request, response) => {
    let id = request.params.id

    applicationDB.lookUpID(id)
        .then(res => {
            response.status(200).json(res)
        })
        .catch(error => {
            response.status(404).json(error)
        })
})

/* 
    Handles these URLS:
    POST http://localhost:4000/api/v1/application/:id
*/
applicationRouter.put("/application/:id", (request, response) => {
    let id = request.params.id
    let application = {
        name: request.body.name,
        email: request.body.email,
        gpa: request.body.gpa,
        info: request.body.info
    }

    applicationDB.updateID(id, application)
        .then(res => {
            response.status(200).json(res)
        })
        .catch(error => {
            response.status(404).json(error)
        })
})

/* 
    Handles these URLS:
    DELETE http://localhost:4000/api/v1/application/:id
*/
applicationRouter.delete("/application/:id", (request, response) => {
    let id = request.params.id

    applicationDB.deleteID(id)
        .then(res => {
            response.status(200).json(res)
        })
        .catch(error => {
            response.status(404).json(error)
        })
})

// http://localhost:4000/api/v1/application/notValid
applicationRouter.use((request, response) => {
    response.status(404).send("Application Not Found")
})


module.exports = applicationRouter