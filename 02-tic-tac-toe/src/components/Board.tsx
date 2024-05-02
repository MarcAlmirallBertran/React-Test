import { Square } from "./Square"

export function Board({board, updateBoard}: {board: string[], updateBoard: any}) {

  return (<section className='game'>
    {
      board.map((value: string, index: number) => {
      return (
        <Square key={index} index={index} updateBoard={updateBoard}>
            {value}
        </Square>
      )
      })
    }
  </section>)

}