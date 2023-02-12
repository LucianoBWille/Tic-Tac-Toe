let rows = document.querySelectorAll('.game>.row')
let gameGrid = []
let player = 'Player 1'
let player1Div = document.querySelector('#player1')
let player2Div = document.querySelector('#player2')
let winnerDiv = document.querySelector('.winner')
let lines = document.querySelectorAll('.line')

let winner = false;

rows.forEach((row,i)=>{
    gameGrid.push(rows[i].querySelectorAll('.collumn'))
})
cleanGrid()

function cleanGrid() {
    gameGrid.forEach(row => {
        row.forEach(col => {
            col.innerText = ""
            col.classList = ['collumn']
        })
    })
}

function reset(){
    cleanGrid()
    player = 'Player 1'
    winnerDiv.innerText = ''
    winner = false;
    winnerDiv.classList = ['winner']    
    lines.forEach(line => {
        line.classList = ['line']
    })
    player1Div.classList.remove('disabled')
    if(!player2Div.classList.contains('disabled'))
        player2Div.classList.add('disabled')
}

async function play(row, collumn){
    if(winner){
        alert('The game has already ended! Press the reset button to start a new game.')
        return;
    }
    if(gameGrid[row][collumn].innerText == ""){
        if(player == 'Player 1'){
            gameGrid[row][collumn].innerText = 'X'
            gameGrid[row][collumn].classList.add('player1')
            player = 'Player 2'
            player1Div.classList.add('disabled')
            player2Div.classList.remove('disabled')
        }else{
            gameGrid[row][collumn].innerText = 'O'
            gameGrid[row][collumn].classList.add('player2')
            player = 'Player 1'
            player2Div.classList.add('disabled')
            player1Div.classList.remove('disabled')
        }
        result = checkWinner()
        console.log(result)
        if(result){
            switch(result){
                case "Player 1":
                    winnerDiv.innerText = 'Player 1 won the game!'
                    winnerDiv.classList.add('player1')
                    winner = 'Player 1'
                    lines.forEach(line => {
                        line.classList.add('player1')
                    })
                    break;
                case "Player 2":
                    winnerDiv.innerText = 'Player 2 won the game!'
                    winnerDiv.classList.add('player2')
                    winner = 'Player 2'
                    lines.forEach(line => {
                        line.classList.add('player2')
                    })
                    break;
                case "Draw":
                    winnerDiv.innerText = 'Game ended in a draw!'
                    winnerDiv.classList.add('draw')
                    break;
            }
            // alert('Game ended! Press the reset button to start a new game.')
        }
    }else{
        alert('Field already filled!')
    } 
}

function checkWinner(){
    //check rows
    for (let i = 0; i<3; i++){
        if(
            gameGrid[i][0].innerText != "" &&
            gameGrid[i][0].innerText == gameGrid[i][1].innerText &&
            gameGrid[i][0].innerText == gameGrid[i][2].innerText
        ) {
            if(lines[0].classList.length == 1){
                lines[0].classList.add('horizontal'+(i+1))
            }else{
                lines[1].classList.add('horizontal'+(i+1))
            }
            winner = gameGrid[i][0].innerText == 'X' ? 'Player 1' : 'Player 2'
        }
    }
    //check collumns
    for (let i = 0; i<3; i++){
        if(
            gameGrid[0][i].innerText != "" &&
            gameGrid[0][i].innerText == gameGrid[1][i].innerText &&
            gameGrid[0][i].innerText == gameGrid[2][i].innerText
        ) {
            if(lines[0].classList.length == 1){
                lines[0].classList.add('vertical'+(i+1))
            }else{
                lines[1].classList.add('vertical'+(i+1))
            }
            winner = gameGrid[0][i].innerText == 'X' ? 'Player 1' : 'Player 2'
        }
    }
    //check diagonal 1
    if(
        gameGrid[0][0].innerText != "" &&
        gameGrid[0][0].innerText == gameGrid[1][1].innerText &&
        gameGrid[0][0].innerText == gameGrid[2][2].innerText
    ) {
        if(lines[0].classList.length == 1){
            lines[0].classList.add('diagonal1')
        }else{
            lines[1].classList.add('diagonal1')
        }
        winner = gameGrid[0][0].innerText == 'X' ? 'Player 1' : 'Player 2'
    }
    //check diagonal 2
    if(
        gameGrid[0][2].innerText != "" &&
        gameGrid[0][2].innerText == gameGrid[1][1].innerText &&
        gameGrid[0][2].innerText == gameGrid[2][0].innerText
    ) {
        if(lines[0].classList.length == 1){
            lines[0].classList.add('diagonal2')
        }else{
            lines[1].classList.add('diagonal2')
        }
        winner = gameGrid[0][2].innerText == 'X' ? 'Player 1' : 'Player 2'
    }
    //check "Draw"
    if( winner == false){
        // check if there is any empty field
        const checkDraw = () => {
            for(let i = 0; i<3; i++){
                for(let j = 0; j<3; j++){
                    if(gameGrid[i][j].innerText == ""){
                        return false;
                    }else{
                        if(i == 2 && j == 2){
                            return 'Draw';
                        }
                    }
                }
            }
        }
        winner = checkDraw()
    }
    //retorna falso para continuar o jogo
    return winner;
}