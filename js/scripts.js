
// get the search button
const searchButton = document.getElementById('searchButton');
// Get the searchInput text field
const searchInput = document.getElementById("searchInput");



// 1)  Execute a function when the user releases a key on the keyboard, or
// presses the search button.
searchInput.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("searchButton").click();
  }
});


// 2)
/*
on button click, script will fire that
1) searches the array of objects and if search term toLowerCase() is found, will return
the value of the object.
2) builds the page with radio buttons (for meansurement units) according to the <state> key of the ingredientData element
3) includes two versions of the output div according to the <state> key.  one for volume measurement, one for solid.
4) includes a checkbox to commit selection, and an add button to move the ingredient to the staging area, and reset
5) the output div area for another search term.


*/

searchButton.addEventListener('click', () => {
// search function that returns object data by user input into the search box.

// this is without ES2015 arrow function, but still works fine.
// function isResult(ingredient) {
//   let searchInputValue = searchInput.value;
//   return ingredient.name === searchInputValue;
// }
//
// console.log(ingredientData.find(isResult));

// arrow function ES2015 for a search result pending on user input via a search text box.
const result = ingredientData.find( ingredient => ingredient.name === searchInput.value.toLowerCase());
console.log(result);
let resultIndex = ingredientData.indexOf(result);
console.log(ingredientData.indexOf(result));
console.log(resultIndex);

// const ingredientSearchResult = document.getElementById('ingredientSearchResult');

// this bit of pure javaScript clears the div so that a new element may be displayed
// const clearDiv = document.getElementById('nutrientInfo');
// clearDiv.innerHTML = '';


// jQuery that clears the div so that new content may be displayed.
$('#nutrientInfo').html('');

// display message to user according to search result.
if(result === undefined){
  ingredientSearchResult.innerHTML = searchInput.value + " is not in our database at this time.  Please search again.";
} else {   // preface inquiries with result to get the returned search item: example.  result.ingredient or result.unit
  ingredientSearchResult.innerHTML = "Ingredient : " + result.ingredient;

  // building the nutrientInfo html for the header area
  const nutrientInfoP = $(`<p>${result.ingredient}</p>
                           <ul class="inlineUl">
                              <li>Calories: ${result.calories}</li>
                              <li>Vitamin A: ${result.vitamin_A} % USRDA</li>
                              <li>Vitamin A: ${result.potassium} % USRDA</li>
                           </ul>
                           <ul class="inlineUl">
                              <li>Calories: ${result.calories}</li>
                              <li>Vitamin A: ${result.vitamin_A} % USRDA</li>
                              <li>Vitamin A: ${result.potassium} % USRDA</li>
                           </ul>
                           <ul class="inlineUl">
                              <li>Calories: ${result.calories}</li>
                              <li>Vitamin A: ${result.vitamin_A} % USRDA</li>
                              <li>Vitamin A: ${result.potassium} % USRDA</li>
                           </ul>
                           <ul class="inlineUl">
                              <li>Calories: ${result.calories}</li>
                              <li>Vitamin A: ${result.vitamin_A} % USRDA</li>
                              <li>Vitamin A: ${result.potassium} % USRDA</li>
                           </ul>
                           <ul class="inlineUl">
                              <li>Calories: ${result.calories}</li>
                              <li>Vitamin A: ${result.vitamin_A} % USRDA</li>
                              <li>Vitamin A: ${result.potassium} % USRDA</li>
                           </ul>`);
  $('#nutrientInfo').append(nutrientInfoP);





  nutrientInfoP.hide().delay(1000).slideDown();


}




// test for <state> and build out an html element list
if(result.state === 'Liquid'){
  // grab the liquidHTML div
  const stateHTML = document.getElementById('stateHTML');
  // [this group selects the radio button elements that will be used to capture unit measurements]

  // create html for this group.
  stateHTML.innerHTML = `
      <input type="radio"  name="liquidRadio" value="Fluid Ounces" checked> Fluid Ounces<br>
      <input type="radio"  name="liquidRadio" value="Milliliters"> Milliliters<br>
      <input type="radio"  name="liquidRadio" value="Teaspoons"> Teaspoons<br>
      <input type="radio"  name="liquidRadio" value="Tablespoons"> Tablespoons<br>

      <input type='text' id='amountTextInput' placeholder="Numerical value">
      <input type="checkbox" id="checkbox" title="Commit Selection" onclick="populateIngredientArray(ingredientData[${resultIndex}], 'checkbox', ingredientSearchResult, amountTextInput)">
      <div id='add'>
            <button id='addButton' onclick="addItem(ingredientData[${resultIndex}])">Add this item</button>
      </div>
      <div id='calculate'>
            <button id='calculateButton' onclick="calculateNutrient2(stagingIngredientArray)">Calculate Meal</button>
      </div>
  `;
} else {

    stateHTML.innerHTML = `
      <input type="radio"  name="solidRadio" value="Ounces" checked>  Ounces<br>
      <input type="radio"  name="solidRadio" value="Grams"> Grams<br>

      <input type='text' id='amountTextInput'>
      <input type="checkbox" id="checkbox" title="Commit Selection" onclick="populateIngredientArray(ingredientData[${resultIndex}], 'checkbox', ingredientSearchResult, amountTextInput)">
      <div id='add'>
            <button id='addButton' onclick="addItem(ingredientData[${resultIndex}])">Add this item</button>
      </div>
      <div id='calculateDiv'>
            <button id='calculateButton' onclick="calculateNutrient2(stagingIngredientArray)">Calculate Meal</button>
      </div>
  `;
}
});






