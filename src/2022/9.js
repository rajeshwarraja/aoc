const puzzleInput = require('./input.js').day9

const sampleInput = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`

function traceTailPath(head, tail) {
    const dx = head.x - tail.x
    const dy = head.y - tail.y
    const adx = Math.abs(dx)
    const ady = Math.abs(dy)
    const dirx = adx > 0? dx / adx : 0
    const diry = ady > 0? dy / ady : 0
    let places = []

    for(let x = tail.x + dirx, y = tail.y + diry;
	x != head.x || y != head.y;
	x = x != head.x? x + dirx : x, y = y != head.y? y + diry : y)
	places.push({x,y})

    return places
}

function moveHead(head, move) {
    const dir = move[0]
    const len = Number(move.slice(2))
    switch(dir) {
    case 'R':
	head.y = head.y + len
	break
    case 'L':
	head.y = head.y - len
	break
    case 'U':
	head.x = head.x + len
	break
    case 'D':
	head.x = head.x - len
	break
    }
    return head
}

function getKnotPosition(rope, index) {
    if(rope.positions[index] === undefined) rope.positions[index] = [{x:0,y:0}]
    return rope.positions[index][rope.positions[index].length - 1]
}

function updateKnotPositions(rope, index, positions) {
    rope.positions[index].push(...positions)
}

function traceRope(rope, move) {
    updateKnotPositions(rope, 0, [moveHead(getKnotPosition(rope, 0), move)])

    for(let i = 0; i < rope.knots - 1; i++) {
	const head = getKnotPosition(rope, i)
	const tail = getKnotPosition(rope, i + 1)
	const path = traceTailPath(head, tail)

	console.log(`K${i}: ${head.x} ${head.y}`)
	
	updateKnotPositions(rope, i + 1, path)
    }

    const pos = getKnotPosition(rope, rope.knots - 1)
    console.log(`K${rope.knots - 1}: ${pos.x} ${pos.y}`)
    
    
    console.log()
    return rope
}

function solvePart1(input) {
    const rope = input.split('\n').reduce(traceRope, { knots: 2, positions: [] })
    uniquePlaces = new Set(rope.positions[rope.knots - 1].map((pos) => JSON.stringify(pos)))
    return uniquePlaces.size
}

const largerSampleInput = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`

function solvePart2(input) {    
    const rope = input.split('\n').reduce(traceRope, { knots: 10, positions: [] })
    uniquePlaces = new Set(rope.positions[rope.knots - 1].map((pos) => JSON.stringify(pos)))

    console.log(rope.positions[rope.knots - 1])
    
    return uniquePlaces.size
}

function run() {
    console.log('********* Day 9 **********')
    // console.log(`Part 1: ${solvePart1(puzzleInput)}`)
    console.log(`Part 2: ${solvePart2(puzzleInput)}`)
}

module.exports = {
    run: run
}
