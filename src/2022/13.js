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

function get(value) {
    let result = []
    let level = 0
    let index = -1
    let stack = [result]
    while(++index < value.length) {
	// console.log(`Value: ${value[index]} @ ${index}`)
	if(value[index] === '[') {
	    if(++level > 1) {
		let values = []
		stack[stack.length - 1].push(values)
		stack.push(values)
	    }
	    // console.log(`  > ${level}`)	    
	} else if(value[index] === ']') {
	    if(level-- > 1) {
		stack.pop()
	    }
	    
	    // console.log(`  < ${level}`)
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
    // console.log(`Compare ${JSON.stringify(left)} vs ${JSON.stringify(right)}`)
    
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
	    // console.log(`  Compare ${JSON.stringify(nextLeft)} vs ${JSON.stringify(nextRight)}`)
	    if(nextLeft < nextRight) return true
	    if(nextLeft > nextRight) return false
	}
    }
    return undefined
}

function solvePart1(input) {
    return input.split('\n\n').reduce((sum, pair, index) => {
	const [left, right] = pair.split('\n').map(get)
	if(isCorrectOrder(left, right)) {
	    // console.log('Right order')
	    sum = sum + (index + 1)
	} else {
	    // console.log('Not in right order')
	}
	// console.log()
	return sum
    }, 0)
}

function solvePart2(input) {

}

function run() {
    console.log('********* Day 13 *********')
    console.log(`Part 1: ${solvePart1(puzzleInput)}`)
    console.log(`Part 2: ${solvePart2(sampleInput)}`)
}

module.exports = {
    run: run
}
