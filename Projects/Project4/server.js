if (process.argv.length != 3) {
  process.stdout.write(`Usage ${process.argv[1]} portNumber`);
  process.exit(1);
}

const express = require("express"); /* Accessing express module */
const bodyParser = require("body-parser"); /* To handle post parameters */
const path = require("path");
const { ApplicationDB } = require("./database/applicationDB");
const { render } = require("express/lib/response");
const applicationRouter = require("./routes/api/v1/application")
const app = express(); /* app is a request handler function */
process.stdin.setEncoding("utf8");
const portNumber = Number(process.argv[2]);

/* For views */
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

/* Initializes request.body with post information */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* applicationDB */
const applicationDB = new ApplicationDB();

/* Routes */
app.use("/api/v1", applicationRouter)

app.get("/", (request, response) => {
  (async () => {
    await applicationDB.listDatabases();
  })()
  response.render("index")
})

app.get("/sample", (request, response) => {
  values = {
    homeUrl: `<a href="http://localhost:${portNumber}/">HOME</a>`,
    firstName: 'Nikola',
    lastName: 'Tesla',
    api: `http://localhost:${portNumber}`
  }

  response.render("sample", values)
})

app.get("/data", (req, res) => {
  res.json({ firstName: "Nikola", lastName: "Tesla" })
})


/* Application Page */
app.get("/apply", (request, response) => {
  values = {
    homeUrl: `<a href="http://localhost:${portNumber}/">HOME</a>`,
    api: `http://localhost:${portNumber}`
  }
  response.render("application", values);
})

/* Review Application Page */
app.get("/reviewApplication", (request, response) => {
  values = {
    homeUrl: `<a href="http://localhost:${portNumber}/">HOME</a>`,
    api: `http://localhost:${portNumber}`
  };
  response.render("review", values);
});

/* Select by GPA Page */
app.get("/adminGPA", (request, response) => {
  values = {
    homeUrl: `<a href="http://localhost:${portNumber}/">HOME</a>`,
    api: `http://localhost:${portNumber}`
  }
  response.render("gpa", values)
})

/* Remove all Applications Page */
app.get("/adminRemove", (request, response) => {
  values = {
    homeUrl: `<a href="http://localhost:${portNumber}/">HOME</a>`,
    api: `http://localhost:${portNumber}`
  }
  response.render("remove", values)
})


/* Page after entering application info */
app.post("/processApplication", (request, response) => {
  let application = {
      name: undefined,
      email: undefined,
      gpa: undefined,
      info: undefined
  }

  let { name, email, gpa, info } = request.body
  application.name = name
  application.email = email
  application.gpa = gpa
  application.info = info

  applicationDB.insertApplication(application)

  let answer = `<h2>Applicants Data:</h2>
                <p><b>Name:</b> ${name}</p>
                <p><b>Email Address:</b> ${email}</p>
                <p><b>GPA:</b> ${gpa}</p>
                <p><b>Background Information:</b> ${info}</p><hr>${homeUrl}`
  response.writeHead(200, { "Content-Type": "text/html" })

  response.end(answer)
})

/* Page after entering email */
app.get("/processReviewApplication", (request, response) => {
  let email = request.query.processEmail
  // console.log("lookup email: ", email)

  let answer = ``

  applicationDB.lookUpApplication(email)
      .then(lookup => {
          if (lookup.length >= 1) {
              lookup = lookup[0]
              answer = `<h2>Applicants Data:</h2>
                    <p><b>Name:</b> ${lookup.name}</p>
                    <p><b>Email Address:</b> ${lookup.email}</p>
                    <p><b>GPA:</b> ${lookup.gpa}</p>
                    <p><b>Background Information:</b><br> ${lookup.info}</p>
                    <hr>${homeUrl}`
          } else {
              answer = `<h2>Applicant Info:</h2>
                    <p> <b>Email:</b> ${email} not found</p>
                    <hr>${homeUrl}`
          }

          response.writeHead(200, { "Content-Type": "text/html" })
          response.end(answer)
      })
      .catch(error => {
          response.status(404).json(error)
      })

})

/* Page after submitting GPA */
app.get("/processAdminGPA", (request, response) => {
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
          if (lookup.length >= 1) {
              for (let i = 0; i < lookup.length; i++) {
                  answer += `
              <tr>
                  <td style="border: 1px solid;">${lookup[i].name}</td>
                  <td style="border: 1px solid;">${lookup[i].gpa}</td>
              </tr>
            `
              }
              answer += `</table><hr>${homeUrl}`
          } else {
              answer += `</table>
                    <p><b>gpa:</b> Could not find applicants with >= ${gpa}</p>
                    <hr>${homeUrl}`
          }

          response.writeHead(200, { "Content-Type": "text/html" })
          response.end(answer)
      })
      .catch(error => {
          response.status(404).json(error)
      })
})

/* Page after entering deleting all applications */
app.get("/processAdminRemove", (request, response) => {
  let answer = `<h1>Removal of All Applicants</h1>`

  applicationDB.deleteAllApplications()
      .then(res => {
          answer = `<p>All applicants have been removed from the database. Number of Applicants
  removed: ${res}</p> <hr>${homeUrl}`

          response.writeHead(200, { "Content-Type": "text/html" })
          response.end(answer)
      })
      .catch(error => {
          response.status(404).json(error)
      })
})




app.listen(portNumber);
console.log(`Web server started and running at http://localhost:${portNumber}`);
commandLineInterpreter();

function commandLineInterpreter() {
  let stopServerMessage = 'Type \"stop\" to shutdown the server: ';
  process.stdout.write(stopServerMessage);
  process.stdin.on("readable", function () {
    let dataInput = process.stdin.read();
    if (dataInput !== null) {
      let command = dataInput.trim();
      if (command === "stop") {
        process.stdout.write("Shutting down the server\n");
        process.exit(0);
      } else {
        process.stdout.write(`Invalid command: ${command}\n`);
        process.stdout.write(stopServerMessage);
        process.stdin.resume();
      }
    }
  });
}
