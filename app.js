const gameBoard = document.querySelector("#gameboard")
const infoDisplay = document.querySelector("#info")

// making the 3 X 3 cells of the gameboard 
const   startCells = [
    "", "", "",
    "", "", "",
    "", "", ""
]

let go = "circle"
infoDisplay.textContent = "Circle goes first"

function createBoard () {
    // creating a div for each cells in the index.html file
    startCells.forEach((_cells, index) => {
        const cellElement = document.createElement('div')
        // adding a class name to the cells 
        cellElement.classList.add('square')
        cellElement.id = index

        // every cell listening to clicks
        cellElement.addEventListener('click', addGo)
        
        // append the cell element to the gameboard
        gameBoard.append(cellElement)
    })
}

createBoard()

// this function will add either a circle 
// or a cross if nothing is there
function addGo(e) {
    // creating a div within each square 
    // to place a cross or a cirlce 
    const goDisplay = document.createElement('div')
    goDisplay.classList.add(go)     // game always starts with a circle
    e.target.append(goDisplay)

    // alternating b/w circle and cross
    go = go === "circle" ? "cross" : "circle"
    infoDisplay.textContent = "it is now " + go + "'s go."

    // disabling the event-listener on a square already clicked
    e.target.removeEventListener('click', addGo)

    // finally, we check the scores
    checkScore()
}

function checkScore() {
    // grabbing the all 'square' classes, to check the status  
    // of our game.
    const allSquares = document.querySelectorAll('.square')

    // defining winning combinations of squares
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // horizontals
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  // verticals 
        [0, 4, 8], [2, 4, 6]              // diagonals
    ]

    // defining circle's win
    winningCombos.forEach(array => {
        const circleWins = array.every(cell => 
            allSquares[cell].firstChild?.classList.contains('circle'))

        if (circleWins) {
            infoDisplay.textContent = "Circle Wins!"
            
            // removing click-events from all squares
            // Note: We can't directly remove event-listeners from all
            // squares.
            // So, we clone each node
            allSquares.forEach(square =>
                square.replaceWith(square.cloneNode(true)))
            
            // we don't wanna move to the next subarray of winningCombos
            return
        }
    })

    // defining cross' win
    winningCombos.forEach(array => {
        const crossWins = array.every(cell => 
            allSquares[cell].firstChild?.classList.contains('cross'))

        if (crossWins) {
            infoDisplay.textContent = "Cross Wins!"
            
            // removing click-events from all squares
            // Note: We can't directly remove event-listeners from all
            // squares.
            // So, we clone each node
            allSquares.forEach(square =>
                square.replaceWith(square.cloneNode(true)))
            
            // we don't wanna move to the next subarray of winningCombos
            return
        }
    })
}