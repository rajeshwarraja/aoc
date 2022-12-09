const puzzleInput = require('./input.js').day9

const sampleInput = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`

const largerSampleInput = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`

function renderPath(path) {
    const minX = Math.min(...path.map((p) => p.x))
    const minY = Math.min(...path.map((p) => p.y))
    const maxX = Math.max(...path.map((p) => p.x))
    const maxY = Math.max(...path.map((p) => p.y))

    const width = maxX - minX, height = maxY - minY
    const offX = Math.abs(minX), offY = Math.abs(minY)
    console.log(`${width}x${height} -> ${offX}, ${offY}`)

    const pathSet = new Set(path.map((p) => JSON.stringify(p)))    
    for(let x = 0; x <= width; ++x) {
	let row = ''
	for(let y = 0; y <= height; ++y) {
	    if(x === offX && y === offY) {
		row = row + 's'
	    } else {
		row = row + (pathSet.has(JSON.stringify({x:x-offX,y:y-offY}))? '#' : '.')
	    }
	}
	console.log(row)
    }
}

function tracePath(point, move) {
    let path = []
    switch(move.dir) {
    case 'R':
	for(let i = 1; i <= move.len; ++i) path.push({x:point.x+i, y:point.y})
	break
    case 'L':
	for(let i = 1; i <= move.len; ++i) path.push({x:point.x-i, y:point.y})
	break
    case 'U':
	for(let i = 1; i <= move.len; ++i) path.push({x:point.x, y:point.y+i})
	break
    case 'D':
	for(let i = 1; i <= move.len; ++i) path.push({x:point.x, y:point.y-i})
	break
    }
    return path
}

function lastPoint(path) { return path[path.length-1] }

function solvePart1(input) {
    const moves = input.split('\n').map((moveStr) => {
	const dir = moveStr[0]
	const len = Number(moveStr.slice(2))
	return { dir, len }
    })

    const rope = moves.reduce((rope, move) => {
	const steps = tracePath(lastPoint(rope[0]), move)

	for(const step of steps) {
	    rope[0].push(step)
	    for(let i = 1; i < rope.length; ++i) {
		const p0 = lastPoint(rope[i - 1])
		const p1 = lastPoint(rope[i])
		if(Math.abs(p0.x - p1.x) > 1) {
		    const dir = (p1.x - p0.x) / Math.abs(p1.x - p0.x)
		    rope[i].push({x:p0.x+dir,y:p0.y})
		} else if(Math.abs(p0.y - p1.y) > 1) {
		    const dir = (p1.y - p0.y) / Math.abs(p1.y - p0.y)
		    rope[i].push({x:p0.x,y:p0.y+dir})		    
		}
	    }
	}
	
	return rope
    }, [ [{x:0,y:0}],[{x:0,y:0}] ])

    const pointSet = new Set(rope[rope.length - 1].map(p => JSON.stringify(p)))
    return pointSet.size
}


function solvePart2(input) {    
    const moves = input.split('\n').map((moveStr) => {
	const dir = moveStr[0]
	const len = Number(moveStr.slice(2))
	return { dir, len }
    })

    const rope = moves.reduce((rope, move) => {
	const steps = tracePath(lastPoint(rope[0]), move)

	for(const step of steps) {
	    rope[0].push(step)
	    
	    for(let i = 1; i < rope.length; ++i) {
		const p0 = lastPoint(rope[i - 1])
		const p1 = lastPoint(rope[i])
		if(Math.abs(p0.x - p1.x) > 1 && Math.abs(p0.y - p1.y) > 1) {
		    const dirX = (p1.x - p0.x) / Math.abs(p1.x - p0.x)
		    const dirY = (p1.y - p0.y) / Math.abs(p1.y - p0.y)
		    rope[i].push({x:p0.x+dirX,y:p0.y+dirY})
		}
		else if(Math.abs(p0.x - p1.x) > 1) {
		    const dir = (p1.x - p0.x) / Math.abs(p1.x - p0.x)
		    rope[i].push({x:p0.x+dir,y:p0.y})
		} else if(Math.abs(p0.y - p1.y) > 1) {
		    const dir = (p1.y - p0.y) / Math.abs(p1.y - p0.y)
		    rope[i].push({x:p0.x,y:p0.y+dir})		    
		}
	    }
	}
	
	return rope
    }, [
	[{x:0,y:0}],[{x:0,y:0}],[{x:0,y:0}],[{x:0,y:0}],[{x:0,y:0}],
	[{x:0,y:0}],[{x:0,y:0}],[{x:0,y:0}],[{x:0,y:0}],[{x:0,y:0}]
    ])

    // renderPath(rope[9])

    const pointSet = new Set(rope[rope.length - 1].map(p => JSON.stringify(p)))
    return pointSet.size
}

function run() {
    console.log('********* Day 9 **********')
    console.log(`Part 1: ${solvePart1(puzzleInput)}`)
    console.log(`Part 2: ${solvePart2(puzzleInput)}`)
}

module.exports = {
    run: run
}
