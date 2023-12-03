const puzzleInput = require('./input.js').day3

const sampleInput1 = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`

const sampleInput2 = ``

const sumReducer = (sum, number) => sum + number
const multiplyReducer = (product, number) => product * number

const numberLength = (number) => number.toString().length

const parseInput = (input) => input.split('\n')
    .map((line) => line.split(''))
    .reduce((data, line, row) => line.reduce((data, value, column) => {
        if(!isNaN(value)) {
            const last = data.numbers.at(-1)
            if(last != undefined) {
                if(last.row == row && last.column < column && column <= (last.column + numberLength(last.number)))
                    return data
            }
 
            const potentialEnd = line.slice(column).findIndex(element => isNaN(element))
            const end = potentialEnd < 0? line.length : (potentialEnd + column)
            number = Number(line.slice(column, end).join(''))
            data.numbers.push({row, column, number})
        } else {
            if(value != '.') data.symbols.push({row, column, value})
        }
        return data
    }, data), { numbers: [], symbols: [] })

const isAdjacent = (number, sym) => Math.abs(number.row - sym.row) < 2 
    && (Math.abs(number.column - sym.column) < 2
        || Math.abs((number.column + numberLength(number.number) - 1) - sym.column) < 2)

function solvePart1(input) {
    const {numbers, symbols} = parseInput(input)
    return numbers.reduce((list, number) => {
        if(symbols.some((sym) => isAdjacent(number, sym)))
            list.push(number.number)
        return list
    }, []).reduce(sumReducer, 0)
}

function solvePart2(input) {
    const {numbers, symbols} = parseInput(input)
    return symbols.filter(sym => sym.value === '*').reduce((list, sym) => {
        const adjacentNumbers = numbers.reduce((list, number) => {
            if(isAdjacent(number, sym)) list.push(number.number)
            return list
        }, [])
        if(adjacentNumbers.length == 2)
            list.push(adjacentNumbers.reduce(multiplyReducer, 1))
        return list
    }, []).reduce(sumReducer, 0)
}

function run() {
    console.log('********* Day 3 **********')
    console.log(`Part 1: ${solvePart1(puzzleInput)}`)
    console.log(`Part 2: ${solvePart2(puzzleInput)}`)
}

module.exports = {
    run: run
}