function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const form = document.getElementById('form');
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close");
const input = document.getElementsByTagName('input');
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const locations = [
  document.getElementById("location1"),
  document.getElementById("location2"),
  document.getElementById("location3"),
  document.getElementById("location4"),
  document.getElementById("location5"),
  document.getElementById("location6")
];
const generalConditions = document.getElementById("checkbox1");

//other global variables
let oneOptionIsChecked = false; //set var as global for final validation of location input


// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}


// close modal event
closeBtn.addEventListener('click', closeModal);

//close modal form
function closeModal() {
  modalbg.style.display = 'none';
}


//error style change 
function showErrorBorder(input) {
  //change border color
  input.style.border = '2px solid #e54858';
}

//show validation
function showValidation(input) {
  //change broder color
  input.style.border = '2px solid #279e7a';
  //add class to html
  input.classList.add('isValid');
};


//prevent from submitting and run input validation
form.addEventListener('submit', (e) => {
  e.preventDefault();

  checkInputs();
  isFormValid();
})


//input validation
function checkInputs() {

  //check first name
  const firstNameValue = firstName.value.trim();
  //get element to put text into
  const firstErrorMessage = document.querySelector('#first-message');
  if (firstNameValue.length < 2) {
  //write message
    firstErrorMessage.innerText = 'Veuillez entrer 2 caractères ou plus pour le champ du prénom.';
    showErrorBorder(firstName);
  } else {
    firstErrorMessage.innerText = "";
    showValidation(firstName);
  }

  //check last name 
  const lastNameValue = lastName.value.trim();
  //get element to put text into
  const lastErrorMessage = document.querySelector('#last-message');
  if (lastNameValue.length < 2) {
    //write message
    lastErrorMessage.innerText = 'Veuillez entrer 2 caractères ou plus pour le champ du nom.';
    showErrorBorder(lastName);
  } else {
    lastErrorMessage.innerText = "";
    showValidation(lastName);
  }

  //check email (regex)
  const emailValue = email.value.trim();
  //get element to put text into
  const emailErrorMessage = document.querySelector('#email-message');
  if (!isEmailValid(emailValue)) {
    //write message
    emailErrorMessage.innerText = 'Veuillez enter une adresse mail valide';
    showErrorBorder(email);
  } else {
    emailErrorMessage.innerText = "";
    showValidation(email);
  }

  //check birthdate 
  const birthdateValue = birthdate.value.trim();
  //get element to put text into
  const birthdateErrorMessage = document.querySelector('#birthdate-message');
  let today = new Date();
  let usersBirthdate = new Date(birthdateValue);
  if (birthdateValue === '') {
    //write message
    birthdateErrorMessage.innerText = 'Vous devez entrer votre date de naissance.';
    showErrorBorder(birthdate);
  } else if (usersBirthdate > today) {
    //write message
    birthdateErrorMessage.innerText = 'La date que vous avez entrer est dans le futur';
    showErrorBorder(birthdate);
  } else {
    calculateAge();
  }

  // check quantity (must be number)
  const quantityValue = quantity.value.trim();
  //get element to put text into
  const quantityErrorMessage = document.querySelector('#quantity-message');
  if (quantityValue === '' || quantityValue < 0) {
    //write message
    quantityErrorMessage.innerText = 'Vous devez entrer le nombre de tournois auquels vous avez participé.';
    showErrorBorder(quantity);
  } else if (isNaN(quantityValue)) {
    //write message
    quantityErrorMessage.innerText = 'Vous devez entrer un nombre.';
    showErrorBorder(quantity);
  } else {
    quantityErrorMessage.innerText = "";
    showValidation(quantity);
  }

  // check locations
  const locationErrorMessage = document.querySelector('#location-message');
  //loop through every radio btn to see if one is checked
  for (let location of locations) {
    if (location.checked) {
      oneOptionIsChecked = true;
      break;
    }
  }
  //actual validation based on previous loop
  if (!oneOptionIsChecked) {
    locationErrorMessage.innerText = 'Vous devez choisir une option.';
  } else {
    locationErrorMessage.innerText = "";
  }

  // check general conditions
  const generalConditionsErrorMessage = document.querySelector('#checkbox1-message');
  if (generalConditions.checked == false) {
    generalConditionsErrorMessage.innerText = 'Vous devez vérifier que vous acceptez les termes et conditions.'
  } else {
    generalConditionsErrorMessage.innerText = "";
    generalConditions.classList.add('isValid');
  }
}


