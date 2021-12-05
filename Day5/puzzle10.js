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
    let line = {
        x1: lineArray[0],
        y1: lineArray[1],
        x2: lineArray[2],
        y2: lineArray[3]
    };

    let x = line.x1;
    let y = line.y1;
    let stop = false;

    while(true) {
        let point = getPoint(x, y);
        point.lines += 1;

        if (stop) break;

        x = (x < line.x2) ? x + 1 : (x > line.x2) ? x - 1 : x;
        y = (y < line.y2) ? y + 1 : (y > line.y2) ? y - 1 : y;

        stop =  (x === line.x2 && y === line.y2);
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