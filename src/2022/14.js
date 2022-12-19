const puzzleInput = require('./input.js').day14

const sampleInput = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`

function isRock(cave, point) {
    return cave.rocks.reduce((isRock, face) => face.reduce((isRock, to, index, arr) => {
	if(index === 0 || isRock) return isRock
	const from = arr[index - 1]
	if(to.x === from.x) {
	    const minY = Math.min(from.y, to.y)
	    const maxY = Math.max(from.y, to.y)
	    return to.x === point.x && (minY <= point.y && point.y <= maxY)
	} else if(to.y === from.y) {
	    const minX = Math.min(from.x, to.x)
	    const maxX = Math.max(from.x, to.x)
	    return to.y === point.y && (minX <= point.x && point.x <= maxX)
	} else throw new Error('Input data error')
    }, isRock), false)
}

function isSand(cave, point) {
    return cave.sands.some((s) => s.x === point.x && s.y === point.y)
}

function bounday(items) {
    const allX = items.map((p) => p.x).sort((n1, n2) => n1 - n2)
    const allY = items.map((p) => p.y).sort((n1, n2) => n1 - n2)
    const topRight = {x: allX[allX.length - 1], y: allY[0]}
    const bottomLeft = {x: allX[0], y: allY[allY.length - 1]}
    return [topRight, bottomLeft]
}

function isVoid(cave, point) {
    const [_, bottomLeft] = cave.bounday
    return point.y > bottomLeft.y
}

function render(cave) {
    const [topRight, bottomLeft] = cave.bounday
    console.log("TR:", topRight, " BL:", bottomLeft)

    for(let y = topRight.y; y <= bottomLeft.y; ++y) {
	let row = ''
	for(let x = bottomLeft.x; x <= topRight.x; ++x) {
	    if(isRock(cave, {x,y})) row += '#'
	    else if(isSand(cave, {x,y})) row += 'o'
	    else row+= '.'
	}
	console.log(row)
    }
}

function drop(cave, sand) {
    if(sand === undefined) return
    
    if(isVoid(cave, sand)) {
	return null
    }

    let next
    if(!isRock(cave, sand) && !isSand(cave, sand)) {
	next = drop(cave, {x:sand.x, y:sand.y+1})
	if(next === undefined) next = drop(cave, {x:sand.x-1,y:sand.y+1})
	if(next === undefined) next = drop(cave, {x:sand.x+1,y:sand.y+1})
	if(next === undefined) next = sand
    }
    return next
}

function constructCave(input) {
    const rocks = input.split('\n').map((line) => line.split(' -> ').map((point) => {
	const [x,y] = point.split(',').map(Number)
	return {x,y}
    }))

    return {
	rocks: rocks,
	sands: [],
	bounday: bounday(rocks.flatMap((face) => face))
    }
}

function fillCave(cave) {
    for(;;) {
	const rest = drop(cave, {x:500,y:0})
	if(rest) cave.sands.push(rest)
	else break
    }
    return cave.sands.length    
}

function solvePart1(input) {
    const cave = constructCave(input)
    return fillCave(cave)
}

function solvePart2(input) {
    const cave = constructCave(input)
    // Add floor
    const [topRight, bottomLeft] = cave.bounday
    cave.rocks.push([
	{x:bottomLeft.x - 200, y:bottomLeft.y + 2},
	{x:topRight.x + 200, y:bottomLeft.y + 2}
    ])
    cave.bounday = bounday(cave.rocks.flatMap((face) => face))
    const count = fillCave(cave)
    return count
}

function run() {
    console.log('********* Day 14 *********')
    console.log(`Part 1: ${solvePart1(sampleInput)}`)
    console.log(`Part 2: ${solvePart2(sampleInput)}`)
}

module.exports = {
    run: run
}
