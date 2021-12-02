'use strict';

const _ = require('underscore');
const fs = require('fs');

const commandRegex = /([a-z]+) ([0-9]+)/i;

let commands = fs.readFileSync('Day2/inputs/input2.txt').toString().split("\n");

let horizontal = 0;
let depth = 0;

_.each(commands, function(currentCommand) {
    const match = currentCommand.match(commandRegex);

    if (!match) return;

    const command = match[1];
    const value = parseInt(match[2]);

    switch(command) {
        case 'forward':
            horizontal += value;
            break;
        case 'down':
            depth += value;
            break;
        case 'up':
            depth -= value;
            break;
    }
});

console.log("Result :", horizontal * depth);