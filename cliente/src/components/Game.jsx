import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Board } from "./Board";
import { checkEndGame, checkWinner } from "../logic/board";
import { resetGameToStorage, saveGameToStorage } from "../logic/storage";
import { Square } from "./Square";
import { TURNS, PLAYERS } from "../constants";
import { useChatContext, Window, MessageList, MessageInput } from "stream-chat-react";
import { WinnerModal } from "./WinnerModal";
import "./Chat.css";

export const Game = ({ channel, setChannel }) => {

  const [playersJoined, setPlayersJoined] = useState(channel.state.watcher_count === 2);

	const [board, setBoard] = useState(() => {
    const  boardFromStorage = window.localStorage.getItem("board");
    if (boardFromStorage) return JSON.parse(boardFromStorage);
    return Array.from({ length: 42 }).map(() => ({ content: null, isDropping: false }));
  });
  
  const [player, setPlayer] = useState(PLAYERS.X);
  
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn");
    if (turnFromStorage) return turnFromStorage;
    return TURNS.X;
  });

  const [winner, setWinner] = useState(null);
  const {client} = useChatContext();

  useEffect(() => {
    const newWinner = checkWinner(board);
    if (newWinner){
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(board)) {
      setWinner(false);
    }
  }, [board]);

	const cleanAnimation = (index) => {
    const newBoard = [...board];
    newBoard[index].isDropping = false;
    setBoard(newBoard);
  }

  const resetGame = () => {
    setBoard(Array.from({ length: 42 }).map(() => ({ content: null, isDropping: false })));
    setTurn(TURNS.X);
    setWinner(null);
    resetGameToStorage();
  }

  const findSquareEmpty = (index) => {
    const numCol = index % 7;
    switch (numCol){
      case 0:
        for (let i = 35; i >= 0; i -= 7){
          if (board[i].content === null) {
            return i;
          }
        }
        break;
      case 1:
        for (let i = 36; i >= 1; i -= 7){
          if (board[i].content === null) {
            return i;
          }
        }
        break;
      case 2:
        for (let i = 37; i >= 2; i -= 7){
          if (board[i].content === null) {
            return i;
          }
        }
        break;
      case 3:
        for (let i = 38; i >= 3; i -= 7){
          if (board[i].content === null) {
            return i;
          }
        }
        break;
      case 4:
        for (let i = 39; i >= 4; i -= 7){
          if (board[i].content === null) {
            return i;
          }
        }
        break;
      case 5:
        for (let i = 40; i >= 5; i -= 7){
          if (board[i].content === null) {
            return i;
          }
        }
        break;
      case 6:
        for (let i = 41; i >= 6; i -= 7){
          if (board[i].content === null) {
            return i;
          }
        }
        break;
      default:
        alert('Número inválido');
    }
  }

  const updateBoard = async (index) => { 

    if (winner) return;

    const newBoard = [...board];
    if (turn === player) {
      const squareToUpdate = findSquareEmpty(index);
    
      newBoard[squareToUpdate].content = turn;
      newBoard[squareToUpdate].isDropping = true;
      setBoard(newBoard);

      const newTurn = player === PLAYERS.X ? PLAYERS.O : PLAYERS.X;
      setTurn(newTurn);

      await channel.sendEvent({
        type: "game-move",
        data: { squareToUpdate, player }
      });

      saveGameToStorage({
        board: newBoard,
        turn: newTurn
      });
    }
  }

  channel.on("user.watching.start", (event) => {
    setPlayersJoined(event.watcher_count === 2)
  });

  if (!playersJoined) {
    return <div> Esperando a que otro jugador entre...</div>
  }

  channel.on((event) => {
    if (event.type == "game-move" && event.user.id !== client.userID) {
      const currentPlayer = event.data.player === PLAYERS.X ? PLAYERS.O : PLAYERS.X;
      setPlayer(currentPlayer);
      setTurn(currentPlayer);

      const newBoard = [...board];
      newBoard[event.data.squareToUpdate].content = event.data.player;
      newBoard[event.data.squareToUpdate].isDropping = true;
      setBoard(newBoard);
    }
  });

	return (
    <div className="gameContainer">
      <main className='board'>
        <h1>4 en raya</h1>
        <button onClick={resetGame}>Reset del juego</button>

        <section className="game">
          <Board board={board} updateBoard={updateBoard} cleanAnimation={cleanAnimation}/>
        </section>

        <section className="turn">
          <Square isSelected={turn === TURNS.X}>
            {TURNS.X}
          </Square>
          <Square isSelected={turn === TURNS.O}>
            {TURNS.O}
          </Square>
        </section>

        <WinnerModal resetGame={resetGame} winner={winner} />
		  </main>
      <Window>
        <MessageList 
          disableDateSeparator 
          closeReactionSelectorOnClick
          hideDeletedMessages
          messageActions={["react"]}
        />
        <MessageInput noFiles/>
      </Window>
      <button onClick={async () => {
        await channel.stopWatching();
        setChannel(null);
      }}>Salir del juego</button>
    </div>
	);
};