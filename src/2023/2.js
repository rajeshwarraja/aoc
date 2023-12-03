const puzzleInput = require('./input.js').day2

const sampleInput1 = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`

const sampleInput2 = ``

const sumReducer = (sum, number) => sum + number

const color = (game, color) => game[color] || 0

const parseDraw = (game) => game.map(draw => draw.split(',').map(cube => cube.split(' ')).reduce((map, pair) => {
    const count = Number(pair[1])
    const color = pair[2]
    map[color] = count 
    return map
}, {})).reduce((max, draw) => {
    if(max.red < color(draw, 'red')) max.red = color(draw, 'red')
    if(max.green < color(draw, 'green')) max.green = color(draw, 'green')
    if(max.blue < color(draw, 'blue')) max.blue = color(draw, 'blue')
    return max
}, { red:0, green:0, blue:0 })

const parseInput = (input) => input.split('\n').map(line => line.split(':')).reduce((map, pair) => {
    map[pair[0].slice(5)] = parseDraw(pair[1].split(';'))
    return map
}, {})

function solvePart1(input) {
    const reality = {red: 12, green: 13, blue: 14 }

    return Object.entries(parseInput(input))
        .filter(([id, game]) => game.red <= reality.red && game.green <= reality.green && game.blue <= reality.blue)
        .map(([id, _]) => Number(id))
        .reduce(sumReducer, 0) 
}

function solvePart2(input) {

    return Object.entries(parseInput(input))
        .map(([_, game]) => game.red * game.green * game.blue)
        .reduce(sumReducer, 0)
}

function run() {
    console.log('********* Day 2 **********')
    console.log(`Part 1: ${solvePart1(puzzleInput)}`)
    console.log(`Part 2: ${solvePart2(puzzleInput)}`)
}

module.exports = {
    run: run
}