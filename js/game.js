"use strict"

const WALL = "#"
const FOOD = "."
const SUPER_FOOD = "🍩"
const EMPTY = " "

const WIN_SOUND = new Audio("sound/collect-super-food.wav")
const LOSE_SOUND = new Audio("sound/lose.wav")
const SUPER_FOOD_SOUND = new Audio("sound/super-food.wav")

var gGame = {
  score: 0,
  isOn: false,
  boardFoodCount: 0,
}

var gBoard

function init() {
  gGame.isOn = true
  gGame.score = 0
  gGame.boardFoodCount = 0
  gGame.isSuper = false
  document.querySelector(".modal").classList.add("hide")
  gBoard = buildBoard()
  createPacman(gBoard)

  createGhosts(gBoard)
  renderBoard(gBoard, ".board-container")
}

function buildBoard() {
  const SIZE = 10
  const board = []

  for (var i = 0; i < SIZE; i++) {
    board.push([])

    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD

      if (
        i === 0 ||
        i === SIZE - 1 ||
        j === 0 ||
        j === SIZE - 1 ||
        (j === 3 && i > 4 && i < SIZE - 2)
      ) {
        board[i][j] = WALL
      }
      if (
        (i === 1 && j === 1) ||
        (i === 1 && j === SIZE - 2) ||
        (i === SIZE - 2 && j === 1) ||
        (i === SIZE - 2 && j === SIZE - 2)
      ) {
        board[i][j] = SUPER_FOOD
      }
      if (board[i][j] === FOOD || board[i][j] === SUPER_FOOD)
        gGame.boardFoodCount++
    }
  }
  return board
}

function updateScore(diff) {
  gGame.score += diff
  document.querySelector("h2 span").innerText = gGame.score
}

function gameOver() {
  SUPER_FOOD_SOUND.pause()
  var sound = gGame.boardFoodCount === 0 ? WIN_SOUND.play() : LOSE_SOUND.play()
  var msg = gGame.boardFoodCount === 0 ? "You Win!" : "Game Over..."

  document.querySelector(".modal").classList.remove("hide")
  document.querySelector(".modal h2").innerText = msg
  gGame.isOn = false
  gGame.boardFoodCount = 0
  clearInterval(gIntervalGhosts)
  clearInterval(gIntervalCherry)
}

function renderBoard(mat, selector) {
  var strHTML = '<table border="0"><tbody>'
  for (var i = 0; i < mat.length; i++) {
    strHTML += "<tr>"
    for (var j = 0; j < mat[0].length; j++) {
      const cell = mat[i][j]
      const className = "cell cell-" + i + "-" + j
      strHTML += `<td class="${className}">${cell}</td>`
    }
    strHTML += "</tr>"
  }
  strHTML += "</tbody></table>"

  const elContainer = document.querySelector(selector)
  elContainer.innerHTML = strHTML
}

// location such as: {i: 2, j: 7}
function renderCell(location, value) {
  // Select the elCell and set the value
  var elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
  elCell.innerHTML = value

  if (value === PACMAN) {
    elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
  }
}