export const Square = ({ children, isSelected, updateBoard, index }: {children: string, isSelected: boolean, updateBoard: Function, index: number}) => {
    const className = `square ${isSelected ? 'is-selected' : ''}`
  
    const handleClick = () => {
      updateBoard(index)
    }
  
    return (
      <div onClick={handleClick} className={className}>
        {children}
      </div>
    )
  }