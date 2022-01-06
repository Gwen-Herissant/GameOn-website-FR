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

//error functions for each input :

//error style change 
function showErrorBorder(input) {
  //change border color
  input.style.border = '2px solid #e54858';
}

//show error for firstName
function showError_first(input) {
  //get element to put text into
  const firstErrorMessage = document.querySelector('#first-message');
  //write message
  firstErrorMessage.innerText = 'Veuillez entrer 2 caractères ou plus pour le champ du prénom.';
};

//show error for lastName
function showError_last(input) {
  //get element to put text into
  const lastErrorMessage = document.querySelector('#last-message');
  //write message
  lastErrorMessage.innerText = 'Veuillez entrer 2 caractères ou plus pour le champ du nom.';
};

//show error for email
function showError_email(input) {
  //get element to put text into
  const emailErrorMessage = document.querySelector('#email-message');
  //write message
  emailErrorMessage.innerText = 'Veuillez enter une adresse mail valide';
};

//show error for birthdate
function showError_birthdate(input) {
  //get element to put text into
  const birthdateErrorMessage = document.querySelector('#birthdate-message');
  //write message
  birthdateErrorMessage.innerText = 'Vous devez entrer votre date de naissance.';
};

//show errors for quantity
function showError_quantityEmpty(input) {
  //get element to put text into
  const quantityErrorMessage = document.querySelector('#quantity-message');
  //write message
  quantityErrorMessage.innerText = 'Vous devez entrer le nombre de tournois auquels vous avez participé.';
};

function showError_quantityNaN(input) {
  //get element to put text into
  const quantityErrorMessage = document.querySelector('#quantity-message');
  //write message
  quantityErrorMessage.innerText = 'Vous devez entrer un nombre.';
};

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
  if (firstNameValue.length < 2) {
    showError_first(firstName);
    showErrorBorder(firstName);
  } else {
    showValidation(firstName);
  }

  //check last name 
  if (lastNameValue.length < 2) {
    showError_last(lastName);
    showErrorBorder(lastName);
  } else {
    showValidation(lastName);
  }

  //check email (regex)
  if (!isEmailValid(emailValue)) {
    showError_email(email);
    showErrorBorder(email);
  } else {
    showValidation(email);
  }

  //check birthdate (not null)
  if (birthdateValue === '') {
    showError_birthdate(birthdate);
    showErrorBorder(birthdate);
  } else {
    showValidation(birthdate);
  }

  // check quantity (must be number)
  if (quantityValue === '') {
    showError_quantityEmpty(quantity);
    showErrorBorder(quantity);
  } else if (isNaN(quantityValue)) {
    showError_quantityNaN(quantity);
    showErrorBorder(quantity);
  } else {
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
