'use strict';

const _ = require('underscore');
const fs = require('fs');

const commandRegex = /([a-z]+) ([0-9]+)/i;

let commands = fs.readFileSync('02/inputs/input.txt').toString().split("\n");

let horizontal = 0;
let depth = 0;
let aim = 0;

_.each(commands, function(currentCommand) {
    const match = currentCommand.match(commandRegex);

    if (!match) return;

    const command = match[1];
    const value = parseInt(match[2]);

    switch(command) {
        case 'forward':
            horizontal += value;
            depth += value * aim;
            break;
        case 'down':
            aim += value;
            break;
        case 'up':
            aim -= value;
            break;
    }
});

console.log("Result :", horizontal * depth);