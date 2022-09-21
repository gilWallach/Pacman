'use strict'

const WALL = '#'
const FOOD = '.'
const SUPER_FOOD = '🍩'
const EMPTY = ' '

const WIN_SOUND = new Audio('sound/collect-super-food.wav')
const LOSE_SOUND = new Audio('sound/lose.wav')
const SUPER_FOOD_SOUND = new Audio('sound/super-food.wav')

var gGame = {
    score: 0,
    isOn: false,
    boardFoodCount: 0
}

var gBoard

function init() {
    gGame.isOn = true
    gGame.score = 0
    gGame.boardFoodCount = 0
    gGame.isSuper = false
    document.querySelector('.modal').classList.add('hide')
    gBoard = buildBoard()
    createPacman(gBoard)

    createGhosts(gBoard)
    renderBoard(gBoard, '.board-container')

}

function buildBoard() {
    const SIZE = 10
    const board = []

    for (var i = 0; i < SIZE; i++) {
        board.push([])

        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD

            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL
            }
            if ((i === 1 && j === 1) || (i === 1 && j === SIZE - 2)||
            (i === SIZE - 2 && j === 1) || (i === SIZE - 2 && j === SIZE - 2)){
                board[i][j] = SUPER_FOOD
            }
            
            if (board[i][j] === FOOD || board[i][j] === SUPER_FOOD) gGame.boardFoodCount++
        }
    }
    return board
}

function updateScore(diff) {
    gGame.score += diff
    document.querySelector('h2 span').innerText = gGame.score
}

function gameOver() {
    var msg = gGame.boardFoodCount === 0 ? 'You Win!' : 'Game Over'
    var sound = gGame.boardFoodCount === 0 ? WIN_SOUND.play() : LOSE_SOUND.play()

    document.querySelector('.modal').classList.remove('hide')
    document.querySelector('.modal h2').innerText = msg
    gGame.isOn = false
    gGame.boardFoodCount = 0
    clearInterval(gIntervalGhosts)
    clearInterval(gIntervalCherry)
}