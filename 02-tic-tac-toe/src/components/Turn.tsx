import { TURNS } from "../constants";
import { Square } from "./Square";


export function Turn({children}: {children: string}) {

  return (
    <section className='turn'>
      <Square isSelected={children === TURNS.X}>
        {TURNS.X}
      </Square>
      <Square isSelected={children === TURNS.O}>
        {TURNS.O}
      </Square>
    </section>
  )
}