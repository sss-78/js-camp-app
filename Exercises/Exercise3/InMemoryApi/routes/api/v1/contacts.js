/* In this file you will define all the routes for your api.
You will need to define the following routes:
1) /api/v1/contacts
  This route will need to respond to 2 requests:
  1) GET: it will respond with the serialized form of all the
  contacts in your application and a response code of 200
  2) POST: it will respond to a POST request that will generate a 
  new instance of a contact and add it to the in memory collection
  and a response code 200 and a message saying "successfully added contact".
  You will also need to validate that the parameters being passed pass the following constraints:  
  firstName and lastName shouldn't be more than 20 characters each
  phoneNumber needs to be in the format XXX-XXX-XXXX
  email needs to be in the format XXXX@XXXX.com
  id needs to be an integer
  If any of these validations fail you should repsond with a 500 error and a
  reponse of "failed validations on contact resource".
2) /api/v1/contacts/:id
  This route will need to responde to 3 requests:
  1) GET: it will respond with the serialized form of the requested
  resource and a response code of 200. You will receive the :id from 
  the req.params.id property. If the resource (contact) is not found in your "database",
  then you should respond with a http status code of 404 and a message saying
  "the resource was not found" as json.

  2) PUT: it will update the resource with the information attached in
  the req.body property.   
  Your route should respond with a 201 response code along with the updated
  resource otherwise 404 with an error message of "unable to update resource".

  3) DELETE: it will remove the contact from the collection with the matching id 
  in the request.params object and respond with a status code of 201 along with 
  the deleted resource in the response. If the resource is not found the route should
  respond with a 404 error and message "resource not found".  

3) /api/v1/contacts?firstName=foo&lastName=bar
  1) GET: It will return all of the contacts that match the query paramaters
  you pass. If none of them match you should respond with an empty array. If more than
  one query parameter is passed, the resources that match need to match all of the 
  conditions, e.g. if you are passing values for both the firstName and lastName then
  your matches need to match both query parameters. Note: query params end at the end of the route,
  and all come after the ? character and are combined with a &.  
  
  
  Hint: when sending your response you should follow the following examples:
  res.status(404).json({error: 'Contact not found'})  
  res.status(200).json(contacts)
  res.status(201).json(data)  
  */


const { query } = require('express');
let express = require('express');
let contactsRouter = express.Router();
let Contact = require('/Users/saisreeramani/cmsc335sum/cmsc335-ssreeram/Exercises/Exercise3/InMemoryApi/models/contact.js')

let contacts = [];

/* Define your routes/endpoints here */

function validateContactInfo(firstName, lastName, phoneNumber, email, id) {
  return firstName.length <= 20 && lastName.length <= 20 && 
  (phoneNumber.match(/-/g)).length === 2 &&
  email.includes('@') && email.endsWith('.com') &&
  !isNaN(id)
}

/* get /api/v1/contacts and /api/v1/contacts?firstName=foo&lastName=bar */
contactsRouter.get('/', (req, res) => {
    if(req.url.includes('?')) {
      let firstName = req.query.firstName
      let lastName = req.query.lastName
      let phoneNumber = req.query.phoneNumber
      let email = req.query.email

      let arr = contacts.filter(item => (!firstName || item.firstName === firstName) &&
      (!lastName || item.lastName === lastName) &&
      (!phoneNumber || item.phoneNumber === phoneNumber) &&
      (!email || item.email === email)
      )
      
      res.status(200).json(arr)
    } else {
      res.status(200).json(contacts)
    }
})

/* post /api/v1/contacts */
contactsRouter.post('/', (req, res) => {
  let firstName = req.body.firstName
  let lastName = req.body.lastName
  let phoneNumber = req.body.phoneNumber
  let email = req.body.email
  let id = req.body.id

  let new_contact = new Contact(firstName, lastName, phoneNumber, email, id)

  let isValidated = validateContactInfo(new_contact.firstName, new_contact.lastName, 
    new_contact.phoneNumber, new_contact.email, new_contact.id)
  
  let post_id = contacts.filter(item => item.id === id)

  if(isValidated && post_id.length === 0) {
    contacts.push(new_contact)
    res.status(201).json({status: 'successfully added contact'})
  } else {
    res.status(500).json({status: 'failed validations on contact resource'})
  }
})

/* get /api/v1/contacts/:id */
contactsRouter.get('/:id', (req, res) => {
  let getId = Number(req.params.id)
  let findContact = false


  contacts.filter(item => item.id === getId).
  forEach(item => {
      findContact = true 
      res.status(200).json(item)
    })

  if(!findContact) {
    res.status(404).json({error: 'the resource was not found'}) 
  }
  
})

/* put /api/v1/contacts/:id */
contactsRouter.put('/:id', (req, res) => {
  let getId = Number(req.params.id)
  let findContact = false

  contacts.filter(item => item.id === getId).
  forEach(item => {
      findContact = true
      item.firstName = req.body.firstName
      item.lastName = req.body.lastName
      item.phoneNumber = req.body.phoneNumber
      item.email = req.body.email
      item.id = req.body.id
      res.status(201).json(item)
    })

  if(!findContact) {
    res.status(404).json({error: 'unable to update resource'}) 
  }
  
})

/* delete /api/v1/contacts/:id */
contactsRouter.delete('/:id', (req, res) => {
  let getId = Number(req.params.id)
  let findContact = false
  let idx = 0
  
  for(contact of contacts) {
    if(contact.id === getId) {
      findContact = true
      let deleted_contact = contacts.splice(idx, 1)
      res.status(201).json(deleted_contact)
      break
    }
    idx++
  }

  if(!findContact) {
    res.status(404).json({error: 'resource not found'}) 
  }
  
})


contactsRouter.get('/heartbeat', (req, res) => {
  console.log(req);
  console.log("request received for /api/v1/contants/heartbeat");
  res.status(200).json({status: "service is up and running"});
});

module.exports = contactsRouter;