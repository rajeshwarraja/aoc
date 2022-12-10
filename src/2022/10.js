const puzzleInput = require('./input.js').day10

const sampleInput = `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`

function solvePart1(input) {
    return input.split('\n').reduce((system, code, index) => {
        system.cycleValues.push(system.X)
	if(code.startsWith('addx')) {
	    system.X = system.X + Number(code.slice(5))
	    system.cycleValues.push(system.X)
	}
	return system
    }, { X:1, cycleValues: [1] }).cycleValues.map((x, index) => {
	return (index + 1) * x
    }).filter((value, index) => {
	index = index + 1
	return index === 20 || ((index - 20) % 40 === 0)
    }).reduce((sum, num) => sum + num, 0)
}

function solvePart2(input) {
    return '\n' + input.split('\n').reduce((system, code, index) => {
        system.cycleValues.push(system.X)
	if(code.startsWith('addx')) {
	    system.X = system.X + Number(code.slice(5))
	    system.cycleValues.push(system.X)
	}
	return system
    }, { X:1, cycleValues: [1] }).cycleValues.reduce((screen, value, index) => {
	const row = Math.floor(index / 40)
	const spritePos = index % 40
	if(screen[row] === undefined) screen[row] = ''
	if(Math.abs(spritePos - value) < 2) screen[row] += '#'
	else screen[row] += ' '
	return screen
    }, []).join('\n')
}

function run() {
    console.log('********* Day 10 *********')
    console.log(`Part 1: ${solvePart1(puzzleInput)}`)
    console.log(`Part 2: ${solvePart2(puzzleInput)}`)
}

module.exports = {
    run: run
}
