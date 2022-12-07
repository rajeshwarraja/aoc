const puzzleInput = require('./input.js').day2

const sampleInput = `A Y
B X
C Z`

const sumReducer = (sum, num) => sum + num

function solvePart1(input) {
    const scoreCard = {
	'A X': 4, 'A Y': 8, 'A Z': 3,
	'B X': 1, 'B Y': 5, 'B Z': 9,
	'C X': 7, 'C Y': 2, 'C Z': 6
    }
    return input.split('\n').map((game) => scoreCard[game]).reduce(sumReducer, 0)
}

function solvePart2(input) {
    const scoreCard = {
	'A X': 3, 'A Y': 4, 'A Z': 8,
	'B X': 1, 'B Y': 5, 'B Z': 9,
	'C X': 2, 'C Y': 6, 'C Z': 7
    }
    return input.split('\n').map((game) => scoreCard[game]).reduce(sumReducer, 0)
}

function run() {
    console.log('********* Day 2 **********')
    console.log(`Part 1: ${solvePart1(puzzleInput)}`)
    console.log(`Part 2: ${solvePart2(puzzleInput)}`)
}

module.exports = {
    run: run
}
