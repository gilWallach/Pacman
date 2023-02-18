"use strict"

const CHERRY = "&#127826"
var gIntervalCherry = setInterval(addCherry, 5000)

function addCherry() {
  var emptyCells = getEmptyCells()
  var rndIndx = getRandomIntInclusive(0, emptyCells.length - 1)
  var pos = emptyCells[rndIndx]
  if (pos) {
    gBoard[pos.i][pos.j] = CHERRY
    renderCell(pos, CHERRY)
  }
}