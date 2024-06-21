# Exercise 2:

## Due Date: Sunday June 23rd, 2024 11:55 PM EST 

## Objectives: To verify that you have successfully installed docker on your local development machine and practice with creating html forms.

## Specifications/Requirements

1. Confirming docker is working properly and you are able to run nginx: 

   To complete this exercise you will first need to do the following. At the root level of this exercise, the same directory in which this file exists you will see there is a dockerfile and a docker-compose.yml file. You will also see a nginx.conf file. __DO NOT__ alter these files. You should first enter the following command from this directory in your terminal: `docker-compose up --build`. Once it is completed you should open up chrome and navigate to `http://localhost:3000` and you should see a plain web page with the following text inside of an h1 element: Enter New Contact.

2. Creating your contact entry form  
Inside of `index.shtml` you must create a form that has 7 input elements that correspond to the following values: first name, last name, street address, city, state, zip code and contact email address. Each input element should be of type text with the exception of the last one which should be of type email. Additionally there should be a label element wrapping each input element that identifies what the input element is for. There should be a default value for each element and they should all be marked as required. For the name property that each element needs to have you should be able to derive that from the `contactProcessing.php` script inside of the processing directory. Your form should also have 2 additional input type elements, one for submit and one for clear. Your form should use the action attribute of the form element to direct the request to the `contactProcessing.php` script inside of the processing directory. You should determine which method type to submit the form by reading the `contactProcessing.php` script.

2. Formating and output:
   All style you apply should be in the style.css file. As a convenience we have linked it in the `index.shtml` file. However you choose to style your input form is up to you - be creative, experiment and have fun with it. Since you are not allowed to modify the `contactProcssing.php` script you cannot style it. Upon successful completion of all the required form elements and clicking the submit button you will trigger the execution of the `contactProcessing.php` script and you will see in the browser all the values you just entered in your form.

3. Footer:  
   Since we are using a `.shtml` file and we have configured nginx to enable server side includes, your `index.shtml` file should include the `footer.shtml` file. The `footer.shtml` file needs to render a footer element that includes in it a hyperlink to the `index.shtml` file with the text: My Address Book. Outside of those requirements you are free to style the footer however you want.

4. Submission:
   To submit your implementation you need to commit all of your changes and push to your origin remote server. Once you successfully push your implementation you should login to the university gitlab server and verify that you see your submission in your repo.
