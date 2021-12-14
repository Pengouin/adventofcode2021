'use strict';

const _ = require('underscore');
const fs = require('fs');

let polymer = fs.readFileSync('Day14/inputs/input14polymer.txt').toString();

let ruleLines = fs.readFileSync('Day14/inputs/input14pairs.txt').toString().split("\n");
let rules = {};
_.each(ruleLines, function(ruleLine) {
   let match = ruleLine.split(' -> ');
   rules[match[0]] = match[1];
});

for (let step = 0; step < 10; step++) {

    let newPolymer = polymer[0];

    for(let i = 0; i < polymer.length - 1; i++) {
        let match = polymer[i] + polymer[i + 1];
        newPolymer += rules[match] + polymer[i + 1];
    }

    polymer = newPolymer;
}

let counts = _.countBy(polymer, function(letter) { return letter; });
let min = Math.min.apply(null, Object.values(counts));
let max = Math.max.apply(null, Object.values(counts));

console.log("Result :", max - min);


