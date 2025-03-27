import { WINNER_DIAGONAL_COMBOS } from "../constants";

const findVerticalStripe = (boardToCheck) => {
  for (let i = 0; i < 21; i++){
    if (boardToCheck[i].content !== null &&
      boardToCheck[i+7].content === boardToCheck[i].content &&
      boardToCheck[i+14].content === boardToCheck[i].content &&
      boardToCheck[i+21].content === boardToCheck[i].content
    ){
      return boardToCheck[i].content;
    }
  }
  return null;
}

const findHorizontalStripe = (boardToCheck) => {
	// 0 1 2 3 
	// 7 8 9 10
	// 35 36 37 38
  for (let i = 0; i <= 35; i+=7){
		for (let j = i; j <= i+3 ; j++){
			if (boardToCheck[j].content !== null &&
				boardToCheck[j+1].content === boardToCheck[j].content &&
				boardToCheck[j+2].content === boardToCheck[j].content &&
				boardToCheck[j+3].content === boardToCheck[j].content
			){
				return boardToCheck[j].content;
			}
	
		}
	}
  
  return null;
}

const findDiagonalStripes = (boardToCheck) => {
	for (const combo of WINNER_DIAGONAL_COMBOS){
		const [a, b, c, d] = combo
		if (boardToCheck[a].content &&
			boardToCheck[a].content === boardToCheck[b].content &&
			boardToCheck[a].content === boardToCheck[c].content &&
			boardToCheck[a].content === boardToCheck[d].content
		){
			return boardToCheck[a].content
		}
	}
	return null;
}

export const checkWinner = (boardToCheck) => {

	if (findVerticalStripe(boardToCheck)){
		return findVerticalStripe(boardToCheck);
	} else if (findHorizontalStripe(boardToCheck)){
		return findHorizontalStripe(boardToCheck);
	} else if (findDiagonalStripes(boardToCheck)) {
		return findDiagonalStripes(boardToCheck);
	} 
	else {
		return null;
	}	
} 

export const checkEndGame = (newBoard) => {
	return newBoard.every((square) => square.content !== null);
}