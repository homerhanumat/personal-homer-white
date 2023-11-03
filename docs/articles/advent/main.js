/***************************************************
 * Solution to Advent of Code, 2022, Day 1
 * (https://adventofcode.com/2022/day/1_)
 ***************************************************/

// We import the fs and path modules:
const fs = require("fs");
const path = require("path");

// The next line of code uses the path module.
//  __dirname gets the full name of the directory
// containing the file being run,
// and path.resolve puts it together with the second argument
// to get the full pathnamename of the input file:
let targetFile = path.resolve(__dirname, "input.txt");

// The next line of code uses the fs module.
// We can read in the file, and convrt it to a string:
const input = fs.readFileSync(targetFile).toString();

// We now make an array of the items:
const splitLines = str => str.split(/\n/);
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
console.log(maxPackTotal);
