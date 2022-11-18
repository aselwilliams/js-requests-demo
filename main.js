console.log("connected");

const getAllBtn = document.querySelector("#all");
const charBtns = document.querySelectorAll(".char-btns");
const ageForm = document.querySelector("#age-form");
const ageInput = document.querySelector("#age-input");
const createForm = document.querySelector("#create-form");
const newFirstInput = document.querySelector("#first");
const newLastInput = document.querySelector("#last");
const newGenderDropDown = document.querySelector("select");
const newAgeInput = document.querySelector("#age");
const newLikesText = document.querySelector("textarea");
const charContainer = document.querySelector("section");

const baseURL = "http://localhost:4000";

function createCharacterCard(char) {
  let charCard = document.createElement("div");
  charCard.innerHTML = `<h3>${char.firstName} ${char.lastName}</h3>
  <p>gender: ${char.gender} | age: ${char.age}</p>
  <h4>Likes</h4>
  <ul>
    <li>${char.likes[0]}</li>
    <li>${char.likes[1]}</li>
    <li>${char.likes[2]}</li>
  </ul>`;

  charContainer.appendChild(charCard);
}

function clearCharacters() {
  charContainer.innerHTML = ``;
}
//get all characters
function getAllChars() {
  clearCharacters();
  axios
    .get(`${baseURL}/characters`)
    .then(function (res) {
      //returns a promise that we are calling res
      //loop over res and call the createCharacterCard on each
      for (let i = 0; i < res.data.length; i++) {
        createCharacterCard(res.data[i]);
      }
    })
    .catch((error) => console.log(error));
}

getAllBtn.addEventListener("click", getAllChars);

//get single character
function getOneChar(e) {
  clearCharacters();
  // console.log(e.target.id)
  axios
    .get(`${baseURL}/character/${e.target.id}`)
    .then((res) => {
      console.log(res.data);
      createCharacterCard(res.data);
    })
    .catch((err) => console.log(err));
}
for (let i = 0; i < charBtns.length; i++) {
  charBtns[i].addEventListener("click", getOneChar);
}

function getOldChars(e) {
  e.preventDefault();
  clearCharacters();
  axios
    .get(`${baseURL}/character?age=${ageInput.value}`)
    .then((res) => {
      res.data.map((char) => createCharacterCard(char));
    })
    .catch((err) => console.error(err));
}
ageForm.addEventListener("submit", getOldChars);

//create a new character
function createNewChar(e) {
  e.preventDefault();
  clearCharacters();
  //getting the comma separated input and turning it into an array
  let newLikes = [...newLikesText.value.split(",")];
  //create a body to send with the request
  let body = {
    firstName: newFirstInput.value,
    lastName: newLastInput.value,
    gender: newGenderDropDown.value,
    age: newAgeInput.value,
    likes: newLikes,
  };
  axios
    .post(`${baseURL}/character`, body)
    .then((res) => {
      res.data.map((char) => createCharacterCard(char));
    })
    .catch((err) => console.log(err));
  //clear out the input fields for the form
  newFirstInput.value = "";
  newLastInput.value = "";
  newGenderDropDown.value = "";
  newAgeInput.value = "";
  newLikes;
}
createForm.addEventListener("click", createNewChar);
