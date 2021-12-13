'use strict';

const _ = require('underscore');
const fs = require('fs');

let dots = fs.readFileSync('Day13/inputs/input13.txt').toString().split("\n");
let folds = fs.readFileSync('Day13/inputs/input13folds.txt').toString().split("\n");

let sheet = { folds: [], dots: [] }

_.each(dots, function(dot) {
    const [x, y] = dot.split(',');
    sheet.dots.push({ x: +x, y: +y });
});

_.each(folds, function(fold) {
    const [match, type, line] = fold.match(/fold along ([xy]{1})=([0-9]+)/);
    sheet.folds.push({ type: type, line: +line });
});

const fold = sheet.folds[0];

_.each(sheet.dots, function(dot) {
    if (dot[fold.type] > fold.line) {
        dot[fold.type] = (fold.line * 2) - dot[fold.type];
    }
});

// Remove duplicates
sheet.dots = _.uniq(sheet.dots, false, function(item) { return item.x + '-' + item.y; });

console.log("Result :", sheet.dots.length);