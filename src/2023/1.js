const puzzleInput = require('./input.js').day1

const sampleInput1 = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`

const sampleInput2 = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`

const sumValues = (sum, num) => sum + num
const numberReducer = (parser = (_) => null) => (number, value, index) => number? number : (isNaN(value)? parser(index) : value)

const findValue = (line) => Number(line.reduce(numberReducer(), null)) * 10
    + Number(line.reduceRight(numberReducer(), null))

function solvePart1(input) {
    return input.split('\n')
        .map(line => line.split(''))
        .map(findValue)
        .reduce(sumValues, 0)
}

const digits = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
const parseNumberText = (line, lineIndex) => digits.reduce((number, value, index) => {
        if(number) return number
        if(lineIndex + value.length > line.length) return null
        const numberText = line.slice(lineIndex, lineIndex + value.length).join('')
        if(numberText === value) return index + 1
        return null
    }, null)

const findValueEx = (line) => Number(line.reduce(numberReducer((index) => parseNumberText(line, index)), null)) * 10
    + Number(line.reduceRight(numberReducer((index) => parseNumberText(line, index)), null))

function solvePart2(input) {
    return input.split('\n')
        .map(line => line.split(''))
        .map(findValueEx)
        .reduce(sumValues, 0)
}

function run() {
    console.log('********* Day 1 **********')
    console.log(`Part 1: ${solvePart1(puzzleInput)}`)
    console.log(`Part 2: ${solvePart2(puzzleInput)}`)
}

module.exports = {
    run: run
}