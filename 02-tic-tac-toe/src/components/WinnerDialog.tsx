import { Square } from "./Square"

export function WinnerDialog({ children, resetGame}: {children: any, resetGame: any}) {
  if (children === null)
    return null

  const text = children === 'Draw' ? 'Draw' : 'Winner:'

  return (
    <section className='winner'>
      <div className='text'>
        <h2>{text}</h2>

        {
          children !== 'Draw' &&
            <header className='win'>
              <Square>{children}</Square>
            </header>
        }

        <footer>
          <button onClick={resetGame}>Play again?</button>
        </footer>
      </div>
    </section>
  )
}