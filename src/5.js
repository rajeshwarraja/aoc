const puzzleInput = require('./input.js').day5

const sampleInput = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`

function parseInput(input) {
    const [stacksStr, movesStr] = input.split('\n\n')
    const stacks = stacksStr.split('\n').reverse().slice(1).reduce((stacks, row) => {
	for(let i = 0; i < (row.length + 1) / 4; i++) {
	    if(stacks[i] === undefined) stacks[i] = []
	    const crate = row[(i * 4) + 1]
	    if(crate != ' ') stacks[i].push(crate)
	}
	return stacks
    }, [])
    const moves = movesStr.split('\n').map((move) => {
	const match = move.match(/move\s(\d+)\sfrom\s(\d+)\sto\s(\d+)/)
	return {count: Number(match[1]), from: Number(match[2]), to: Number(match[3])}
    })
    return [stacks, moves]
}

function solvePart1(input) {
    const [stacks, moves] = parseInput(input)
    moves.forEach((move) => {
	for(let i = 0; i < move.count; i++) {
	    stacks[move.to - 1].push(stacks[move.from - 1].pop())
	}
    })
    return stacks.reduce((tag, crates) => tag + crates[crates.length - 1], '')
}

function solvePart2(input) {
    const [stacks, moves] = parseInput(input)
    moves.forEach((move) => {
	const index = stacks[move.from - 1].length - move.count
	stacks[move.to - 1].push(...stacks[move.from - 1].slice(index))
	stacks[move.from - 1].splice(index)
    })
    return stacks.reduce((tag, crates) => tag + crates[crates.length - 1], '')    
}

function run() {
    console.log('********* Day 5 **********')
    console.log(`Part 1: ${solvePart1(puzzleInput)}`)
    console.log(`Part 2: ${solvePart2(puzzleInput)}`)
}

module.exports = {
    run: run
}
