'use strict'

const PACMAN = '🥠'
var gPacman
var gKilledGhost = []


function createPacman(board) {
    // DONE: initialize gPacman...
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false,
        deg: '0'
    }
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

}

function movePacman(ev) {
    if (!gGame.isOn) return
    // DONE: use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev.key)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // DONE: return if cannot move
    if (nextCell === WALL) return

    // DONE: hitting a ghost? call gameOver
    if (nextCell === GHOST) {

        if (gPacman.isSuper) {
            killGhost(nextLocation)

        } else {
            gameOver()
            return
        }
    }
    if (nextCell === FOOD) {
        updateScore(1)
        gEatFoodCount++
    }
    if (nextCell === CHERRY) {
        updateScore(10)


    }
    if (nextCell === SUPER) {
        if (gPacman.isSuper) {
            return
        }
        gPacman.isSuper = true

        setTimeout(() => {
            gPacman.isSuper = false
            reviveDeadGhosts()
        }, 5000);

    }
    // DONE: moving from current location:
    // DONE: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // DONE: update the DOM
    renderCell(gPacman.location, EMPTY)

    // DONE: Move the pacman to new location:
    // DONE: update the model
    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    gPacman.location = nextLocation
    // DONE: update the DOM
    // renderCell(nextLocation, getPacmantHTML(gPacman))
    renderCell(nextLocation, getPacmanHTML(gPacman.deg))

    chackIsWin()
}

function getNextLocation(eventKeyboard) {
    // console.log(eventKeyboard)
    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    // DONE: figure out nextLocation
    switch (eventKeyboard) {
        case 'ArrowUp':
            nextLocation.i--
            gPacman.deg = '90'
            break;
        case 'ArrowRight':
            nextLocation.j++
            gPacman.deg = '180'
            break;
        case 'ArrowDown':
            nextLocation.i++
            gPacman.deg = '270'
            break;
        case 'ArrowLeft':
            nextLocation.j--
            gPacman.deg = '0'
            break;
    }
    return nextLocation
}




// function getPacmantHTML(gPacman) {
//     return `<span class="pacman" style="transform: rotate(${gPacman.deg}deg);">${PACMAN}</span>`

// }

function getPacmanHTML(deg) {
    return `<div class="pacman" style="transform: rotate(${deg}deg)">${PACMAN}</div>`
}