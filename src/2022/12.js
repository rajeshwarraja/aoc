const puzzleInput = require('./input.js').day12

const sampleInput = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`

function renderPath(grid, path, nextPoints=[]) {
    const minX = 0
    const minY = 0
    const maxX = grid[0].length
    const maxY = grid.length

    const width = maxX - minX, height = maxY - minY
    const offX = Math.abs(minX), offY = Math.abs(minY)
    console.log(`${width}x${height} -> ${offX}, ${offY}`)

    const from = path[0]
    const to = path[path.length - 1]
    const pathSet = new Set(path.map(JSON.stringify))
    const nextPointSet = nextPoints.map(JSON.stringify)
    for(let y = 0; y < height; ++y) {
	let row = ''
	for(let x = 0; x < width; ++x) {
	    const pointStr = JSON.stringify({x:x-offX,y:y-offY})
	    if(areEqual({x,y}, from)) {
		row = row + 'S'
	    } else if(areEqual({x,y}, to)) {
		row = row + 'E'
	    } else if(nextPoints.some((p) => areEqual(p, {x,y}))) {
		row = row + `${nextPointSet.indexOf(pointStr)}`
	    }
	    else {
		row = row + (pathSet.has(JSON.stringify({x:x-offX,y:y-offY}))? grid[y][x] : '.')
	    }
	}
	console.log(row)
    }
}

const heightMap = 'abcdefghijklmnopqrstuvwxyz'

function areEqual (p1, p2) { return p1.x === p2.x && p1.y === p2.y }

function height(grid, point) {
    const code = grid[point.y][point.x]
    if(code === 'S') return heightMap.indexOf('a')
    if(code === 'E') return heightMap.indexOf('z')
    return heightMap.indexOf(code)
}

function insideGrid(grid, point) {
    return point.x >= 0 && point.x < grid[0].length
	&& point.y >= 0 && point.y < grid.length
}

function movable(grid, from, to) {
    return insideGrid(grid, from) && insideGrid(grid, to)
        && (height(grid, to) >= 0)
	&& (height(grid, to) - height(grid, from)) <= 1
}

function reachablePoints(grid, path, from) {
    return [
	{x:from.x+1, y:from.y},
	{x:from.x, y:from.y+1},
	{x:from.x, y:from.y-1},
	{x:from.x-1, y:from.y},
    ].filter((p) => path.every((s) => !areEqual(s, p)) && movable(grid, from, p)).sort((a, b) => height(grid, b) - height(grid, a))
}

let shortestPath;

function tracePath(grid, path, to) {
    const from = path[path.length - 1]

    if(areEqual(from, to)) {
	if(shortestPath === undefined || shortestPath.length > path.length) {
	    if(shortestPath === undefined)
		console.log('Path found')
	    else
		console.log('Shorter path found')
	    shortestPath = [...path]
	    // renderPath(grid, shortestPath)
	    return
	}
    }

    if(shortestPath != undefined && shortestPath.length <= path.length) {
	return
    }
    
    const nextPoints = reachablePoints(grid, path, from)

    if(nextPoints.length === 0) {
	renderPath(grid, path)
	return
    }
    
    // renderPath(grid, path, nextPoints)
    
    nextPoints.forEach((p) => {
	path.push(p)
	tracePath(grid, path, to)
	path.pop()
    })

    // renderPath(grid, path, nextPoints)
}

function solvePart1(input) {
    const grid = input.split('\n').map((row) => row.split(''))
    const fromTo = grid.reduce((fromTo, row, rowIndex) => {
	const startIndex = row.indexOf('S')
	if(startIndex != -1) fromTo.from = {x:startIndex, y:rowIndex}
	const endIndex = row.indexOf('E')
	if(endIndex != -1) fromTo.to = {x:endIndex, y:rowIndex}
	return fromTo
    }, {})

    tracePath(grid, [fromTo.from], fromTo.to)

    // renderPath(grid, shortestPath)

    return shortestPath.length - 1
}

function solvePart2(input) {
}

function run() {
    console.log('********* Day 12 *********')
    console.log(`Part 1: ${solvePart1(puzzleInput)}`)
    console.log(`Part 2: ${solvePart2(sampleInput)}`)
}

module.exports = {
    run: run
}
