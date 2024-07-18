const express = require('express');
const applicationRouter = express.Router();

const { ApplicationDB } = require("../../../database/applicationDB");
const applicationDB = new ApplicationDB();
homeUrl =  `<a href="http://localhost:4000/">HOME</a>`

//displaying entered info and adding to database
applicationRouter.post("/processApplication", (request, response) => {
    let application = {
        name : undefined,
        email : undefined,
        gpa : undefined,
        info : undefined
    }

    let {name, email, gpa, info} = request.body;
    application.name = name
    application.email = email
    application.gpa = gpa
    application.info = info

    applicationDB.insertApplication(application)

    let answer = `<h2>Applicants Data:</h2>
                  <p><b>Name:</b> ${name}</p>
                  <p><b>Email Address:</b> ${email}</p>
                  <p><b>GPA:</b> ${gpa}</p>
                  <p><b>Background Information:</b> ${info}</p><hr>${homeUrl}`;
    response.writeHead(200, { "Content-Type": "text/html" });

    response.end(answer);
});

applicationRouter.get("/processReviewApplication", (request, response) => {
    let email = request.query.processEmail
    // console.log("lookup email: ", email)

    let answer = ``

    applicationDB.lookUpApplication(email)
    .then(lookup => {
        if(lookup.length >= 1) {
            lookup = lookup[0]
            answer = `<h2>Applicants Data:</h2>
                      <p><b>Name:</b> ${lookup.name}</p>
                      <p><b>Email Address:</b> ${lookup.email}</p>
                      <p><b>GPA:</b> ${lookup.gpa}</p>
                      <p><b>Background Information:</b><br> ${lookup.info}</p>
                      <hr>${homeUrl}`;
        } else {
            answer = `<h2>Applicant Info:</h2>
                      <p> <b>Email:</b> ${email} not found</p>
                      <hr>${homeUrl}`;
        }

        response.writeHead(200, { "Content-Type": "text/html" });
        response.end(answer);
    })
    .catch(error => {
        console.log(error)
    })

});

applicationRouter.get("/processAdminGPA", (request, response) => {
    let gpa = request.query.processGPA
    // console.log("min gpa: ", gpa)

    let answer = `
    <h1>Display GPAs Greater than or Equal to</h1>
    <table style="border: 1px solid;">
        <tr>
            <th style="border: 1px solid;"><b>Name</b></th>
            <th style="border: 1px solid;"><b>GPA</b></th>
        </tr>
    `

    applicationDB.lookUpGPA(gpa)
    .then(lookup => {
        if(lookup.length >= 1) {
            for(let i = 0;i < lookup.length; i++) {
                answer += `
                <tr>
                    <td style="border: 1px solid;">${lookup[i].name}</td>
                    <td style="border: 1px solid;">${lookup[i].gpa}</td>
                </tr>
              `
            }  
            answer += `</table><hr>${homeUrl}`;
        } else {
            answer += `</table>
                      <p><b>gpa:</b> Could not find applicants with >= ${gpa}</p>
                      <hr>${homeUrl}`;
        }

        response.writeHead(200, { "Content-Type": "text/html" });
        response.end(answer);
    })
    .catch(error => {
        console.log(error)
    })
});

applicationRouter.get("/processAdminRemove", (request, response) => {
    let answer = `<h1>Removal of All Applicants</h1>`

    applicationDB.deleteAllApplications()
    .then(res => {
        answer = `<p>All applicants have been removed from the database. Number of Applicants
    removed: ${res}</p> <hr>${homeUrl}`;
    
    response.writeHead(200, { "Content-Type": "text/html" });
    response.end(answer);
    })
    .catch(error => {
        console.log(error)
    })
});

// http://localhost:4000/api/v1/application/notValid
applicationRouter.use((request, response) => {
    response.status(404).send("Application Not Found");
});
 

module.exports = applicationRouter;