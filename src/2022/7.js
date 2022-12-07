const puzzleInput = require('./input.js').day7

const sampleInput = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`

function groupCommands(group, line) {
    let cmd;
    if(line[0] === '$') {
	group.push([line])
    } else {
	group[group.length - 1].push(line)
    }
    return group
}

function parseEntry(entries, entry) {
    const details = entry.split(' ')
    if(details[0] === 'dir') {
	entries[details[1]] = {}
    } else {
	entries[details[1]] = Number(details[0])
    }
    return entries
}

function buildTree(tree, group) {
    const match = group[0].match(/^\$\s(.+?)(\s.+)?$/)
    if(!match) throw new Error('Unable to build directory tree')
    if(match[1] === 'cd') {
	if(tree.cd === undefined) {
	    tree.cd = '/'
	    tree.root = {}
	}
	else
	    if(match[2].trim() === '..') {
		tree.cd = tree.cd.slice(0, tree.cd.lastIndexOf('/', tree.cd.length - 2) + 1)
	    } else {
		tree.cd += `${match[2].trim()}/`
	    }
    } else if(match[1] === 'ls') {
	const entries = group.slice(1).reduce(parseEntry, {})
	if(tree.cd === '/') tree.root = entries
	else {
	    const path = tree.cd.split('/').filter(c => c!='')
	    let pathEntries = tree.root
	    for(let i = 0; i < path.length; i++)
	    {
		if(i < path.length - 1)	pathEntries = pathEntries[path[i]]
		else pathEntries[path[i]] = entries
	    }
	}
    } else throw new Error(`Unknown command encountered: ${match[0]}`)
    return tree
}

function calculateDirectorySize(entries, sizeList) {
    let localSize = 0
    for(const key of Object.keys(entries)) {
	if(entries[key] instanceof Object) {
	    const dirSize = calculateDirectorySize(entries[key], sizeList)
	    sizeList.push(dirSize)
	    localSize += dirSize
	} else {
	    localSize += entries[key]
	}
    }
    return localSize
}

function solvePart1(input) {
    const tree = input.split('\n').reduce((group, line) => groupCommands(group, line), []).reduce((tree, commandGroup) => buildTree(tree, commandGroup), {})
    var sizeList = []
    sizeList.push(calculateDirectorySize(tree.root, sizeList))
    return sizeList.filter((size) => size <= 100000).reduce((sum, num) => sum + num, 0)
}

function solvePart2(input) {
    const tree = input.split('\n').reduce((group, line) => groupCommands(group, line), []).reduce((tree, commandGroup) => buildTree(tree, commandGroup), {})
    var sizeList = []
    const usedSize = calculateDirectorySize(tree.root, sizeList)
    const freeSize = 70000000 - usedSize
    const sizeRequired = 30000000 - freeSize
    return sizeList.filter((size) => size > sizeRequired)[0]
}

function run() {
    console.log('********* Day 7 **********')
    console.log('Part 1: ' + solvePart1(puzzleInput))
    console.log('Part 2: ' + solvePart2(puzzleInput))
}

module.exports = {
    run: run
}
