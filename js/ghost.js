'use strict'

const GHOST = '👻'
var gGhosts = []
var gDeadGhosts = []
console.log(gGhosts)

var gIntervalGhosts

function createGhosts(board) {
    // TODO: 3 ghosts and an interval
    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function createGhost(board) {
    // DONE
    const ghost = {
        location: {
            i: 2,
            j: 6
        },
        currCellContent: FOOD,
        color: getRandomColor()
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function moveGhosts() {
    // DONE: loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i]
        moveGhost(ghost)
    }

}

function moveGhost(ghost) {
    // DONE: figure out moveDiff, nextLocation, nextCell
    const moveDiff = getMoveDiff()
    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j,
    }
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // DONE: return if cannot move
    if (nextCell === WALL) return
    if (nextCell === GHOST) return

    // DONE: hitting a pacman? call gameOver
    if (nextCell === PACMAN) {
        gameOver()
        return
    }




    // DONE: moving from current location:
    // DONE: update the model (restore prev cell contents)
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // DONE: update the DOM
    renderCell(ghost.location, ghost.currCellContent)

    // DONE: Move the ghost to new location:
    // DONE: update the model (save cell contents so we can restore later)
    ghost.currCellContent = nextCell
    ghost.location = nextLocation
    gBoard[nextLocation.i][nextLocation.j] = GHOST
    // DONE: update the DOM
    renderCell(nextLocation, getGhostHTML(ghost))
    if (gPacman.isSuper) {
        renderCell(nextLocation, changeGhostColor(ghost))

    }
}

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0, j: 1 }
        case 2: return { i: 1, j: 0 }
        case 3: return { i: 0, j: -1 }
        case 4: return { i: -1, j: 0 }
    }
}

function getGhostHTML(ghost) {
    return `<span class="ghost" style='background-color:${ghost.color};'>${GHOST}</span>`
}


function changeGhostColor(ghost) {
    return `<span style='background-color:blue;'>${GHOST}</span>`
}




function killGhost(location) {
    // gGhost.indexOf() get index of currnet ghost
    console.log(gGhosts);
    const findI = location.i
    const findJ = location.j
    for (var i = 0; i < gGhosts.length; i++) {
        if (gGhosts[i].location.i === findI && gGhosts[i].location.j === findJ) {

            if (gGhosts[i].currCellContent === FOOD) {
                gEatFoodCount++
                updateScore(1)
                gGhosts[i].currCellContent = EMPTY
            }
            var deadGhost = gGhosts.splice(i, 1)[0]
            gDeadGhosts.push(deadGhost)
        }
    }

}

function reviveDeadGhosts() {
    console.log(' gDeadGhosts', gDeadGhosts)
    for (var i = 0; i < gDeadGhosts.length; i++) {
        gGhosts.push(gDeadGhosts[i])
    }
    return gGhosts
}