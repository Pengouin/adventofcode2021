'use strict';

const _ = require('underscore');
const fs = require('fs');

let crabs = fs.readFileSync('07/inputs/input.txt').toString().split(",");
crabs = _.map(crabs, function(item) { return parseInt(item); });

let maxPosition = Math.max.apply(null, crabs);

let costs = [];
for (let i = 0; i <= maxPosition; i++) {
    costs.push(_.reduce(crabs, function(memo, position) {
        let cost = Math.abs(i - position);
        return memo + (cost * (cost + 1) / 2);
    }, 0));
}

let result = Math.min.apply(null, costs);
console.log("Result :", result);