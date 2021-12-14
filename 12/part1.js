'use strict';

const _ = require('underscore');
const fs = require('fs');

let connections = fs.readFileSync('12/inputs/input.txt').toString().split("\n");
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
            if (cave !== 'start' && currentCave.visited.indexOf(cave) < 0) {
                let visited = currentCave.visited.slice();  // clone
                if(cave === cave.toLowerCase()) visited.push(cave);
                toVisit.push({ name: cave, visited: visited });
            }
        }
    }
}
while (toVisit.length > 0);

console.log("Result :", counter);

