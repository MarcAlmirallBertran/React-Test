import { WINNER_COMBOS } from "../constants"


export const checkWiner = (boardToCheck: string[], index: number) => {
  if (boardToCheck.every(item => item !== null))
      return 'Draw'
  for (const combo of WINNER_COMBOS[index]) {
      const [a, b ,c] = combo
      if (boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]) {
        return boardToCheck[a]
      }
  }
  return null
}