'use strict';

const _ = require('underscore');
const fs = require('fs');

let chunks = fs.readFileSync('Day10/inputs/input10.txt').toString().split("\n");

let points = 0;
_.each(chunks, function(chunk) {
    let stack = [];
    let chunkPoints = 0;
    for (let i = 0; i < chunk.length && chunkPoints === 0; i++) {
        switch(chunk[i]) {
            case '(':
            case '<':
            case '{':
            case '[':
                stack.push(chunk[i]);
                break;
            case ')':
                if (stack.pop() !== '(') chunkPoints += 3;
                break;
            case '>':
                if (stack.pop() !== '<') chunkPoints += 25137;
                break;
            case '}':
                if (stack.pop() !== '{') chunkPoints += 1197;
                break;
            case ']':
                if (stack.pop() !== '[') chunkPoints += 57;
                break;
        }
    }

    points += chunkPoints;
});

console.log("Result :", points);