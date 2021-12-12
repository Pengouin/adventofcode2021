'use strict';

const _ = require('underscore');
const fs = require('fs');

let connections = fs.readFileSync('Day12/inputs/input12.txt').toString().split("\n");
connections = _.map(connections, function(item) { return item.split('-'); });

let caves = {};
_.each(connections, function(connection) {
    caves[connection[0]] = caves[connection[0]] || [];
    caves[connection[0]].push(connection[1]);
    caves[connection[1]] = caves[connection[1]] || [];
    caves[connection[1]].push(connection[0]);
});

let toVisit = [{ name: 'start', visited: [] }];
let counter = 0;

do {
    const currentCave = toVisit.pop();
    if (currentCave.name === 'end') {
        counter++;
    }
    else {
        let connectedCaves = caves[currentCave.name];
        for (let cave of connectedCaves) {
            if (cave !== 'start') {
                let visited = currentCave.visited.slice();   // clone
                if(cave === cave.toLowerCase()) {
                    if (visited.indexOf(cave) < 0) {
                        visited.push(cave);
                        toVisit.push({ name: cave, visited: visited, twice: currentCave.twice });
                    }
                    else if (_.isUndefined(currentCave.twice)) {
                        toVisit.push({ name: cave, visited: visited, twice: cave });
                    }
                }
                else {
                    toVisit.push({ name: cave, visited: visited, twice: currentCave.twice });
                }
            }
        }
    }
}
while (toVisit.length > 0);

console.log("Result :", counter);

