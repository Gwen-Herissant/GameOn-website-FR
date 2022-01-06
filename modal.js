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
const newsletter = document.getElementById("checkbox2");


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

//prevent from submitting and run input validation
form.addEventListener('submit', (e) => {
  e.preventDefault();

  checkInputs();
})

//error style change 
function showErrorBorder(input) {
  //change border color
  input.style.border = '2px solid #e54858';
}

//show validation
function showValidation(input) {
  //change broder color
  input.style.border = '2px solid #279e7a';
};

//input validation
function checkInputs() {
  //get input values
  const firstNameValue = firstName.value.trim();
  const lastNameValue = lastName.value.trim();
  const emailValue = email.value.trim();
  const birthdateValue = birthdate.value.trim();
  const quantityValue = quantity.value.trim();
  // const locationsValue = locations.value.trim();
  // const generalConditionsValue = generalConditions.value.trim();

  //check first name
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

  // check locations (not null)
  // if (locationsValue === '') {
  //   showError(locations, 'Vous devez choisir une option.');
  // } else {
  //   showValidation(locations);
  // }

  // general conditions (not null, required)
  // if (generalConditionsValue === '') {
  //   showError(generalConditions, 'Vous devez vérifier que vous acceptez les termes et conditions.');
  // } else {
  //   showValidation(generalConditions);
  // }
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
  //get today's date
  const currentDate = new Date();

  const age = currentDate.getFullYear() - dateOfBirth.getFullYear();
  const month = currentDate.getMonth() - dateOfBirth.getMonth();
  
  //get element to put text into
  const birthdateErrorMessage = document.querySelector('#birthdate-message');
  if (age < 16) {
    //write message
    birthdateErrorMessage.innerText = 'Vous devez avoir au moins 16 ans';
    showErrorBorder(birthdate);
  } else {
    birthdateErrorMessage.innerText = "";
    showValidation(birthdate);
  }
  return age;
}
