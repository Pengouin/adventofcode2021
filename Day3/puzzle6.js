'use strict';

const _ = require('underscore');
const fs = require('fs');

let numbers = fs.readFileSync('Day3/inputs/input3.txt').toString().split("\n");
numbers = _.filter(numbers, function(item) { return (_.isString(item) && item.length > 0); });

let oxygenRating = findRating(numbers, '0', '1');
let co2Rating = findRating(numbers, '1', '0');

console.log("Result :", oxygenRating * co2Rating);


function findRating(numbers, filterZero, filterOne) {
    let numbersClone = [...numbers];

    for (let index = 0; index < 12; index++) {
        const countOne = countOneAtIndex(numbersClone, index);
        const total = numbersClone.length;
        let filter;

        if (countOne === total) filter = '1';
        else if (countOne === 0) filter = '0';
        else if (countOne > total/2) filter = filterOne;
        else if (countOne === total/2) filter = filterOne;
        else filter = filterZero;

        numbersClone = _.filter(numbersClone, function(item) { return (item[index] === filter) });
    }

    return parseInt(numbersClone[0], 2);
}


function countOneAtIndex(numbers, index) {
    let counter = 0;

    _.each(numbers, function(currentNumber) {
        if (currentNumber[index] === '1') counter++;
    });

    return counter;
}