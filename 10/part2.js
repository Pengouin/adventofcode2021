'use strict';

const _ = require('underscore');
const fs = require('fs');

let chunks = fs.readFileSync('10/inputs/input.txt').toString().split("\n");

let scores = [];
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

    if (chunkPoints > 0) return;

    let completeScore = 0;
    for (let i = stack.length - 1; i >= 0; i--) {
        completeScore *= 5;
        switch(stack[i]) {
            case '(':
                completeScore += 1;
                break;
            case '<':
                completeScore += 4;
                break;
            case '{':
                completeScore += 3;
                break;
            case '[':
                completeScore += 2;
                break;
        }
    }

    scores.push(completeScore);
});

scores = scores.sort(function(a, b) {
    return a - b;
});

console.log("Result :", scores[Math.round(scores.length/2) - 1]);