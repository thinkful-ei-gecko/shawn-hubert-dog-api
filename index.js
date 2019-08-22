'use strict';
//SINGLE DOG FETCH
function getDogImage() {
  console.log('getDogImage ran');
  fetch('https://dog.ceo/api/breeds/image/random')
    .then(response => response.json())
    .then(responseJson => 
      displayResults(responseJson))
    .catch(error => alert('Something went wrong. Try again later.'));
}

function displayResults(responseJson) {
  console.log(responseJson);
  //replace the existing image with the new one
  // $('.results-img').replaceWith(
  //   `<img src="${responseJson.message}" class="results-img">`
  // )
  //display the results section
  // $('.results').removeClass('hidden');
}

//SINGLE DOG BUTTON HANDLER
// function watchForm() {
//   $('.fetchDog').on('click', '#single-dog', event => {
//     event.preventDefault();
//     getDogImage();
//   });
// }

// $(function() {
//   console.log('App loaded! Waiting for submit!');
//   watchForm();
// });

//MULTI DOG FETCH
function getManyDogImages(numDogs) {
  console.log('getManyDogImages ran');
  fetch(`https://dog.ceo/api/breeds/image/random/${numDogs}`)
    .then(response => response.json())
    .then(responseJson => displayResults(responseJson))
    .catch(error => alert('Something went wrong. Try again later.'));
}

//MULTI DOG SUBMIT HANDLER
function handleManyDogSubmit() {
  $('.fetchDog').submit(event => {
    event.preventDefault();
    console.log('handleManyDogSubmit ran');
    //console.log(event.currentTarget.val());
    // const numDogs = event.currentTarget.val();
    // if(typeof numDogs !== 'number'){
    //   numDogs = 3;
    //   getManyDogImages(numDogs);
    // }
    // else{
    //   getManyDogImages(numDogs);
    // }
  });
};


  $(handleManyDogSubmit);


  // $('.js-shopping-list').on('click', '.js-item-delete', event => {
  //   let currentId = store.findById(event.currentTarget);
  //   store.findAndDelete(currentId);
  //   console.log('Item was deleted')
  //   render();
  // });
