const puzzleInput = require('./input.js').day3

const sampleInput = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`

const priority = "0abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

function solvePart1(input) {
    function calculatePriority(rucksack) {
	const [compartment1, compartment2] = rucksack
	return priority.indexOf(compartment1.split('').reduce((p, c) => p === '' && compartment2.indexOf(c) >= 0? c : p, ''))
    }
    
    return input.split('\n').map((rucksack) => [rucksack.slice(0, rucksack.length / 2), rucksack.slice(rucksack.length / 2)]).reduce((sum, rucksack) => sum + calculatePriority(rucksack), 0)
}

function solvePart2(input) {
    function groupOfThree(group, rucksack) {
	let lastGroup = []
	if(group.length > 0) {
	    lastGroup = group[group.length - 1]
	    if(lastGroup.length === 3) {
		lastGroup = []
		group.push(lastGroup)
	    }
	} else {
	    group.push(lastGroup)
	}
	lastGroup.push(rucksack)
	return group
    }

    function calculatePriority(group) {
	const [elf1, elf2, elf3] = group
	const badge = elf1.split('').reduce((p, c) => p === '' && elf2.indexOf(c) >= 0 && elf3.indexOf(c) >= 0? c : p, '')
	return priority.indexOf(badge)
    }
    
    const result = input.split('\n').reduce((group, rucksack) => groupOfThree(group, rucksack), []).reduce((sum, group) => sum + calculatePriority(group), 0)
    return result
}

function run() {
    console.log('********* Day 3 **********')
    console.log(`Part 1: ${solvePart1(puzzleInput)}`)
    console.log(`Part 2: ${solvePart2(puzzleInput)}`)
}

module.exports = {
    run: run
}
