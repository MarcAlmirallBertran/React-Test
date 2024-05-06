import { useEffect, useState } from "react"
import { getRandomFact } from "../services/facts"

export function useCatFact() {
  const [fact, setFact] = useState<string>('')

  const refreshFact = () => {
    getRandomFact().then(value => setFact(value))
  }

  useEffect(() => {
    refreshFact()

    return () => {
      setFact('')
    }
  }, [])

  return { fact, refreshFact }
}