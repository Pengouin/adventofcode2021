'use strict';

const _ = require('underscore');
const fs = require('fs');

let crabs = fs.readFileSync('Day7/inputs/input7.txt').toString().split(",");
crabs = _.map(crabs, function(item) { return parseInt(item); });

let maxPosition = Math.max.apply(null, crabs);

let costs = [];
for (let i = 0; i <= maxPosition; i++) {
    costs.push(_.reduce(crabs, function(memo, position){ return memo + Math.abs(i - position); }, 0));
}

let result = Math.min.apply(null, costs);
console.log("Result :", result);