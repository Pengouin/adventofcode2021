'use strict';

const _ = require('underscore');
const fs = require('fs');

let map = fs.readFileSync('Day9/inputs/input9.txt').toString().split("\n");
map = _.map(map, function(item) { return item.split(''); });

let bassins = [];

for (let x = 0; x < map.length; x++) {
    for (let y = 0; y < map[x].length; y++) {
        let right = (getPoint(map, x, y) < getPoint(map, x+1, y));
        let left = (getPoint(map, x, y) < getPoint(map, x-1, y));
        let up = (getPoint(map, x, y) < getPoint(map, x, y+1));
        let down = (getPoint(map, x, y) < getPoint(map, x, y-1));

        if(right && left && up && down) bassins.push({x: x, y: y});
    }
}

_.each(bassins, function(bassin) {
   let toVisit = [bassin];
   let visited = [];

   do {
       const {x, y} = toVisit.pop();

       if (isVisited(visited, x, y)) continue;

       if (getPoint(map, x+1, y) < 9 && !isVisited(visited, x+1, y)) toVisit.push({x: x+1, y: y});
       if (getPoint(map, x-1, y) < 9 && !isVisited(visited, x-1, y)) toVisit.push({x: x-1, y: y});
       if (getPoint(map, x, y+1) < 9 && !isVisited(visited, x, y+1)) toVisit.push({x: x, y: y+1});
       if (getPoint(map, x, y-1) < 9 && !isVisited(visited, x, y-1)) toVisit.push({x: x, y: y-1});

       visited.push({x: x, y: y});
   }
   while (toVisit.length > 0);

    bassin.size = visited.length;
});

bassins = _.sortBy(bassins, 'size').slice(-3);
const result = _.reduce(bassins, function(memo, item) { return memo * item.size }, 1);
console.log("Result :", result);

function isVisited(visited, x, y) {
    return (!_.isUndefined(_.find(visited, function(point) { return (point.x === x && point.y === y); })));
}


function getPoint(map, x, y) {
    if(!map[x])  return Infinity;
    else if(map[x][y] === undefined) return Infinity;
    else return parseInt(map[x][y]);
}
