
export const Square = ({ children, isSelected, updateBoard, index, isDropping, distanceToTop, cleanAnimation }) => {

  
	const className = `square ${isSelected ? 'is-selected' : ''}`;


  const onAnimationEnd = () => {
    cleanAnimation(index)
  };

	const handleClick = () => {
		updateBoard(index);
	}

	const animationStyles = isDropping
    ? {
        animation: 'fallAnimation 0.5s ease-out',
      }
    : {};
		
	
	return (
		
		<div onClick={handleClick} className={className} >
      {isDropping && (
        <style>
          {`
            @keyframes fallAnimation {
              0% {
                transform: translateY(${distanceToTop}px);
              }
              100% {
                transform: translateY(0);
              }
            }
          `}
        </style>
      )}
			<div 
        onAnimationEnd={onAnimationEnd}
				className={`square-${index}`}
				style={animationStyles}
			>
				{children}
			</div>
			
		</div>
	)
}