'use strict';

const _ = require('underscore');
const fs = require('fs');

let randomNumbers = fs.readFileSync('04/inputs/random.txt').toString().split(",");
randomNumbers = _.map(randomNumbers, function(item) { return parseInt(item); });

let bingos = fs.readFileSync('04/inputs/bingo.txt').toString().split("\n");
bingos = _.filter(bingos, function(item) { return (item.length > 0) });

// Parsed bingos
let bingoParsed = [];

for (let bingoIndex = 0; bingoIndex < bingos.length; bingoIndex += 5) {
    let newLines = [];
    // Get lines
    for (let lineIndex = 0; lineIndex < 5; lineIndex++) {
        newLines[lineIndex] = bingos[bingoIndex + lineIndex].trim().split(/\s+/);
        newLines[lineIndex] = _.map(newLines[lineIndex], function(item) { return parseInt(item); });
    }
    // Get columns
    for (let columnIndex = 0; columnIndex < 5; columnIndex++) {
        newLines[columnIndex + 5] = [];
        for (let lineIndex = 0; lineIndex < 5; lineIndex++) {
            newLines[columnIndex + 5][lineIndex] = newLines[lineIndex][columnIndex];
        }
    }
    bingoParsed.push(newLines);
}

// Find last winning bingo
let winningNumbers = [];
let lastWinningBingoScore;
let alreadyWinBingo = [];

for (let randomIndex = 0; randomIndex < randomNumbers.length; randomIndex++) {
    winningNumbers.push(randomNumbers[randomIndex]);

    //Try all bingos
    for (let bingoIndex = 0; bingoIndex < bingoParsed.length; bingoIndex++) {
        const bingo = bingoParsed[bingoIndex];
        _.each(bingo, function(bingoLine) {
            const match = _.intersection(bingoLine, winningNumbers).length;
            if (match === 5 && alreadyWinBingo.indexOf(bingoIndex) < 0) {
                // We found a winner
                let allNumbers = bingo[0].concat(bingo[1], bingo[2], bingo[3], bingo[4]);
                allNumbers = _.difference(allNumbers, winningNumbers);
                const sum = allNumbers.reduce(function(a, b) { return a + b; }, 0);

                lastWinningBingoScore = sum * winningNumbers[winningNumbers.length - 1];
                alreadyWinBingo.push(bingoIndex);
            }
        });
    }
}

console.log("Result :", lastWinningBingoScore);
