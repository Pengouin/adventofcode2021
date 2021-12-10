'use strict';

const _ = require('underscore');
const fs = require('fs');

let map = fs.readFileSync('Day9/inputs/input9.txt').toString().split("\n");
map = _.map(map, function(item) { return item.split(''); });

let riskSum = 0;

for (let x = 0; x < map.length; x++) {
    for (let y = 0; y < map[x].length; y++) {
        let right = ((x+1 >= map.length) || (map[x][y] < map[x+1][y]));
        let left = ((x-1 < 0) || (map[x][y] < map[x-1][y]));
        let up = ((y+1 >= map[x].length) || (map[x][y] < map[x][y+1]));
        let down = ((y-1 < 0) || (map[x][y] < map[x][y-1]));

        if(right && left && up && down) riskSum += parseInt(map[x][y]) + 1;
    }
}

console.log("Result :", riskSum);