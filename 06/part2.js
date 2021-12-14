'use strict';

const _ = require('underscore');
const fs = require('fs');

let fishsList = fs.readFileSync('06/inputs/input.txt').toString().split(",");
fishsList = _.map(fishsList, function(item) { return parseInt(item); });

let fishs = Array(9).fill(0, 0);

_.each(fishsList, function(fishAge) {
    fishs[fishAge] += 1;
});

for (let day = 0; day < 256; day++) {
    let splittingFishs = fishs[0];
    fishs = fishs.slice(1);

    fishs[8] = splittingFishs;
    fishs[6] += splittingFishs;
}

let sum = _.reduce(fishs, function(memo, num){ return memo + num; }, 0);
console.log("Result :", sum);