// 3)  this function informs the values of the ingredient object.

// this function runs if the checkbox with id #checkbox is clicked

// will be using checkboxes for pushing selected ingredients to this array of ingredientObjects for calculations.
const ingredientArray = [];

// get the ingredientSearchResult paragraph
const ingredientSearchResult = document.getElementById('ingredientSearchResult');

populateIngredientArray = (ingredientObject, checkboxId, ingredientSearchResult, amountInput) => {
  // Get the checkbox
  const checkBox = document.getElementById(checkboxId);
  //  [this group selects the text input elements that will be used to input ingredient amounts]
  const amountTextInput = document.getElementById('amountTextInput');
  // If the checkbox is checked, display the output text
  if (checkBox.checked === true){
    if (isNaN(parseFloat(amountInput.value))){
      ingredientSearchResult.innerHTML ="That is not a number.  Enter a number and check the checkbox.";
    }
    else {
      ingredientSearchResult.innerHTML ="Ingredient : " + ingredientObject.ingredient;
    }
    // put the value of the parsedFloat textbox into the object key <amount>
    ingredientObject.amount = parseFloat(amountInput.value);

    const liquidRadioGroup = document.querySelectorAll('[name=liquidRadio]');
    const solidRadioGroup = document.querySelectorAll('[name=solidRadio]');

    if (ingredientObject.state === 'Liquid'){
      // check to see which radio button is selected and place its value into the object key <unit>
      for(let i = 0; i < liquidRadioGroup.length; i++){
        if (liquidRadioGroup[i].checked){
          ingredientObject.unit = liquidRadioGroup[i].value;
        }
      }
    } else {
        // check to see which radio button is selected and place its value into the object key <unit>
        for(let i = 0; i < solidRadioGroup.length; i++){
          if (solidRadioGroup[i].checked){
            ingredientObject.unit = solidRadioGroup[i].value;
          }
        }
     }
    // push the object onto an array so that the Calculate2 function can process the array.
    ingredientArray.push(ingredientObject);
    ingredientSearchResult.style.color = 'blue';


  } else {
    // returns the index [i] of the <tomatoIngredient> in the <ingredientArray>
    let removeIngredient = ingredientArray.indexOf(ingredientObject);
    // removes the <tomatoIngredient>  found at its index from the <ingredientArray> and stores the value in the variable <removed>
    const removed = ingredientArray.splice(removeIngredient, 1);
    ingredientSearchResult.style.color = 'black';
  }

}




// 4)  this function pushes an ingredient object onto a staging array for use in calculating the results.
//     also clears the input boxes and checkboxes for next item.

// this array will hold a list of objects to be passed into the calculate meal button function.
const stagingIngredientArray = [];


const addItem = (ingredientArray) => {

  checkBox = document.getElementById('checkbox');

  if (checkBox.checked === true){

    // arrow function ES2015 for a search result: i am comparing the result of the current ingredientArray name against
    // arrayNames currently pushed to the stagedIngredientArray.  If the result is undefined, I know I don't have any
    // duplicates so I can push the value onto the stagedIngredientArray.  if it is not undefined, the index of the object pushed
    //  will be the same, but the particular values will be overwritten. In this way, I won't have duplicates of the same item.
    // i kinda lucked into this but I'm happy to have done so. :)
    const result1 = stagingIngredientArray.find( ingredient => ingredient.name === ingredientArray.name.toLowerCase());

    console.log(result1);

    if(result1 === undefined){
      stagingIngredientArray.push(ingredientArray);
      const $itemRemoveButton = (`<li>${ingredientArray.ingredient}<button class="remove">Remove</button></li>`);
      // append paragraph to the body element
      $('.stagingUl').append($itemRemoveButton);
      amountTextInput.value = '';
      checkBox.checked = false;
      searchInput.value = '';
      ingredientSearchResult.style.color = 'black';
    }
    else {
      amountTextInput.value = '';
      checkBox.checked = false;
      searchInput.value = '';
      ingredientSearchResult.style.color = 'black';
    }

  }
}


// 5)     remove event that updates the array and removes the items from the staging area

// instead of using event.target i can type <this>.  they are equivalent.

$('.stagingUl').on('click', 'button', function(event){
  const removeButton = $('.remove');
  const li = event.target.parentNode;
  if(event.target.className == 'remove'){
    for(let i = 0; i < removeButton.length; i++){
      if(removeButton[i] == event.target){
        console.log('button ' + i + ' was pressed');
        stagingIngredientArray.splice(i, 1);
        console.log(stagingIngredientArray);
      }
    }
  }
  $(li).remove();

});



