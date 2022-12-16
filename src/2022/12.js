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
	&& (height(grid, to) - height(grid, from)) <= 1
}

function reachablePoints(grid, from) {
    return [
	{x:from.x+1, y:from.y},
	{x:from.x, y:from.y+1},
	{x:from.x, y:from.y-1},
	{x:from.x-1, y:from.y},
    ].filter((p) => movable(grid, from, p))
}

function tracePath(grid, from, to) {
    let dist = []
    for(let y = 0; y < grid.length; ++y) {
	let row = []
	for(let x = 0; x < grid[0].length; ++x) {
	    if(areEqual(from, {x,y})) {
		row.push(0)
	    } else {
		row.push(1/0)
	    }
	}
	dist.push(row)
    }

    for(let i = 0; i < (grid.length * grid[0].length) - 1; ++i) {
	for (let uY = 0; uY < grid.length; ++uY) {
	    for (let uX = 0; uX < grid[0].length; ++uX) {
		for (const p of reachablePoints(grid, { x: uX, y: uY })) {
		    if (dist[uY][uX] + 1 < dist[p.y][p.x]) {
			dist[p.y][p.x] = dist[uY][uX] + 1
		    }
		}
	    }
	}
    }
    
    return dist[to.y][to.x]
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

    return tracePath(grid, fromTo.from, fromTo.to)
}

function solvePart2(input) {
    const grid = input.split('\n').map((row) => row.split(''))
    const fromTo = grid.reduce((fromTo, row, rowIndex) => {
	const startIndex = row.indexOf('S')
	if(startIndex != -1) fromTo.from = {x:startIndex, y:rowIndex}
	const endIndex = row.indexOf('E')
	if(endIndex != -1) fromTo.to = {x:endIndex, y:rowIndex}
	return fromTo
    }, {})

    const list = grid.map((_, index) => tracePath(grid, {x:0, y:index}, fromTo.to))
    
    return Math.min(...list)
}

function run() {
    console.log('********* Day 12 *********')
    console.log(`Part 1: ${solvePart1(sampleInput)}`)
    console.log(`Part 2: ${solvePart2(sampleInput)}`)
}

module.exports = {
    run: run
}
