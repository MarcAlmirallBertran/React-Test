export const Square = ({ children, isSelected, updateBoard, index }: {children?: string | null, isSelected?: boolean, updateBoard?: (index: number) => void, index?: number}) => {
    const className = `square${isSelected ? ' is-selected' : ''}`
  
    const handleClick = () => {
      if (updateBoard && index !== undefined)
        updateBoard(index)
    }
  
    return (
      <div onClick={handleClick} className={className}>
        {children}
      </div>
    )
  }