//regex validation for email
function isEmailValid(email) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(email);
}


//calculate age 
function calculateAge() {
  //get user input
  const birthdateInput = document.querySelector('#birthdate').value;
  //turn it into a date
  const dateOfBirth = new Date(birthdateInput);
  //get dates for verification
  const currentDate = new Date();
  const birthYear = dateOfBirth.getFullYear();
  const currentYear = currentDate.getFullYear();
  const birthMonth = dateOfBirth.getMonth();
  const currentMonth = currentDate.getMonth();
  const birthDay = dateOfBirth.getDay();
  const currentDay = currentDate.getDay();
  
  //get element to put text into
  const birthdateErrorMessage = document.querySelector('#birthdate-message');
  //get precise age based on difference with current date
  if (currentYear - birthYear > 16) {
    birthdateErrorMessage.innerText = "";
    showValidation(birthdate);
  } else if (currentYear - birthYear < 16) {
    birthdateErrorMessage.innerText = 'Vous devez avoir au moins 16 ans pour participer.'
    showErrorBorder(birthdate);
  } else if (currentMonth > birthMonth) {
    birthdateErrorMessage.innerText = "";
    showValidation(birthdate);
  } else if (currentMonth < birthMonth) {
    birthdateErrorMessage.innerText = 'Vous devez avoir au moins 16 ans pour participer.'
    showErrorBorder(birthdate);
  } else if (currentDay > birthDay) {
    birthdateErrorMessage.innerText = "";
    showValidation(birthdate);
  } else if (currentDay < birthDay) {
    birthdateErrorMessage.innerText = 'Vous devez avoir au moins 16 ans pour participer.'
    showErrorBorder(birthdate);
  }
}


//check that all inputs are valid before submitting
function isFormValid() {
  if (
    firstName.classList.contains('isValid') &&
    lastName.classList.contains('isValid') &&
    email.classList.contains('isValid') &&
    birthdate.classList.contains('isValid') &&
    quantity.classList.contains('isValid') &&
    oneOptionIsChecked === true &&
    generalConditions.classList.contains('isValid') 
  ) {
    console.log('all inputs are valid !')
    
    //run final function confirming form validation
    confirmationModal();
  }
}


//confirmation modal with message
function confirmationModal() {
    //recupère modal-body
    const modalBody = document.querySelector('.modal-body');
    //retire form
    modalBody.innerHTML = "";
    //créer conteneur pour msg
    let messageContainer = document.createElement('div');
    //ajoute class au conteneur
    messageContainer.classList.add('confirmation-message');
    //append to modalBody
    modalBody.appendChild(messageContainer);
    //ajoute texte
    messageContainer.textContent = 'Merci pour votre inscription.';
    //ajoute styles
    messageContainer.style.textAlign = 'center';
    messageContainer.style.margin = '25% auto';
    //create btn
    let messageBtn = document.createElement('div');
    //ajoute class recuperant styles
    messageBtn.classList.add('btn-signup', 'btn-message');
    //append to modal body
    modalBody.appendChild(messageBtn);
    //ajoute texte
    messageBtn.innerText = 'Fermer';
    //ajoute styles
    messageBtn.style.width = '40%';
    messageBtn.style.textAlign = 'center';
    messageBtn.style.margin = '20% auto';
    //close modal after validation message
    messageBtn.addEventListener('click', closeModal);
  }
