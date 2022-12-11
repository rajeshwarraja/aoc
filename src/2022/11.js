const puzzleInput = require('./input.js').day11

const sampleInput = `Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`

function findMonkeyFuncPart1(lines) {
    const expr = lines[0].match(/^\s+Operation:\snew\s=\s(.+)$/)[1]
    const testNumber = Number(lines[1].slice(21))
    const trueId = Number(lines[2].slice(29))
    const falseId = Number(lines[3].slice(30))
    return (old) => {
	const item = Math.floor(eval(expr) / 3)
	const monkey = (item % testNumber) === 0? trueId : falseId
	return {monkey, item }
    }
}

function findMonkeyFuncPart2(lines) {
    const expr = lines[0].match(/^\s+Operation:\snew\s=\s(.+)$/)[1]
    const testNumber = Number(lines[1].slice(21))
    const trueId = Number(lines[2].slice(29))
    const falseId = Number(lines[3].slice(30))
    return (old, factor) => {
	let item = eval(expr)
	item = item % factor
	const monkey = (item % testNumber) === 0? trueId : falseId
	return {monkey, item }
    }
}

function parseMonkey(data, func) {
    const lines = data.split('\n')
    return {
	id: lines[0].match(/^Monkey\s(\d+):$/)[1],
	items: lines[1].match(/^\s+Starting items:\s([\d,\s]+)$/)[1].split(',').map(Number),
	factor: Number(lines[3].slice(21)),
	monkey: func(lines.splice(2)),
	inspectCount: 0
    }
}

function solvePart1(input) {    
    const monkeys = input.split('\n\n').map((info) => parseMonkey(info, findMonkeyFuncPart1))

    // Monkey Business
    const round = 20
    for(let r = 0; r < round; ++r) {
	for(let monkey of monkeys) {
	    for(let item of monkey.items) {
		monkey.inspectCount++
		const move = monkey.monkey(item)
		monkeys[move.monkey].items.push(move.item)
	    }
	    monkey.items = []
	}
    }

    return monkeys.map((m) => m.inspectCount).sort((num1, num2) => num2 - num1).slice(0, 2).reduce((prod, num) => prod * num, 1)
}

function solvePart2(input) {
    const monkeys = input.split('\n\n').map((info) => parseMonkey(info, findMonkeyFuncPart2))

    const factor = monkeys.reduce((factor, m) => factor * m.factor, 1)
    // Monkey Business
    const round = 10000
    for(let r = 0; r < round; ++r) {
	for(let monkey of monkeys) {
	    for(let item of monkey.items) {
		monkey.inspectCount++
		const move = monkey.monkey(item, factor)
		monkeys[move.monkey].items.push(move.item)
	    }
	    monkey.items = []
	}

	if(false) {
	    monkeys.forEach((m) => {
		console.log(`Monkey ${m.id} inspected items ${m.inspectCount} items.`)
	    })
	}
    }

    return monkeys.map((m) => m.inspectCount).sort((num1, num2) => num2 - num1).slice(0, 2).reduce((prod, num) => prod * num, 1)
}

function run() {
    console.log('********* Day 11 *********')
    console.log(`Part 1: ${solvePart1(puzzleInput)}`)
    console.log(`Part 2: ${solvePart2(puzzleInput)}`)
}

module.exports = {
    run: run
}
