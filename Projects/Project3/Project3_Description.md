# Project 3: Photo Viewer Application

## Due Date: Wednesday, July 03, 2024 11:55 PM EST
## Objectives: To practice event handling, JSON, and fetch.

## Specifications/Requirements
For this project you will implement a photo viewer that allows you to look at photos available in a folder or specified via a JSON file. A video illustrating some of functionality of the application can be found at [Photo Viewer Video](https://umd.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=cdee74bd-d58c-4104-9948-afbe018099dc).  


The PhotoViewer folder includes:  
1.	[Photoviewer.html](PhotoViewer/PhotoViewer.html) - This is the main page of the application.
2. [code.js](PhotoViewer/code.js) - This file includes all the JavaScript.
3. [style.css](PhotoViewer/style.css) - This file includes all the css.
4. [umcp](PhotoViewer/umcp) - Folder with images.

Part 2: Specifications/Requirements
1.	Loading Images from Local Folder
	* When the "Load Photos" button is selected, photos in the range defined by the "Start Photo Number" and "End Photo Number" can be displayed. Your code should read the folder name, common name, start photo number, and end photo number. Based on the previous information, your code can create an array with the names of the photos that belong to the specified range. Each photo's name consists of the folder name,followed by the common name, the photo's number, and the ".jpg" extension. You can assume only .jpg files will be provided. Notice you don't need to add "/" (it is assumed the folder name will provide it).
	*	After loading data, the message "Photo Viewer System" should be displayed in a &lt;div&gt; that is in the "Status" fieldset area. This message should be displayed in red color.
	*	The first photo in the range is displayed when the "First Photo" button is clicked on.
	* The last photo in the range is displayed when the "Last Photo" button is clicked on.
	*	Clicking on the "Next Photo" button displays the next photo. If the last photo in the range is being displayed, selecting the "Next Photo" button will display the first photo.
	*	Clicking on the "Previous Photo" button displays the previous photo. If the first photo in the range is being displayed, selecting the "Previous Photo" will display the last photo.
	*	Selecting the "SlideShow" button creates an animation were photos in the specified range are displayed, continuously. The photos will be displayed in the same order defined by the range. For example, if the range is 4 and 6 (assuming an __umcp__ folder and a common name of __college__) the images umcp/college4.jpg, umcp/college5.jpg, umcp/college6.jpg will be continuously displayed in that order.
	*	Selecting the "RandomSlideShow" button creates an animation were photos in the specified range are displayed, randomly. Any random approach is fine and you don't have to worry if the same photo is displayed twice in a row. Ideally all photos in the range should eventually appear, but if not, that is fine. For example, selecting a random value in the range and displaying the photo associated with that value is fine.
	*	Selecting the "StopSlideShow" button stops the current animation that is in progress.
	*	Clicking on the displayed image is equivalent to clicking on the "Next Photo" button (the next image should be displayed when you click on the image currently displayed).
	*	The name (folder, common name, number, .jpg) of the photo currently being displayed should be rendered in a disabled text field that is in the "Status" fieldset area. The text "Photo Being Displayed: " should precede the disabled text field. The name of the photo should be displayed for iterations (e.g., clicking on the "Next Photo" button) and for slide shows.
	*	 After reading the start and end photo numbers, your code must check that the end number is larger than or equal to the start number. If that is not the case, the message "Error: Invalid Range" should be displayed in a &lt;div&gt; that is located in the "Status" fieldset area. This message should be displayed in red color. __You can assume we will always provide numbers in the "Start Photo Number" and the "End Photo Number" text fields.__
	* Iterating (e.g., selecting "Next Photo") or starting a slide show without first loading data is considered an error and the message "Error: you must load data first" should be displayed in the &lt;div&gt; that is in the "Status" fieldset area. This message should be displayed in red color.
	*	The image "InitialImage.jpg" will be displayed when the page is initially loaded. The name of this image should appear in the disabled text field.
	*	The speed of the slide show animations is one second.
2.	Loading Images Using a JSON File
	*	The source of photos can be a JSON file that has the format the following [example file illustrates](http://www.cs.umd.edu/~nelson/classes/resources/cmsc335/images/imagesSet1.json)
	*	The JSON file has an array with images information. We will use the "imageURL" property to initialize the array used by the photoviewer.
	*	We will not use the "description" property.
	*	You can assume the JSON file has valid data (i.e., images exist).
	*	The "Load JSON" button will initialize the array of photos to view.
Part 3: Additional Information and Submission
*	The functionality of the viewer (e.g., animations, next photo, etc) is the same regardless whether we are loading data from a local folder or by using a JSON file.
*	Using global variables (variables that are not part of any function) is fine. Define as many as you want, but be reasonable about their use (i.e., if something can be solved without a global variable, then don't use it.
*	Try to avoid code duplication, but you will not be penalize if you duplicate code.
*	Functions requirement  
	1.	You can have as many functions as you want.
	2.	Your code should rely on at least one arrow (lambda) function. So we can identify the function during grading, add the comment __/* LAMBDA */__ near the function.
	3.	Your code should use the document.querySelector() method at least once.
*	The PhotoViewer.html file cannot have any JavaScript (only including code.js using the script tag).
*	All your JavaScript code must be in the code.js file.
*	In the code.js file, you can use __window.onload = main;__ to call a main() function that sets the event listeners and performs any other initialization.
*	All your css code must be in the style.css file.
*	You can assume that if the start photo number is less than or equal to the end photo number, the numbers define a valid range, with valid photos.
*	You can assume that all photos in the provided folder have the same common name and have increasing numbers.
* Your code should work for different folders (not just umcp/) and different range values.
*	You can assume that users will stop a slide show (using the "StopSlideShow" button) before starting another slide show (random or not).
*	You can assume that after a slide show has been stopped, if the user wants to iterate over the photos, they must select the "Load Photos" button.
*	You can assume that the photo's folder and the common name values will be valid (i.e., a folder with the specified name exists in the current folder and there are photos with the specified common name starting at one (e.g., college1.jpg)).
*	__The page does not need to look exactly as show in the video. As long as it is close you are OK.__
*	The "Reset Form Values" will reset the form values.
*	You may not use any authoring tool (e.g., Dreamweaver, etc.) that generates the HTML/CSS/JavaScript code for you.
*	You may not use Bootstrap, jQuery, React, or any other type of library/framework.
*	You must implement this project by yourself.
*	Make sure you view your code using Chrome (the browser we will use to grade your project).
*	You can use any HTML/CSS code we have provided in lecture examples.
*	You should validate your HTML/CSS, but we will not validate it during grading.
* You will need to commit your changes and push them to your repository on the University Gitlab server. __After you push your changes you should verify that you see your code in your repo in the cloud.__
*  __Carefully Read - As we don't have automatic testing performed by the submit server, we will only grade the last submission you provide. If you provide both an on time and a late submission, we will only grade the last submission and apply a 12 pts penalty to it.__
