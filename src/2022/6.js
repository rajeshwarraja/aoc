const puzzleInput = require('./input.js').day6

const sampleInput = `mjqjpqmgbljsphdztnvjfqwrcgsmlb`

function solvePart1(input) {
    for(let i = 3; i < input.length; i++) {
	const sample = input.slice(i - 3, i + 1)
	const count = sample.split('').reduce((count, char) => {
	    if(count[char] === undefined) count[char] = 0
	    count[char]++
	    return count
	}, {})
	if(Object.keys(count).length === 4) return i + 1
    }
    throw new Error('No signal start found')
}

function solvePart2(input) {
    for(let i = 13; i < input.length; i++) {
	const sample = input.slice(i - 13, i + 1)
	const count = sample.split('').reduce((count, char) => {
	    if(count[char] === undefined) count[char] = 0
	    count[char]++
	    return count
	}, {})
	if(Object.keys(count).length === 14) return i + 1
    }
    throw new Error('No signal start found')
}

function run() {
    console.log('********* Day 6 **********')
    console.log(`Part 1: ${solvePart1(puzzleInput)}`)
    console.log(`Part 2: ${solvePart2(puzzleInput)}`)
}

module.exports = {
    run: run
}
