

export const Square = ({ children, isSelected, updateBoard, index }) => {
    //componente separado de la app reutilizable
    const className = `square ${isSelected ? "is-selected" : ""}`;
  
    const handleClick = () => {
      updateBoard(index);
    }
  
    return (
       <div onClick={handleClick} className={className}>
        {children}
      </div>
    );
  };
  