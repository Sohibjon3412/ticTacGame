window.addEventListener('DOMContentLoaded', () => {
  let elBox = Array.from(document.querySelectorAll('.game-box'));
  let playerDisplay = document.querySelector('.display-player');
  let resetButton = document.querySelector('#reset');
  let announcer = document.querySelector('.announcer');
  
  let board = ['', '', '', '', '', '', '', '', ''];
  let currentPlayer = 'X';
  let gameActive = true;
  
  let playerX = 'playerX';
  let playerO = 'playerO';
  let tie = 'tie';
  
  const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];

  function handleResultValidation() {
    let roundWon = false;
    for(let i = 0; i < 8; i++) {
      const winCondition = winningConditions[i];
      const a = board[winCondition[0]];
      const b = board[winCondition[1]];
      const c = board[winCondition[2]];
      if (a === "" || b === "" || c === "") {
        continue;
      }
      if (a === b && b === c) {
        roundWon = true;
        break;
      }
    }

    if(roundWon) {
      announce(currentPlayer === "X" ? playerX : playerO);
      gameActive = false;
      return;
    }
    if (!board.includes(''))
    announce(tie);
  }

  const announce = (type) => {
    switch(type){
      case playerO:
        announcer.innerHTML = 'Player <span class="playerO">O </span> Yutdi';
        break;
      case playerX:
        announcer.innerHTML = 'Player <span class="playerX">X </span> Yutdi';
        break;
      case tie:
        announcer.innerText = 'Teng';
    }
    announcer.classList.remove('hide');
  };


  const changePlayer = () => {
    playerDisplay.classList.remove(`player${currentPlayer}`);
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    playerDisplay.innerText = currentPlayer;
    playerDisplay.classList.add(`player${currentPlayer}`);
  }

  const userAction = (box, index) => {
    if(isValidAction(box) && gameActive) {
      box.innerText = currentPlayer;
      box.classList.add(`player${currentPlayer}`);
      updateBoard(index);
      handleResultValidation();
      changePlayer();
    }
  }

  elBox.forEach((box, index) => {
    box.addEventListener('click', () => userAction(box, index));
  });
  
  const isValidAction = (box) => {
    if(box.innerText === "X" || box.innerText === "O") {
      return false;
    }
    return true;
  };

  const updateBoard = (index) => {
    board[index] = currentPlayer;
  }
  
  const resetBoard = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    announcer.classList.add('hide');

    if(currentPlayer === 'O') {
      changePlayer();
    }
    elBox.forEach(box => {
      box.innerText = '';
      box.classList.remove('playerX');
      box.classList.remove('playerO');
    });
  }
  
  resetButton.addEventListener('click', resetBoard);
});