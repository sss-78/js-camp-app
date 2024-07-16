const express = require('express');
const applicationRouter = express.Router();



// http://localhost:4000/api/v1/application/notValid
applicationRouter.use((request, response) => {
    response.status(404).send("Application Not Found");
});
 

module.exports = applicationRouter;