// 6)  function that calculates the values of the ingredients in the array passed to it
//     function will output values.  TODO:  need to output detailed results up top in the black area.

//  create a print function to write to the DOM using getElementByID
const print1 = message => document.getElementById('output').innerHTML = message;



// compute the value of the nutrient per ounce of ingredient and make allowances in the script for different unit measurements.
// will use a form to add values to each object like so:    tomatoIngredient.Measurment_Unit = 'Ounces';   and tomatoIngredient.Amount = 2;
// TODO:  add checks to ensure that numbers were entered into the appropriate form boxes.

// function for calculating the modified value of a nutrient and formatting to 2 decimal places:
// uses parseFloat to take input from form from string to float for math processing, then back to string upon formatting 2 decimal places with .toFixed(2)
const modifiedNutrient = (nutrient, amount) => parseFloat(nutrient * amount).toFixed(2);

// function for calculating the modified value of a nutrient and formatting to 2 decimal places:
// uses parseFloat to take input from form from string to float for math processing, then back to string upon formatting 2 decimal places with .toFixed(2)
const modifiedNutrientTotal =  amount => parseFloat(amount).toFixed(2);

// create a function that
//  1  loops through all of the items in the var ingredientArray array and computes the modified values of user input amounts and unit measurements,
//  2  builds a string that can be printed to an html page dynamically
//  3  prints to the page using the print(message) function

const calculateNutrient2 = objectArray => {

  // declare and initialize total nutrient variables: the point of these variables is to show total value of various nutrients so that the entire meal may be
  // analyzed for total nutrients.

  let total_Vitamin_A = 0;
  let total_Potassium = 0;


  // build the output data string:   later I can refactor the htmlData string using string interpolation like so:   htmlData += `<h1>Hello ${someVariableName} more words</h1>`;   those `` are backticks not single quotes.
  let htmlData = '<h1>Meal Profile:</h1>';

  // iterate through each array element, which is an object, and continue building the output string.
  for ( let i = 0; i < objectArray.length; i++){

    // assign  data access to abbreviated variable names to save typing later in the script.
    const ingredientName = objectArray[i].ingredient;
    let amount = objectArray[i].amount;
    const measurementUnit = objectArray[i].unit;

    htmlData += '<h2>Ingredient : ' + ingredientName + '</h2>';
    htmlData += '<ul><li>Amount : ' + amount + ' ' + measurementUnit + '</li>';

    //  add remaining nutrients as time allows
    const vitamin_A = objectArray[i].vitamin_A;
    const potassium = objectArray[i].potassium;

    // next test for unitMeasurement and calculate accordingly.

    if( measurementUnit === 'Grams' ){
      // gram conversion: 1 gram = .035274 ounces.
      amount *= 0.035274;

    } else if (measurementUnit === 'Ounces'){
      // the base ratio of nutrient values stored in the dry ingredient objects will be calculated assuming ounces
      amount *= 1;
      // the following 4 measurements (fluid ounces, milliliters, teaspoons, tablespoons) will only apply to volume measurements as they relate to fluid ounces.
    } else if (measurementUnit === 'Fluid Ounces'){
      amount *= 1;
    } else if (measurementUnit === 'Milliliters'){
      amount *= 0.033814;
    } else if (measurementUnit === 'Teaspoons'){
      amount *= 0.166667;
    } else if (measurementUnit === 'Tablespoons'){
      amount *= 0.5;
    } else throw new Error("That measurement unit is not recognized.  The program is broken! :) ");


    // perform the calculations using the modifiedNutrient function and store in the htmlData variable.
    // this bit formats the amount * nutrient value to a string with 2 decimal places.
    const modifiedVitaminA = modifiedNutrient(vitamin_A, amount);
    const modifiedPotassium = modifiedNutrient(potassium, amount);

    // print each single ingredient nutrient value to the page.
    htmlData += '<li>Vitamin A : ' + modifiedVitaminA + ' % USRDA</li>';
    htmlData += '<li>Potassium : ' + modifiedPotassium + ' % USRDA</li>';

    // uses parseFloat() to store string as a float so that we can add multiple sources of each nutrient from each ingredient object pushed to the objectArray.
    total_Vitamin_A += parseFloat(modifiedVitaminA);
    total_Potassium += parseFloat(modifiedPotassium);

    // complete the html with a closing </ul> tag.
    htmlData += '</ul>';
  }

    // create an html string for total nutrients and place here outside the for loop.

    htmlData += '<h3>Total Vitamin A for this meal satisfies ' + modifiedNutrientTotal(total_Vitamin_A) + ' % USRDA.</h3>';
    htmlData += '<h3>Total Potassium for this meal satisfies ' + modifiedNutrientTotal(total_Potassium) + ' % USRDA.</h3>';

    // this function prints to the outputDiv div on the html page.
    print1(htmlData);
}
