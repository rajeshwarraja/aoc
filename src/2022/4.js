const puzzleInput = require('./input.js').day4

const sampleInput = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`

function solvePart1(input) {
    function subSet(pair) {
	const [e1, e2] = pair
	return (e2[0] <= e1[0] && e1[1] <= e2[1]) || (e1[0] <= e2[0] && e2[1] <= e1[1])
    }

    return input.split('\n').map((pair) => pair.split(',').map((allot) => allot.split('-').map(Number))).reduce((count, pair) => subSet(pair)? count + 1 : count, 0)
}

function solvePart2(input) {
    function overlap(pair) {
	const [e1, e2] = pair
	return (e1[0] <= e2[0] && e1[1] >= e2[0]) || (e2[0] <= e1[0] && e2[1] >= e1[0])
    }

    return input.split('\n').map((pair) => pair.split(',').map((allot) => allot.split('-').map(Number))).reduce((count, pair) => overlap(pair)? count + 1 : count, 0)
}

function run() {
    console.log('********* Day 4 **********')
    console.log(`Part 1: ${solvePart1(puzzleInput)}`)
    console.log(`Part 2: ${solvePart2(puzzleInput)}`)
}

module.exports = {
    run: run
}
