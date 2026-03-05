import { useState } from "react";

function App() {

  const [board, setBoard] = useState(Array(9).fill(null));
  const [xTurn, setXTurn] = useState(true);
  const [winner, setWinner] = useState(null);

  const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];

  const checkWinner = (newBoard) => {

    for(let combo of winningCombos){

      const [a,b,c] = combo;

      if(
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ){
        return newBoard[a];
      }

    }

    return null;
  };

  const handleClick = (index) => {

    if(board[index] || winner) return;

    const newBoard = [...board];

    newBoard[index] = xTurn ? "X" : "O";

    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);

    if(gameWinner){
      setWinner(gameWinner);
    }

    setXTurn(!xTurn);
  };

  const restartGame = () => {

    setBoard(Array(9).fill(null));
    setWinner(null);
    setXTurn(true);

  };

  return (

    <div className="app">

      <h1>Tic Tac Toe</h1>

      {winner ? (
        <h2>Winner: {winner}</h2>
      ) : (
        <h2>Turn: {xTurn ? "X" : "O"}</h2>
      )}

      <div className="board">

        {board.map((cell,index)=>(
          <div
            key={index}
            className="cell"
            onClick={()=>handleClick(index)}
          >
            {cell}
          </div>
        ))}

      </div>

      <button onClick={restartGame}>
        Restart Game
      </button>

    </div>
  );
}

export default App;