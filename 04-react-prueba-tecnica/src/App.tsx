import { useCatImage } from './hooks/useCatImage'
import { useCatFact } from './hooks/useCatFact'
import './App.css'

function App() {
  const { fact, refreshFact } = useCatFact()
  const { imageUrl, imageAlt } = useCatImage({ fact })
  
  const handleClick = async () => {
    refreshFact()
  }
  

  return (
    <main>
      <h1>App de gatitos</h1>
      <button onClick={handleClick}>Refresh</button>
      {fact && <p>{fact}</p>}
      {imageUrl && <img src={imageUrl} alt={imageAlt}/>}
    </main>
  )
}

export default App