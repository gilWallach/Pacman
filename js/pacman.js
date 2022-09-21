'use strict'

const PACMAN = 'ᗤ';
var gPacman;
var gDirection = 0

function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false,
    }
    board[gPacman.location.i][gPacman.location.j] = getPackmanHTML()
    gGame.boardFoodCount--
}

function movePacman(ev) {

    if (!gGame.isOn) return
    // console.log('ev', ev);
    const nextLocation = getNextLocation(ev)

    if (!nextLocation) return
    // console.log('nextLocation', nextLocation)

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('NEXT CELL', nextCell)

    if (nextCell === WALL) return
    if (nextCell === FOOD) {
        updateScore(1)
        gGame.boardFoodCount--
        // console.log('gGame.boardFoodCount', gGame.boardFoodCount)

        if (gGame.boardFoodCount === 0) {
            gameOver()
        }
    }
    else if (nextCell === GHOST) {
        if (gPacman.isSuper) {
            for(var i = 0; i < gGhosts.length; i++){
                if(gGhosts[i].location.i === nextLocation.i && gGhosts[i].location.j === nextLocation.j){
                    gDeadGhosts.push(gGhosts.splice(i, 1)[0])
                }
            }
        }
        else {
            gameOver()
            renderCell(gPacman.location, EMPTY)
            return
        }
    }
    else if (nextCell === SUPER_FOOD) {
        if(!gPacman.isSuper){
            SUPER_FOOD_SOUND.play()
            gGame.boardFoodCount--
            gPacman.isSuper = true
    
            setTimeout(() => {
                gPacman.isSuper = false
                for(var i = 0; i < gDeadGhosts.length; i++){
                    gGhosts.push(gDeadGhosts[i])
                }
            }, 5000)
        }else if (nextCell === SUPER_FOOD) return
    }
    else if (nextCell === CHERRY){
        updateScore(10)
    }

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY

    // update the DOM
    renderCell(gPacman.location, EMPTY)

    // update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

    // update the DOM
    renderCell(gPacman.location, getPackmanHTML())
}

function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            // gDirection = 90
            gDirection = 90
            nextLocation.i--
            break
        case 'ArrowDown':
            gDirection = 270
            nextLocation.i++
            break;
        case 'ArrowLeft':
            gDirection = 0
            nextLocation.j--
            break
        case 'ArrowRight':
            gDirection = 180
            nextLocation.j++
            break
        default:
            return null
    }
    return nextLocation
}

function getPackmanHTML(){
    
    var styleHTML = `color: yellow; transform: rotate(${gDirection}deg); position: absolute`
    return `<span style="${styleHTML}">${PACMAN}</span>`
}