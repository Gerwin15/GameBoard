import React, { useState } from 'react';
import { Grid, Button, Typography } from '@mui/material';

const GameBoard = () => {
  const [board, setBoard] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ]);
  const [isXTurn, setIsXTurn] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);
  const [status, setStatus] = useState("Next turn: Player ✖");

  const handleCellClick = (rowIndex, colIndex) => {
    if (board[rowIndex][colIndex] !== null || isGameOver) return;

    const newBoard = [...board];
    newBoard[rowIndex][colIndex] = isXTurn ? '✖' : 'Ｏ';
    setBoard(newBoard);


    const gameResult = checkGameStatus(newBoard);


    switch (gameResult) {
      case '✖':
      case 'Ｏ':
        setStatus(`Player ${gameResult} Wins!`);
        setIsGameOver(true);
        break;
      case 'DRAW':
        setStatus("It's a Draw!");
        setIsGameOver(true);
        break;
      default:
        setStatus(`Next turn: Player ${isXTurn ? 'Ｏ' : '✖'}`);
        setIsXTurn(!isXTurn);
        break;
    }
  };


  const checkGameStatus = (board) => {

    const checkLine = (a, b, c) => {
      if (a === b && b === c && a !== null) {
        return a; 
      }
      return null;
    };

    
    for (let i = 0; i < 3; i++) {
      let rowResult = checkLine(board[i][0], board[i][1], board[i][2]);
      let colResult = checkLine(board[0][i], board[1][i], board[2][i]);

      if (rowResult) return rowResult;
      if (colResult) return colResult;
    }

    
    let diagonal1 = checkLine(board[0][0], board[1][1], board[2][2]);
    let diagonal2 = checkLine(board[0][2], board[1][1], board[2][0]);

    if (diagonal1) return diagonal1;
    if (diagonal2) return diagonal2;

   
    const isDraw = board.every(row => row.every(cell => cell !== null));
    if (isDraw) return 'DRAW';

    return null; 
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Tic-Tac-Toe
      </Typography>

      <Grid container spacing={2} justifyContent="center" style={{ maxWidth: '300px', margin: 'auto' }}>
        {board.map((row, rowIndex) => (
          row.map((cell, colIndex) => (
            <Grid item xs={4} key={`${rowIndex}-${colIndex}`}>
              <Button
                variant="outlined"
                onClick={() => handleCellClick(rowIndex, colIndex)}
                style={{ height: '100px', width: '100px', fontSize: '24px' }}
                disabled={isGameOver} 
              >
                {cell}
              </Button>
            </Grid>
          ))
        ))}
      </Grid>

      <Typography variant="h6" style={{ marginTop: '20px' }}>
        {status}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setBoard([
            [null, null, null],
            [null, null, null],
            [null, null, null]
          ]);
          setIsXTurn(true);
          setIsGameOver(false);
          setStatus("Next turn: Player ✖");
        }}
        style={{ marginTop: '20px' }}
      >
        Reset Game
      </Button>
    </div>
  );
};

export default GameBoard;
