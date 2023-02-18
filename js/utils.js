"use strict"

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomColor() {
  var letters = "0123456789ABCDEF"
  var color = "#"
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

function getEmptyCells() {
  var emptyCells = []
  for (var i = 1; i < 9; i++) {
    for (var j = 1; j < 11; j++) {
      if (gBoard[i][j] === "." && gBoard[i][j] !== "#") {
        emptyCells.push({ i, j })
      }
    }
  }
  return emptyCells
}
