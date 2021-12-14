'use strict';

const _ = require('underscore');
const fs = require('fs');

let dots = fs.readFileSync('13/inputs/input-dots.txt').toString().split("\n");
let folds = fs.readFileSync('13/inputs/input-folds.txt').toString().split("\n");

let sheet = { folds: [], dots: [] }

_.each(dots, function(dot) {
    const [x, y] = dot.split(',');
    sheet.dots.push({ x: +x, y: +y });
});

_.each(folds, function(fold) {
    const [match, type, line] = fold.match(/fold along ([xy]{1})=([0-9]+)/);
    sheet.folds.push({ type: type, line: +line });
});

_.each(sheet.folds, function(fold) {
    _.each(sheet.dots, function(dot) {
        if (dot[fold.type] > fold.line) {
            dot[fold.type] = (fold.line * 2) - dot[fold.type];
        }
    });
});

// Remove duplicates
sheet.dots = _.uniq(sheet.dots, false, function(item) { return item.x + '-' + item.y; });

sheet.sizeX = _.reduce(sheet.dots, function(memo, num) { return (num.x > memo) ? num.x : memo; }, 0);
sheet.sizeY = _.reduce(sheet.dots, function(memo, num) { return (num.y > memo) ? num.y : memo; }, 0);

// Display
for (let y = 0; y <= sheet.sizeY; y++) {
    for (let x = 0; x <= sheet.sizeX; x++) {
        const dot = _. find(sheet.dots, function(item) { return (item.x === x && item.y === y) });
        if (dot) process.stdout.write("#");
        else process.stdout.write(" ");
    }
    process.stdout.write("\n");
}