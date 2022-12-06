const puzzleInput = require('./input.js').day5

const sampleInput = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`

function solvePart1(input) { }

function solvePart2(input) { }

function run() {
    console.log('********* Day 5 **********')
    console.log(`Part 1: ${solvePart1(puzzleInput)}`)
    console.log(`Part 2: ${solvePart2(puzzleInput)}`)
}

module.exports = {
    run: run
}
