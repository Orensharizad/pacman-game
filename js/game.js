'use strict'

const WALL = '🧱'
const FOOD = '.'
const EMPTY = ' '
const SUPER = '💊'
const CHERRY = '🍒'

const gGame = {
    score: 0,
    isOn: false
}

var gBoard
var gFoodCount = 0
var gEatFoodCount = 0


function onInit() {
    gGame.isOn = true
    gBoard = buildBoard()
    createGhosts(gBoard)
    createPacman(gBoard)
    renderBoard(gBoard, '.board-container')

    findEmptyCells()
    setInterval(renderCherry, 10000)

}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])

        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD


            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            } else if (i === 1 && j === 1 || i === 1 && j === 8 ||
                i === 8 && j === 1 || i === 8 && j === 8) {
                board[i][j] = SUPER
            }

            else if (board[i][j] === FOOD) {
                gFoodCount++
            }

        }
    }
    gFoodCount--
    console.log(gFoodCount);
    console.log('gEatFoodCount', gEatFoodCount);

    return board

}

function updateScore(diff) {
    // TODO: update model and dom
    // Model
    gGame.score += diff
    // DOM
    document.querySelector('h2 span').innerText = gGame.score
    console.log(gGame.score)




}

function gameOver() {
    console.log('Game Over')
    // TODO
    clearInterval(gIntervalGhosts)
    gGame.isOn = false
    renderCell(gPacman.location, '🪦')
    var resetBtn = document.querySelector('.restart-btn')
    resetBtn.style.display = 'block'
    var modal = document.querySelector('.modal')
    modal.style.display = 'block'
    modal.style.background = 'red'
    modal.innerText = 'Play Again'
}


function onResetGame() {
    gGame.score = 0
    gFoodCount = 0
    gEatFoodCount = 0
    gGhosts = []
    gDeadGhosts = []
    document.querySelector('h2 span').innerText = gGame.score
    clearInterval(gIntervalGhosts)
    onInit()
    var resetBtn = document.querySelector('.restart-btn')
    resetBtn.style.display = 'none'
    var modal = document.querySelector('.modal')
    modal.style.display = 'none'


}


function chackIsWin() {

    if (gEatFoodCount === gFoodCount) {
        gameOver()
        renderCell(gPacman.location, '🥇')
        var modal = document.querySelector('.modal')
        modal.style.display = 'block'
        modal.style.background = 'green'
        modal.innerText = 'Victory !!!'


    }
}


function findEmptyCells() {
    const emptyCells = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            var currCell = gBoard[i][j]
            if (currCell === EMPTY) {
                emptyCells.push({ i, j })
            }
        }
    }
    return emptyCells
}

function renderCherry() {
    if (!findEmptyCells().length) return

    var emptyCells = findEmptyCells()
    var cellPos = emptyCells[getRandomIntInclusive(0, emptyCells.length - 1)]
    //update the dom
    renderCell(cellPos, CHERRY)
    //update the model
    gBoard[cellPos.i][cellPos.j] = CHERRY

}