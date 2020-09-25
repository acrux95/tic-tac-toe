
let container = document.querySelector('.gameZone');
let startButton = document.getElementById('startButton');
let game, turn;

startButton.addEventListener('click', start);
container.addEventListener('click', onCellClick);

function onCellClick(event)  {
    const target = event.target;
    const dataset = target.dataset;
    // console.log('target', target);
    // console.log(dataset);
    if (dataset && dataset.row) {
        // console.log('pos', dataset.row, dataset.column)
        const gamePlayer = game.input(dataset.row, dataset.column)
        console.log(`Resultados: ${gamePlayer}` );
        render(game.output());
    }
}

function ticTacToe() {
    this.results = null;
    this.state = 'Playing';
    this.player = turn.toUpperCase();
    this.matrix = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ]
}

ticTacToe.prototype.input = function (row, column) {
    if (this.getState() === 'over'){
        return;
    }
    if(this.setValue(row, column)) {
        if(this.checkGame(row, column)) {
            this.player === turn.toUpperCase()
                ? alert('Ganaste!!!!')
                : alert('Gané!!!')
                this.setState('over');
                this.setResults({
                    player: this.player,
                    game: 'over'
                })
                return this.getResults;
            } else {
            this.togglePlayer()
        }
    }
};
ticTacToe.prototype.setState = function (state) {
    this.state = state;
}
ticTacToe.prototype.getState = function (state) {
    return this.state;
}
ticTacToe.prototype.setResults = function (results) {
    this.results = results;
}
ticTacToe.prototype.getResults = function () {
    return this.results;
}

ticTacToe.prototype.checkGame = function (row, column) {
    let matrix = this.matrix;
    let symbol = this.player;
    let checks = [
        checkRow(matrix, row, symbol),
        checkColumn(matrix, column, symbol),
        checkDiagonal(matrix, symbol),
        checkAntiDiagonal(matrix, symbol) 
    ];

    return checks.reduce(function (acc, check) {
        return acc + check;
    }, false);


    // console.log('checkRow', checkRow(matrix, row, symbol));

    function checkRow (matrix, row, symbol) {
        const rowLine = matrix[row];
        const length = rowLine.length;
        for(let i = 0; i < length; i++) {
            let cell = rowLine[i];
            if (cell !== symbol) {
                return false;
            }
        }
        return true;
    }
    function checkColumn (matrix, column, symbol) {
        const length = matrix.length;
        for(let i = 0; i < length; i++) {
            let cell = matrix[i][column];
            if (cell !== symbol) {
                return false;
            }
        }
    return true;   
    }
    
    function checkDiagonal (matrix, symbol) {
        const length = matrix.length;
        for(let i = 0; i < length; i++) {
            let cell = matrix[i][i];
            if (cell !== symbol) {
                return false;
            }
        }
    return true;   
    }
    function checkAntiDiagonal (matrix, symbol) {
        const length = matrix.length;
        for(let i = 0, j = length - 1; 1 < length; i++) {
            let cell = matrix[i][j];
            if (cell !== symbol) {
                return false;
            }
        }
    return true; 
    }
}
ticTacToe.prototype.setValue = function (row, column) {
    const matrix = this.matrix;
    if (matrix[row][column] === null) {
    matrix[row][column] = this.player;
    return true;
    }
    return false;
}
ticTacToe.prototype.togglePlayer = function () {
    this.player = this.player === 'X' ? 'O' : 'X'; 
}
ticTacToe.prototype.output = function () {
    return this.matrix;
    
}

function start() {
    console.log('start');
    turn = prompt("Eliges X ó O ?",'');
    // console.log(turn)
    game = new ticTacToe();
    render(game.output());
}

function render (matrix) {
    const values = matrix.reduce(function(array, row, rowIndex) {
        return array.concat(row.map(function (cell, cellIndex) {
            return {
                value: cell,
                id: 'cell-' + rowIndex + '-' + cellIndex
            }
        }))
    }, [])
    // console.log(values)
    values.forEach(function(cell){
        const cellElement = document.getElementById(cell.id)
        // console.log(cellElement)
        cellElement.innerHTML = cell.value !== null 
            ? cell.value
            : ''
    })
}
start();