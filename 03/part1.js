'use strict';

const _ = require('underscore');
const fs = require('fs');

let numbers = fs.readFileSync('03/inputs/input.txt').toString().split("\n");
numbers = _.filter(numbers, function(item) { return (_.isString(item) && item.length > 0); });

let gammaRate = "000000000000".split('');
let epsilonRate = "000000000000".split('');
let rate = "000000000000".split('');
let total = numbers.length;

_.each(numbers, function(currentNumber) {
    const currentNumberArray = currentNumber.split('');

    for (let index = 0; index < currentNumberArray.length; index++) {
        if (currentNumberArray[index] === "1") rate[index]++;
    }
});

for (let index = 0; index < rate.length; index++) {
    if (rate[index] > total/2) gammaRate[index] = 1;
    else epsilonRate[index] = 1;
}

// Convert array to binary string then to decimal
gammaRate = parseInt(gammaRate.join(''), 2);
epsilonRate = parseInt(epsilonRate.join(''), 2);

console.log("Result :", gammaRate * epsilonRate);