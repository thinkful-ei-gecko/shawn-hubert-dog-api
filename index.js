/* eslint-disable no-undef */
/* eslint-disable no-console */

'use strict';


//SINGLE DOG FETCH
function getDogImage(numDogs) {
  console.log('getDogImage ran');
  fetch(`https://dog.ceo/api/breeds/image/random/${numDogs}`)
    .then(response => response.json())
    .then(responseJson => 
      displayResults(responseJson))
    .catch(error => alert('Something went wrong. Try again later.'));
}

function displayResults(responseJson) {
  console.log(responseJson);
  //replace the existing image with the new one
  $('.results').empty();
  responseJson.message.forEach(img => {
    //console.log(img);
    $('.results').append(
      `<img src="${img}" class="results-img">`
    );
  });
}

function displayBreedResult(responseJson) {
  console.log(responseJson);
  //replace the existing image with the new one
  $('.results').empty();
  let img = responseJson.message;
    $('.results').append(
      `<img src="${img}" class="results-img">`
    );
}


//MULTI DOG SUBMIT HANDLER
function handleManyDogSubmit() {
  $('.fetchDog').on('click', '#single-dog', event => {
    event.preventDefault();
    console.log('handleManyDogSubmit ran');
    //console.log(event.currentTarget.val());
    const numDogs = $('#many-dogs').val();
    if(!numDogs){
      numDogs = 3;
      getDogImage(numDogs);
    } else {
      getDogImage(numDogs);
    }
  });
}

function callByBreed(breed) {
  //let breedResponse;
  fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
    .then(response => response.json())
    /*.then(responseJson => {
      if(responseJson.message === 'Breed not found (master breed does not exist)'){
        alert(`Breed "${breed}" not found!`);}})*/
    .then(responseJson => displayBreedResult(responseJson));
    //.catch(error => alert('Something went wrong. Try again later.'))
}


function searchBreedSubmit() {
  $('.findDog').on('click', '#find-breed-button', event => {
    event.preventDefault();
    console.log('searchBreedSubmit ran');
    const breed = $('#find-dogs').val().toLowerCase();
    console.log(`breed = ${breed}`);
    callByBreed(breed);
  });
}


function init() {
  handleManyDogSubmit();
  searchBreedSubmit();
}

$(init);
