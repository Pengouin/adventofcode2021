'use strict';

const _ = require('underscore');
const fs = require('fs');

let energyLevels = fs.readFileSync('11/inputs/input.txt').toString().split("\n");
energyLevels = _.map(energyLevels, function(item) { return item.split(''); });

energyLevels = _.map(energyLevels, function(lines) {
   return _.map(lines, function(item) { return +item });
});

let flashsCount = 0;

for (let step = 1; step <= 100; step++) {

    // Increment energy by one for all octopuses
    for(let x = 0; x < energyLevels.length; x++) {
        for(let y = 0; y < energyLevels[x].length; y++) {
            energyLevels[x][y] += 1;
        }
    }

    let alreadyFlashed = [];
    for(let x = 0; x < energyLevels.length; x++) {
        alreadyFlashed[x] = [];
    }

    // Flash if > 9 and flash only once
    let moreFlash;
    do {
        moreFlash = false;
        for(let x = 0; x < energyLevels.length; x++) {
            for(let y = 0; y < energyLevels[x].length; y++) {
                if (energyLevels[x][y] > 9 && !alreadyFlashed[x][y]) {
                    alreadyFlashed[x][y] = true;
                    energyLevels[x][y] = 0;
                    moreFlash = true;
                    flashsCount += 1;

                    for(let x2 = x - 1; x2 <= x + 1; x2++) {
                        for(let y2 = y - 1; y2 <= y + 1; y2++) {
                            if((x2 !== x || y2 !== y) && energyLevels[x2] && energyLevels[x2][y2] !== undefined && !alreadyFlashed[x2][y2]) {
                                energyLevels[x2][y2] += 1;
                            }
                        }
                    }

                }
            }
        }
    }
    while (moreFlash);
}

console.log("Result :", flashsCount);
