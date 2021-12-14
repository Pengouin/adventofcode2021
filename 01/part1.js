'use strict';

const _ = require('underscore');
const fs = require('fs');

let depths = fs.readFileSync('01/inputs/input.txt').toString().split("\n");
depths = _.map(depths, function(item) { return parseInt(item); })
depths = _.filter(depths, function(item) { return !_.isNaN(item); });

let previousMeasurement;
let increased = 0;

_.each(depths, function(currentMeasurement) {
    if (!_.isUndefined(previousMeasurement)) {
        if (previousMeasurement < currentMeasurement) increased++;
    }
    previousMeasurement = currentMeasurement;
});

console.log("Result :", increased);
