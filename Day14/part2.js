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

let pairs = {};
for(let i = 0; i < polymer.length - 1; i++) {
    let pair = polymer[i] + polymer[i + 1];
    if (!pairs[pair]) pairs[pair] = 0;
    pairs[pair] += 1;
}

for (let step = 0; step < 40; step++) {

    let newPairs = {};

    _.each(pairs, function(value, pair) {
       let newLetter = rules[pair];

       let newPair1 = pair[0] + newLetter;
       if (!newPairs[newPair1]) newPairs[newPair1] = 0;
       newPairs[newPair1] += value;

       let newPair2 = newLetter + pair[1];
       if (!newPairs[newPair2]) newPairs[newPair2] = 0;
       newPairs[newPair2] += value;
    });

    pairs = newPairs;
}

let counts = {};
counts[polymer[0]] = 1;

_.each(pairs, function(value, pair) {
    if (!counts[pair[1]]) counts[pair[1]] = 0;
    counts[pair[1]] += value;
});

let min = Math.min.apply(null, Object.values(counts));
let max = Math.max.apply(null, Object.values(counts));

console.log("Result :", max - min);


