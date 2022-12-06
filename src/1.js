const puzzleInput = require('./input.js').day1

const sampleInput = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`

const sumReducer = (sum, num) => sum + num

function solvePart1(input) {
    return Math.max(...input.split('\n\n').map((group) => group.split('\n').map(Number).reduce(sumReducer, 0)))
}

function solvePart2(input) {
    return input.split('\n\n').map((group) => group.split('\n').map(Number).reduce(sumReducer, 0)).sort((num1, num2) => num2 - num1).slice(0, 3).reduce(sumReducer, 0)
}

function run() {
    console.log('********* Day 1 **********')
    console.log(`Part 1: ${solvePart1(puzzleInput)}`)
    console.log(`Part 2: ${solvePart2(puzzleInput)}`)
}

module.exports = {
    run: run
}
