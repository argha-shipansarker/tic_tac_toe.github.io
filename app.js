// html elements
const status_div = document.querySelector('.status');
const reset_div = document.querySelector('.reset');
const game_cells = document.querySelectorAll('.game-cell');

// game variables
let xIsNext = true;
let gameIsLive = true;
let winner = null;


// GAME FUNCTIONS
// function -1
const update_status = () => {
    if(xIsNext){
        status_div.textContent = 'O is next';
    }else if(!xIsNext){
        status_div.textContent = 'X is next';
    }
}

// function -2
let winner_calculate = () => {
    let top_left = game_cells[0].classList[2];
    let top_middle = game_cells[1].classList[2];
    let top_right = game_cells[2].classList[2];
    let middle_left = game_cells[3].classList[2];
    let middle_middle = game_cells[4].classList[2];
    let middle_right = game_cells[5].classList[2];
    let bottom_left = game_cells[6].classList[2];
    let bottom_middle = game_cells[7].classList[2];
    let bottom_right = game_cells[8].classList[2];

    // winner logic
    if(top_left && top_left == top_middle && top_left == top_right){
        update_winner_status(top_left);

    }else if(middle_left && middle_left == middle_middle && middle_left == middle_right){
        update_winner_status(middle_left);

    }else if(bottom_left && bottom_left == bottom_middle && bottom_left == bottom_right){
        update_winner_status(bottom_left);

    }else if(top_left && top_left == middle_left && top_left == bottom_left){
        update_winner_status(top_left);

    }else if(top_middle && top_middle == middle_middle && top_middle == bottom_middle){
        update_winner_status(top_middle);

    }else if(top_right && top_right == middle_right && top_right == bottom_right){
        update_winner_status(top_right);

    }else if(top_left && top_left == middle_middle && top_left == bottom_right){
        update_winner_status(top_left);

    }else if(top_right && top_right == middle_middle && top_right == bottom_left){
        update_winner_status(top_right);
    }else if(top_left && top_right && top_middle && middle_left && middle_middle && middle_right && bottom_left && bottom_middle && bottom_right){
        status_div.textContent = 'DRAW';
        status_div.style.color = 'yellow';
        gameIsLive = false;
    }
}

// function -3
let update_winner_status = (letter) => {
    winner = letter;
    gameIsLive = false;
    status_div.textContent = `${winner} is winner`;
    if(winner == 'o'){
        status_div.style.color = 'white';
    }
}



// event handlers
let handle_reset = (e) => {
    xIsNext = true;
    gameIsLive = true;
    winner = null;
    game_cells.forEach(cells => {
        cells.classList.remove('x');
        cells.classList.remove('o');
    })
    status_div.textContent = 'X is next';
}

let handle_game_cells = (e) => {
    const classList = e.target.classList;
    if(classList[2] == undefined && gameIsLive == true){
        if(xIsNext){
            classList.add('x');
            update_status();
            xIsNext = !xIsNext;
        }else{
            classList.add('o');
            update_status();
            xIsNext = !xIsNext;
        }
        winner_calculate();
    }
}



// event listners
reset_div.addEventListener('click', handle_reset)
game_cells.forEach(cells => {
    cells.addEventListener('click', handle_game_cells);
})





