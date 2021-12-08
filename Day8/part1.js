'use strict';

const _ = require('underscore');
const fs = require('fs');

/**
 * 0 : 6 segments
 * 1 : 2 segments <-
 * 2 : 5 segments
 * 3 : 5 segments
 * 4 : 4 segments <-
 * 5 : 5 segments
 * 6 : 6 segments
 * 7 : 3 segments <-
 * 8 : 7 segments <-
 * 9 : 6 segments
 */

let displays = fs.readFileSync('Day8/inputs/input8.txt').toString().split("\n");

displays =_.map(displays, function(display) {
    let match = display.match(/([a-g]+)/gi);
    match = _.map(match, function(item) { return item.split('').sort().join(''); });
    return {
        patterns: match.slice(0, 10),
        digits: match.slice(10),
    }
});

let counter = 0;
_.each(displays, function(display) {
   _.each(display.digits, function(digit) {
       let digitSegments = digit.length;
       if (digitSegments !== 5 && digitSegments !== 6) counter++;
    })
});

console.log("Result :", counter);
