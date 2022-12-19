const puzzleInput = require('./input.js').day16

const sampleInput = `Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
Valve BB has flow rate=13; tunnels lead to valves CC, AA
Valve CC has flow rate=2; tunnels lead to valves DD, BB
Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE
Valve EE has flow rate=3; tunnels lead to valves FF, DD
Valve FF has flow rate=0; tunnels lead to valves EE, GG
Valve GG has flow rate=0; tunnels lead to valves FF, HH
Valve HH has flow rate=22; tunnel leads to valve GG
Valve II has flow rate=0; tunnels lead to valves AA, JJ
Valve JJ has flow rate=21; tunnel leads to valve II`

function constructGraph(input) {
    return input
	.split('\n')
	.map((line) => line.match(/^Valve (?<valve>\w{2}) has flow rate=(?<rate>\d+); tunnels? leads? to valves? (?<lead>[\w,\s]+)$/))
	.map((match) => {
	    return {
		id: match.groups['valve'],
		rate: Number(match.groups['rate']),
		leads: match.groups['lead'].split(', '),
		open: false
	    }
	})
}

class Node {
    constructor(id, distance) {
	this.id = id
	this.distance = distance
    }
}

class DistanceQueue {
    constructor() {
	this.items = []
    }
    
    enqueue(id, distance) {
	let node = new Node(id, distance)
	let contain = false
	for(let i = 0; i < this.items.length; ++i) {
	    if(this.items[i].distance > node.distance) {
		this.items.splice(i, 0, node)
		contain = true
		break
	    }
	}

	if(!contain) {
	    this.items.push(node)
	}
    }

    empty() { return this.items.length === 0 }

    dequeue() {
	if(this.empty())
	    throw new Error('Queue is emptry')

	return this.items.shift()
    }
}

function computeDistance(graph, source) {
    source = source ?? graph[0]
    
    const cost = graph.reduce((cost, valve) => !valve.open? cost + valve.rate : cost, 0)
    const distanceMap = graph.reduce((map, valve) => {
	map[valve.id] = source.id === valve.id? 0 : 1/0
	return map
    }, {})
    const queue = new DistanceQueue()
    queue.enqueue(source.id, distanceMap[source.id])

    while(!queue.empty()) {
	const current = queue.dequeue()
	const node = graph.find((node) => node.id === current.id)
	for(const next of node.leads) {
	    distance = distanceMap[current.id] + cost
	    if(distanceMap[next] > distance) {
		distanceMap[next] = distance
		queue.enqueue(next, distance)
	    }
	}
    }

    return graph.filter((node) => node.id != source.id && node.rate > 0 && !node.open).reduce((node, item) => {
	if(!node) {
	    node = item
	} else {
	    if(distanceMap[node.id] >= distanceMap[item.id] && item.rate > node.rate) {
		node = item
	    }
	}
	return node
    }, null)
}

function* range(start, end) {
    for(let i = start; i < end; ++i) yield i
}

function solvePart1(input) {
    const graph = constructGraph(input)

    console.log(computeDistance(graph, graph[0]))

    let current
    return [...range(0, 30)].reduce((totalPressure, _, index) => {
	const pressure = graph.reduce((pressure, valve) => valve.open? pressure + valve.rate : pressure, 0)
	console.log('Pressure ', pressure)

	if(!current || current.open) {
	    current = computeDistance(graph, current)
	    if(current)
		console.log(index + 1, ' move to ', current.id)
	} else {
	    current.open = true
	    console.log(index + 1, ' open ', current.id)
	}

	console.log('')

	return totalPressure + pressure
    }, 0)    
}

function solvePart2(input) {

}

function run() {
    console.log('********* Day 16 *********')
    console.log(`Part 1: ${solvePart1(sampleInput)}`)
    console.log(`Part 2: ${solvePart2(puzzleInput)}`)
}

module.exports = {
    run: run
}
