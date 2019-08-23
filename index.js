/* eslint-disable no-undef */
/* eslint-disable no-console */
'use strict';

//FETCH DOGS
function getDogImage(numDogs) {
  console.log(`getDogImage rand: numDogs = ${numDogs} and type = ${typeof numDogs}`);
  fetch(`https://dog.ceo/api/breeds/image/random/${numDogs}`)
    .then(response => response.json())
    .then(responseJson => 
      displayResults(responseJson))
    .catch(error => alert('Something went wrong. Try again later.'));
}

//FETCH BREED
function callByBreed(breed) {
  fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
    .then(response => response.json())
    .then(responseJson => displayBreedResult(responseJson));
}

//RENDER DOGS
function displayResults(responseJson) {
  console.log(responseJson);
  $('.results').empty();
  responseJson.message.forEach(img => {
    $('.results').append(
      `<img src="${img}" class="results-img">`
    );
  });
}

//RENDER BREED
function displayBreedResult(responseJson) {
  console.log(responseJson);
  if(responseJson.status === 'error'){
    alert('Breed not found!');
  }
  else{
    $('.results').empty();
    let img = responseJson.message;
    $('.results').append(
      `<img src="${img}" class="results-img">`
    );
  }
}

//DOG HANDLER
function handleManyDogSubmit() {
  $('.fetchDog').on('click', '#single-dog', event => {
    event.preventDefault();
    console.log('handleManyDogSubmit ran');
    let dogCount = $('#many-dogs').val();
    let numDogs = parseInt(dogCount, 10);
    console.log(`On click dogCount = ${dogCount} and type = ${typeof numDogs}`);
    console.log(`On click numDogs = ${numDogs} and type = ${typeof numDogs}`);
    if(numDogs === 0){
      alert(`You requested ${numDogs} dogs. Whyy not 3?`);
      numDogs = 3;
      getDogImage(numDogs);
      console.log(`in IF numDogs = ${numDogs}`);
    } 
    else if(numDogs > 50) {
      alert(`Only showing 50 if your requested ${numDogs} dogs!`);
      numDogs = 50;
      getDogImage(numDogs);
      console.log(`in ELSE IF numDogs = ${numDogs}`);
    }
    else{
      getDogImage(numDogs);
    }
  });
}

//BREED HANDLER
function searchBreedSubmit() {
  $('.findDog').on('click', '#find-breed-button', event => {
    event.preventDefault();
    console.log('searchBreedSubmit ran');
    const breed = $('#find-dogs').val().toLowerCase();
    console.log(`breed = ${breed}`);
    callByBreed(breed);
  });
}

//FETCH AVAILABLE BREEDS
function grabBreeds() {
  fetch('https://dog.ceo/api/breeds/list/all')
    .then(response => response.json())
    .then(responseJson => {
      populateDropdown(responseJson.message);})
    .catch(error => alert('Something went wrong. Try again later.'));
}

//BREED HANDLER
function populateDropdown(breedList) {
  let dropdown = $('#find-dogs');
  dropdown.empty();
  dropdown.append('<option selected="true" disabled>Select breed</option>');
  dropdown.prop('selectedIndex', 0);
  let breedKeys = Object.keys(breedList);
  breedKeys.forEach(key => {
    console.log(key);
    dropdown.append($(`<option>${key}</option>`).attr('value', key));
    breedList[key].forEach(subBreed => {
      let dropdownSub = `${key} (${subBreed})`;
      let formedDropdown = `${key}/${subBreed}`;
      dropdown.append($(`<option>${dropdownSub}</option>`).attr('value', formedDropdown));
    });
  });
}

//LISTENERS
function init() {
  handleManyDogSubmit();
  searchBreedSubmit();
  grabBreeds();
}

$(init);