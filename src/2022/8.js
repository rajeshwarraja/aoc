const puzzleInput = require('./input.js').day8

const sampleInput = `30373
25512
65332
33549
35390`

function solvePart1(input) {
    const grid = input.split('\n').map((row) => row.split('').map(Number));
    const rows = grid.length
    const columns = grid[0].length

    let visibleCount = 0
    for(let y = 0; y < rows; ++y) {
	for(let x = 0; x < columns; ++x) {
	    if(y === 0 || x === 0 || y === rows - 1 || x === columns - 1) {
		visibleCount++;
	    } else {
		const treeHeight = grid[y][x]
		let lx = x - 1, rx = x + 1
		let ty = y - 1, by = y + 1
                let visible = false
		let tallerTreeFound = false
		while(!visible && lx >= 0) {
		    tallerTreeFound = grid[y][lx--] >= treeHeight
		    if(tallerTreeFound) break
		}
		if(!tallerTreeFound) visible = true;
		
		tallerTreeFound = false
		while(!visible && rx < columns) {
		    tallerTreeFound = grid[y][rx++] >= treeHeight
		    if(tallerTreeFound) break
		}
		if(!tallerTreeFound) visible = true;

		tallerTreeFound = false
		while(!visible && ty >= 0) {
		    tallerTreeFound = grid[ty--][x] >= treeHeight
		    if(tallerTreeFound) break
		}
		if(!tallerTreeFound) visible = true;

		tallerTreeFound = false
		while(!visible && by < rows) {
		    tallerTreeFound = grid[by++][x] >= treeHeight
		    if(tallerTreeFound) break
		}
		if(!tallerTreeFound) visible = true;
		
		if(visible) {
		    visibleCount++;
		}
	    }
	}
    }
    
    return visibleCount
}

function solvePart2(input) {
    const grid = input.split('\n').map((row) => row.split('').map(Number));
    const rows = grid.length
    const columns = grid[0].length

    let scenicScore = []
    for(let y = 0; y < rows; ++y) {
	for(let x = 0; x < columns; ++x) {
	    if(y === 0 || x === 0 || y === rows - 1 || x === columns - 1) {
		// scenicScore is zero for these trees
		// not adding to list
	    } else {
		let score = []
		const treeHeight = grid[y][x]
		let lx = x - 1, rx = x + 1
		let ty = y - 1, by = y + 1
		let length = 0
		
		while(lx >= 0) {
		    length++
		    if(grid[y][lx--] >= treeHeight) {
			break
		    }
		}
		score.push(length)

		length = 0
		while(ty >= 0) {
		    length++
		    if(grid[ty--][x] >= treeHeight) {
			break
		    }
		}
		score.push(length)

		length = 0
		while(rx < columns) {
		    length++
		    if(grid[y][rx++] >= treeHeight) {
			break
		    }
		}
		score.push(length)

		length = 0
		while(by < columns) {
		    length++
		    if(grid[by++][x] >= treeHeight) {
			break
		    }
		}
                score.push(length)
		
		scenicScore.push(score.reduce((prod, num) => prod * num, 1))
	    }
	}
    }

    return Math.max(...scenicScore)
}

function run() {
    console.log('********* Day 8 **********')
    console.log(`Part 1: ${solvePart1(puzzleInput)}`)
    console.log(`Part 2: ${solvePart2(puzzleInput)}`)
}

module.exports = {
    run: run
}
