/********w************
    
    Project 1 Stylesheet
    Name: Al Hochbaum
    Date: 2023-04-24
    Description: Javascript for form validation within the webpage

*********************/

/*
 * Handles the submit event of the survey form
 *
 * param e  A reference to the submit event
 * return   True if no validation errors; False if the form has
 *          validation errors
 */
function validate(e) {
	//	Hides all error elements on the page
	hideErrors();

	//	Determine if the form has errors
	if (formHasErrors()) {
		// 	Prevents the form from submitting
		e.preventDefault();
		return false;
	}

	return true;
}

/*
 * Handles the reset event for the form.
 *
 * param e A reference to the reset event
 * return  True allows the reset to happen; False prevents
 *         the browser from resetting the form.
 */
function resetForm(e) {
	// Confirm that the user wants to reset the form.
	if (confirm('Clear survey?')) {
		// Ensure all error fields are hidden
		hideErrors();

		// Resets all inputs background to white
		let formInputs = document.getElementsByTagName("input");

		for (let index = 0; index < formInputs.length; index++) {
			formInputs[index].style = "background-color: #FFF;";
		}

		document.getElementById("province").style = "background-color: #FFF;";

		// When using onReset="resetForm()" in markup, returning true will allow
		// the form to reset
		return true;
	}

	// Prevents the form from resetting
	e.preventDefault();

	// When using onReset="resetForm()" in markup, returning false would prevent
	// the form from resetting
	return false;
}


/*
 * Removes white space from a string value.
 *
 * return  A string with leading and trailing white-space removed.
 */
function trim(str) 
{
	// Uses a regex to remove spaces from a string.
	return str.replace(/^\s+|\s+$/g,"");
}


/*
 * Does all the error checking for the form.
 *
 * return   True if an error was found; False if no errors were found
 */
function formHasErrors() {
	
	
	//	Complete the validations below
	let errorFlag = false; 
	let requiredFields = ["name", "address", "city", "postal","email", "phone"];

	for (let index = 0; index < requiredFields.length; index++){

		let textField = document.getElementById(requiredFields[index]);
		let resultFromHasInput = formFieldHasInput(textField);

		if (!resultFromHasInput){

			document.getElementById(requiredFields[index] + "_error").style.display = "block";

			if(!errorFlag){
				textField.focus();
				textField.select();
			}

			errorFlag = true;
		}

		// Postal code validation 
		if (textField.getAttribute("name") === "postal" && resultFromHasInput){
			let regexPostalCode = new RegExp(/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/);

			let postalCodeValue = document.getElementById("postal").value;

			if(!regexPostalCode.test(postalCodeValue)){
				document.getElementById("postalformat_error").style.display = "block";

				if (!errorFlag){
					document.getElementById("postal").focus();
					document.getElementById("postal").select();
				}

				// raise the error flag
				errorFlag = true;
			}
		}

		// Email addres code validation 
		if (textField.getAttribute("name") === "email" && resultFromHasInput){
			let regexEmail = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/);

			let emailAddress = document.getElementById("email").value;

			if(!regexEmail.test(emailAddress)){
				document.getElementById("emailformat_error").style.display = "block";

				if (!errorFlag){
					document.getElementById("email").focus();
					document.getElementById("email").select();
				}

				// raise the error flag
				errorFlag = true;
			}
		}

		// Validation for phone number continued
		if (textField.getAttribute("name") === "phone" && resultFromHasInput){

			let phoneNumber = document.getElementById("phone").value;

			if(!phoneNumberCheck(phoneNumber)){
				document.getElementById("phoneformat_error").style.display = "block";

				if (!errorFlag){
					document.getElementById("phone").focus();
					document.getElementById("phone").select();
				}

				// raise the error flag
				errorFlag = true;
			}
		}
    }

	// Checking that a province has been selected
	let provinceSelected = document.getElementById("province").value;

	if ((provinceSelected === "- Select -")){
		document.getElementById("province_error").style.display = "block";

		if (!errorFlag){
			document.getElementById("province").focus();
		}

		//Raise the error flag
		errorFlag = true;
	}

	return errorFlag;
}

/*
 * Invoked by the focus event. 
 * This method changes the background colour of an element that has focus
 * 
 * param The event data of the input element that caused the event to happen.
 */
 function elementHasFocus(inputElement){

	inputElement.style = "background-color: #8dbade; color: yellow;";
 }

/*
 * Invoked by the focusout event. 
 * This method changes the background colour of an element that has focus
 * 
 * param The event data of the input element that caused the event to happen.
 */
 function elementLostFocus(inputElement){

	inputElement.style = "background-color: #FFF; ";
	inputElement.getAttribute("style", "outline: none;");
 }

/*
 * Determines if a text field element has input
 *
 * param   fieldElement A text field input element object
 * return  True if the field contains input; False if nothing entered
 */
function formFieldHasInput(fieldElement) {
	// Check if the text field has a value
	if (fieldElement.value === null || trim(fieldElement.value) === "") {
		// Invalid entry
		return false;
	}

	// Valid entry
	return true;
}

/*
 * When invoked, this method checks that the value
 * entered was a proper phone number
 *
 * param A string that has numbers
 * return Returns a bool value of true if the parameter passed the check.
 */
function phoneNumberCheck(number){
	let isANumber = false;

	if (!isNaN(number) && (number.length === 10)) {
		isANumber = true;
	}

	return isANumber;
}

/*
 * Hides all of the error elements.
 */
function hideErrors() {
	// Get an array of error elements
	let error = document.getElementsByClassName("error");

	// Loop through each element in the error array
	for (let i = 0; i < error.length; i++) {
		// Hide the error element by setting it's display style to "none"
		error[i].style.display = "none";
	}
}

/*
 * Handles the load event of the document.
 */
function load() {
	// Add event listener for the form submit
	document.getElementById("contactForm").addEventListener("submit", validate);

	// Add event listener for the form reset
	document.getElementById("contactForm").addEventListener("reset", resetForm);

	// Adding event listeners for the focus event of all input elements.
	let formInputs = document.getElementsByTagName("input");

	for (let index = 0; index < formInputs.length; index++) {
		formInputs[index].addEventListener("focus", function(){

			elementHasFocus(formInputs[index]);
		});

		formInputs[index].addEventListener("focusout", function(){

			elementLostFocus(formInputs[index]);
		});
	}
	
	 // Adding event listenr for the focus event for the select element
	 let province = document.getElementById("province");

	 province.addEventListener("focus", function(){

		   elementHasFocus(province);
	   });

	   province.addEventListener("focusout", function(){

		elementLostFocus(province);
	});

	// Hide all errors in the html5 markup
    hideErrors();
}

// Add document load event listener
document.addEventListener("DOMContentLoaded", load);
