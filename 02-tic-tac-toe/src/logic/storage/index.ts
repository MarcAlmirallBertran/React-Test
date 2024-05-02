export const saveGame = (board: string[], turn: string) => {
    window.localStorage.setItem('board', JSON.stringify(board))
    window.localStorage.setItem('turn', turn)
}

export const saveWinner = (winner: string) => {
    window.localStorage.setItem('winner', winner)
}

export const resetGameStorag = () => {
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
    window.localStorage.removeItem('winner')
}