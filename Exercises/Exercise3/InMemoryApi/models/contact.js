/* In this file you will define the Contact class and export it.
The contact class has the following properites:
firstName,
lastName,
phoneNumber,
email,
id
*/

class Contact {
    constructor(firstName, lastName, phoneNumber, email, id) {
        this.firstName = firstName
        this.lastName = lastName
        this.phoneNumber = phoneNumber
        this.email = email
        this.id = id
    }
}

module.exports = Contact;