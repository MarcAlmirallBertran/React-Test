import { useState } from 'react'
import { TURNS } from './constants'
import { WinnerDialog } from './components/WinnerDialog'
import { checkWiner } from './logic/board'
import { Board } from './components/Board'
import { Turn } from './components/Turn'
import { resetGameStorag, saveGame, saveWinner } from './logic/storage'
import confetti from 'canvas-confetti'
import './App.css'

function App() {
  const [board, setBoard] = useState<string[]>(() => {
    const storage = window.localStorage.getItem('board')
    return storage ? JSON.parse(storage) : Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const storage = window.localStorage.getItem('turn')
    return storage ?? TURNS.X
  })
  const [winner, setWinner] = useState(() => {
    const storage = window.localStorage.getItem('winner')
    return storage ?? null
  })

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    resetGameStorag()
  }

  const updateBoard = (index: number) => {
    // Do not update if it is not null
    if (board[index] || winner) return

    const newBoard = [... board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    saveGame(newBoard, newTurn)

    const newWinner = checkWiner(newBoard, index)
    if (newWinner) {
      saveWinner(newWinner)
      if (newWinner !== 'Draw') 
        confetti()
      setWinner(newWinner)
    }
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset game</button>
      <Board board={board} updateBoard={updateBoard}></Board>
      <Turn>{turn}</Turn>

      <WinnerDialog resetGame={resetGame}>{winner}</WinnerDialog>
    </main>
  )
}

export default App
