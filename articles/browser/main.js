/***************************************************
 * Script to apply the Advent 2022-1
 * solution in the browser.
 * 
 * Idea adapted from:
 * https://plnkr.co/edit/DbBfnc6XaMppCvkEoqql
 * 
 * It was also helpful to study the documentation
 * on FileReader:
 * https://developer.mozilla.org/en-US/docs/Web/API/FileReader
 ***************************************************/

const fileInputElement = document.getElementById('fileInput');
fileInputElement.addEventListener('change', handleFileSelect);

function handleFileSelect(event) {
  const reader = new FileReader();
  reader.addEventListener("load", handleFileLoad);
  reader.readAsText(event.target.files[0]);
}

function handleFileLoad(event) {
  // the "event" here is the loading of
  // the file into the reader object
  // created in hndleFileSelect.
  // the target is that reader object,
  // and the result is the file read
  // in, as a string:
  const input = event.target.result;

  // We now make an array of the items:
  const splitLines = function(str) {
    return str.split(/\n/);
  };
  const caloriesAsStrings = splitLines(input);

  // The array is full of strings, so convert them to 
  // numbers.  Blank lines will be converted 
  // to NaN ("not a number").
  const calories = caloriesAsStrings.map(str => parseInt(str));

  // Make an array to hold the total calories for each pack:
  const packTotals = [];

  // One by one, pull items from the beginning of 
  // the calories array, making the pack totals:
  while (calories.length > 0) {
  let packTotal = 0;
  let currentItem = calories.shift();
  while (!isNaN(currentItem)) {
    packTotal += currentItem;
    currentItem = calories.shift();
  }
  packTotals.push(packTotal);
  }

  // Finally, we compute the maximum of the pack totals,
  // and report it to the console.
  // (Note the use of ... to spread the array
  // into arguments for the Math.max function!)
  let maxPackTotal = Math.max(...packTotals);
  let resultsReport = `The max pack-total is: ${maxPackTotal}.`;
  document.getElementById('result').textContent = resultsReport;
};


