# Exercise 4: React Search/Filter application

## Due Date: Friday July 19th, 2024 11:55 PM EST
## Objectives: To become aquainted with React components, state, and JSX, practice array functions (filter, map, reduce, etc..)

## Specifications/Requirements
We have provided you with a complete React application bootstrapped with the react cli tool. To complete this project you need to create 2 components: List and Filter. 
The Filter component will display a text input box that will allow the user to enter a population size for a city. As the user enters data the application will display a live list of results that match which cities in the data set have a population less than the number entered by the user in the input field. We have provided you with the fetch request inside of the useEffect hook in `Filter.js`. Do not change or add any code to this hook. You are responsible for taking the results from this request to check against the results from the fetch request.
Hint: you will need to define a handler to respond to an onChange event triggered inside of the input box. Additionally, once you retrieve it's value you will want to check to see which cities in the data set have a populaton less than it and store them. You can add an additional useState hook if you think you need to.  

Once you have stored the matched data you will then pass them to the List component.

In List.js you will create the component that will create an unordered list and display each matched item inside of it.
Note: React requires entries in an unordered list to contain a "key" property that must be unique. For more information on lists and keys in React, read over the official documentation:

https://reactjs.org/docs/lists-and-keys.html

Hint: the List component will be receiving the collection of matched data as a prop. Additionally, for each list item the component will display the data in the following format:  ```<city> - <state> - <population>```. To know how to retrieve those values from the request object, inspect the JSON object in the console.



__Note: In order to run the application run ```npm install``` and then ```npm start``` in the top level directory of the exercise and open a browser and navigate to localhost:3000 in order to see your application running. You can copy paste the endpoint to see the JSON objects__ 