'use strict';

const _ = require('underscore');
const fs = require('fs');

let lines = fs.readFileSync('Day5/inputs/input5.txt').toString().split("\n");
lines = _.map(lines, function(item) {
    let match = item.match(/([0-9]+)/g);
    return _.map(match, function(item) { return parseInt(item); });
});

let diagram = [];

_.each(lines, function(lineArray) {
    let line = {};

    if (lineArray[0] !== lineArray[2] && lineArray[1] !== lineArray[3]) return;

    line.x1 = (lineArray[0] < lineArray[2]) ? lineArray[0] : lineArray[2];
    line.x2 = (lineArray[0] < lineArray[2]) ? lineArray[2] : lineArray[0];
    line.y1 = (lineArray[1] < lineArray[3]) ? lineArray[1] : lineArray[3];
    line.y2 = (lineArray[1] < lineArray[3]) ? lineArray[3] : lineArray[1];

    for (let x = line.x1; x <= line.x2; x++) {
        for (let y = line.y1; y <= line.y2; y++) {
            let point = getPoint(x, y);
            point.lines += 1;
        }
    }
});

let result = 0;
_.each(diagram, function(point) {
   if (point.lines >= 2) result++;
});

console.log("Result :", result);


function getPoint(x, y) {
    let point = _.find(diagram, function(item) {
        return (item.x === x && item.y === y);
    });

    if (_.isUndefined(point)) {
        point = { x: x, y: y, lines: 0 }
        diagram.push(point);

    }

    return point;
}