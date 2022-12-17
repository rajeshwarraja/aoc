const puzzleInput = require('./input.js').day13

const sampleInput = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`

function convertToArray(value) {
    let result = []
    let level = 0
    let index = -1
    let stack = [result]
    while(++index < value.length) {
	if(value[index] === '[') {
	    if(++level > 1) {
		let values = []
		stack[stack.length - 1].push(values)
		stack.push(values)
	    }
	} else if(value[index] === ']') {
	    if(level-- > 1) {
		stack.pop()
	    }
	} else if(value[index] === ',') {
	    continue
	} else {
	    const end1 = value.indexOf(',', index)
	    const end2 = value.indexOf(']', index)
	    let end = end1 >= 0 && end2 >= 0? Math.min(end1, end2) : (end1 >= 0? end1 : end2)
	    stack[stack.length - 1].push(Number(value.slice(index, end)))
	    index = end - 1
	}
    }

    return result
}

function isCorrectOrder(left, right) {
    let index = -1
    const length = Math.max(left.length, right.length)
    while(++index < length) {
	if(index === right.length) return false
	if(index === left.length) return true
	
	let nextLeft = left[index]
	let nextRight = right[index]
	
	if(Array.isArray(nextLeft) || Array.isArray(nextRight)) {
	    if(Number.isInteger(nextLeft)) nextLeft = [nextLeft]
	    if(Number.isInteger(nextRight)) nextRight = [nextRight]
	    const result = isCorrectOrder(nextLeft, nextRight)
	    if(result === undefined) continue
	    return result
	} else {
	    if(nextLeft < nextRight) return true
	    if(nextLeft > nextRight) return false
	}
    }
    return undefined
}

function solvePart1(input) {
    return input.split('\n\n').reduce((sum, pair, index) => {
	const [left, right] = pair.split('\n').map(convertToArray)
	if(isCorrectOrder(left, right)) {
	    sum = sum + (index + 1)
	}
	return sum
    }, 0)
}

function solvePart2(input) {
    let packets = input.split('\n').filter((row) => row.length > 0).map(convertToArray)

    packets.push(convertToArray('[[2]]'), convertToArray('[[6]]'))

    return  packets.sort((left, right) => {
	const result = isCorrectOrder(left, right)
	if(result === undefined) return 0
	if(result) return -1
	return 1
    }).reduce((key, packet, index) => {
	const packetString = JSON.stringify(packet)
	if(packetString === '[[2]]' || packetString === '[[6]]')
	    return key = key * (index + 1)

	return key
    }, 1)
}

function run() {
    console.log('********* Day 13 *********')
    console.log(`Part 1: ${solvePart1(puzzleInput)}`)
    console.log(`Part 2: ${solvePart2(puzzleInput)}`)
}

module.exports = {
    run: run
}
