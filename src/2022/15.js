const puzzleInput = require('./input.js').day15

const sampleInput = `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3`

function constructScan(input) {
    return input.split('\n').map((line) => {
	let start = 12
	let limit = line.indexOf(',', start)
	const sX = Number(line.slice(start, limit))

	start = limit + 4
	limit = line.indexOf(':', start)
	const sY = Number(line.slice(start, limit))

	start = limit + 25
	limit = line.indexOf(',', start)
	const bX = Number(line.slice(start, limit))

	start = limit + 4
	const bY = Number(line.slice(start))
	return {
	    sensor: {x:sX,y:sY},
	    beacon: {x:bX,y:bY},
	    distance: Math.abs(sX - bX) + Math.abs(sY - bY)
	}
    })
}

function solvePart1(input, line) {
    const scan = constructScan(input)

    const beacons = scan.reduce((beacons, data) => {
	if(data.beacon.y === line && !beacons.some((temp)=> temp.beacon.x === data.beacon.x)) beacons.push(data)	
	return beacons
    }, [])
    
    const coverage = scan.filter((data) => Math.abs(data.sensor.y - line) < data.distance).map((data) => {
	const strength = data.distance - Math.abs(data.sensor.y - line)
	const [start,end] = [data.sensor.x-strength,data.sensor.x+strength]
	return {start, end}
    }).sort((r1, r2) => r1.start - r2.start).reduce((cover, range) => {
	if(cover.index === undefined || cover.index < range.start) cover.index = range.start

	if(cover.index < range.end) {
	    count = beacons.reduce((count, data) => cover.index<=data.beacon.x && data.beacon.x <= range.end? count + 1 : count, 0)

	    cover.count += ((range.end - cover.index) + 1 - count)
	    cover.index = range.end + 1
	}
	
	return cover
    }, {count:0})

    delete coverage.index
    return coverage.count
}

function solvePart2(input, max) {
    const scan = constructScan(input)

    let coverList = []
    for (let line = 0; line <= max; ++line) {
	coverList.push(scan.filter((data) => Math.abs(data.sensor.y - line) < data.distance).map((data) => {
	    const strength = data.distance - Math.abs(data.sensor.y - line)
	    const [start, end] = [data.sensor.x - strength, data.sensor.x + strength]
	    return { start, end }
	}).sort((r1, r2) => r1.start - r2.start).reduce((cover, range) => {
	    if(cover.segments.length === 0) {
		cover.segments.push(range)
	    } else {
		const prevSeg = cover.segments[cover.segments.length - 1]
		if(range.start < prevSeg.end + 2) {
		    if(prevSeg.end < range.end) prevSeg.end = range.end
		}
		else cover.segments.push(range)
	    }
	    return cover
	}, {count:0, line, start: 0, end:max, segments:[]}))
    }

    const beacon = coverList.filter((cover) => cover.segments.length > 1)[0]
    return (beacon.segments[0].end + 1) * 4000000 + beacon.line
}

function run() {
    console.log('********* Day 15 *********')
    console.log(`Part 1: ${solvePart1(sampleInput, 10)}`)
    console.log(`Part 2: ${solvePart2(sampleInput, 20)}`)
}

module.exports = {
    run: run
}
