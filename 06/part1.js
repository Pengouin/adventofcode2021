'use strict';

const _ = require('underscore');
const fs = require('fs');

let fishs = fs.readFileSync('06/inputs/input.txt').toString().split(",");
fishs = _.map(fishs, function(item) { return parseInt(item); });


for (let day = 0; day < 80; day++) {
    let newFishs = [];
    fishs = _.map(fishs, function(fish) {
        if (fish === 0) {
            newFishs.push(8);
            return 6;
        }
        else {
            return fish - 1;
        }
    });

    fishs = fishs.concat(newFishs);
}

console.log("Result :", fishs.length);