'use strict';

const _ = require('underscore');
const fs = require('fs');

let depths = fs.readFileSync('01/inputs/input.txt').toString().split("\n");
depths = _.map(depths, function(item) { return parseInt(item); });
depths = _.filter(depths, function(item) { return !_.isNaN(item); });

let increased = 0;

for (let index = 4; index < depths.length; index ++) {
    const currentSum = depths[index] + depths[index - 1] + depths[index - 2];
    const previousSum = depths[index - 1] + depths[index - 2] + depths[index - 3];

    if (currentSum > previousSum) increased++;
}

console.log("Result :", increased);
