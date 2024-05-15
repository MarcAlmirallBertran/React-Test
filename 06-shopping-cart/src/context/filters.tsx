import { createContext, ReactNode, useState } from "react";

export const FiltersContext = createContext({})

export function FiltersProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 0
  })

  return (
    <FiltersContext.Provider value={{filters, setFilters}}>
      {children}
    </FiltersContext.Provider>
  )
}