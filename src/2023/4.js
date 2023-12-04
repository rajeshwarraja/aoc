const puzzleInput = require('./input.js').day4

const sampleInput1 = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`

const sampleInput2 = ``

const sumReducer = (sum, number) => sum + number

const trimText = (text) => text.trim()

const normalize = (text) => text.replace(/\s\s+/g, ' ')

const countWinners = ([winners, players]) => players.reduce((count, value) => winners.includes(value)? count + 1 : count, 0)

const calculatePoints = ([winners, players]) => {
    return players.reduce((points, value) => {
        if(!winners.includes(value)) return points
        return points === 0? 1 : points * 2
    }, 0)
}

function solvePart1(input) {
    return input
        .split('\n')
        .map(card => calculatePoints(card
            .split(':')
            .map(trimText)[1]
            .split('|').map(trimText).map(normalize)
            .map(numbers => numbers.split(' ').map(Number))))
        .reduce(sumReducer, 0)
}

function countCards(cards, startIndex, stopIndex) {
    var count = stopIndex - startIndex + 1;
    for(var i = startIndex; i <= stopIndex; i++) {
        count += countCards(cards, i + 1, i + cards[i])
    }
    return count
}

function solvePart2(input) {
    const cards = input
        .split('\n')
        .map(card => card.split(':')
            .map(trimText))
            .map(([_, numbers]) => countWinners(numbers
                .split('|').map(trimText).map(normalize)
                .map(list => list.split(' ').map(Number))))
    return countCards(cards, 0, cards.length - 1)

}

function run() {
    console.log('********* Day 4 **********')
    console.log(`Part 1: ${solvePart1(puzzleInput)}`)
    console.log(`Part 2: ${solvePart2(puzzleInput)}`)
}

module.exports = {
    run: run
}