import { Square } from './Square.jsx';
import { calculateDistanceToTop } from '../logic/calculateDistanceToTop.js';
export const Board = ({ board, updateBoard, cleanAnimation }) => {
	return (
		board.map((_, index) => {
			return (
				<Square key={index} index={index} updateBoard={updateBoard} isDropping={board[index].isDropping}
					distanceToTop={calculateDistanceToTop(index)}
					cleanAnimation={cleanAnimation}
				>
					{board[index].content}
				</Square>
			)
		})
	)
}