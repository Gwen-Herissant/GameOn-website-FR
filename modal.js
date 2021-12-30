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
const errorMessage = document.querySelector('.error-message');


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

//show error message and styles
function showError(input, message) {
  //get element to right text into
  // const errorMessage = document.querySelector('.error-message');
  //write message
  errorMessage.innerText = message;
  //change border color
  input.style.border = '2px solid #e54858';
};

//show validation
function showValidation(input) {
  errorMessage.innerText = '';
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
    showError(firstName, 'Veuillez entrer 2 caractères ou plus pour le champ du prénom.');
  } else {
    showValidation(firstName);
  }

  //check last name 
  if (lastNameValue.length < 2) {
    showError(lastName, 'Veuillez entrer 2 caractères ou plus pour le champ du nom.');
  } else {
    showValidation(lastName);
  }

  //check email (regex)
  if (!isEmailValid(emailValue)) {
    showError(email, 'Veuillez enter une adresse mail valide');
  } else {
    showValidation(email);
  }

  //check birthdate (not null)
  if (birthdateValue === '') {
    showError(birthdate, 'Vous devez entrer votre date de naissance.');
  } else {
    showValidation(birthdate);
  }

  // check quantity (must be number)
  if (quantityValue === '') {
    showError(quantity, 'Vous devez entrer le nombre de tournois auquels vous avez participé.');
  } else if (isNaN(quantityValue)) {
    showError(quantity, 'Vous devez entrer un nombre.');
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
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

//regex validation for numbers (quantity) (if needed)
// function isNumberValid(quantity) {
//   return /^[0-9]+$/.test(quantity)
// }