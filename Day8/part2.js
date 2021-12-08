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
    match = _.map(match, function(item) { return item.split(''); });
    return {
        patterns: match.slice(0, 10),
        digits: match.slice(10),
    }
});


let result = 0;
_.each(displays, function(display) {
    let foundDigits = Array(10);

    // Find segments for 1
    foundDigits[1] = _.find(display.patterns, function(pattern) { return (pattern.length === 2); });

    // Find segments for 4
    foundDigits[4] = _.find(display.patterns, function(pattern) { return (pattern.length === 4); });

    // Found others digits
    _.each(display.patterns, function(pattern) {
        let oneSegmentsDiff = _.difference(foundDigits[1], pattern).length;
        let fourSegmentsDiff = _.difference(foundDigits[4], pattern).length;

        switch(pattern.length) {
            case 3:
                foundDigits[7] = pattern;
                break;
            case 5:
                if (oneSegmentsDiff == 0) foundDigits[3] = pattern;
                else if (fourSegmentsDiff == 2) foundDigits[2] = pattern;
                else foundDigits[5] = pattern;
                break;
            case 6:
                if (oneSegmentsDiff == 1) foundDigits[6] = pattern;
                else if (fourSegmentsDiff == 1) foundDigits[0] = pattern;
                else foundDigits[9] = pattern;
                break;
            case 7:
                foundDigits[8] = pattern;
                break;
        }
    });

    let displayValue = 0;
    _.each(display.digits, function(digit) {
        let value = _.findIndex(foundDigits, function(foundDigit) {
            return (foundDigit.sort().join('') === digit.sort().join(''));
        });
        displayValue = (displayValue * 10) + value;
    });

    result += displayValue;
});

console.log("Result :", result);
