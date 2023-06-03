'use client'
import { DragDropContext } from "react-beautiful-dnd";
import useBoard from "../hooks/useBoard";
import SquareUI from "./square";
import Square from "../core/square";

function BoardUI() {
  const { board } = useBoard();
  return (
    <DragDropContext
      onDragEnd={(e) => {

      }}
    >
      <div className="flex flex-wrap" style={{ width: "640px" }}>
        {
          board && board.flat().map(({ row, column, piece, possibleMove }: Square) => <SquareUI key={`${row}_${column}`} piece={piece} row={row} column={column} isLightSquared={(row + column) % 2 === 0} possibleMove={possibleMove}
      />)
        }
      </div>
    </DragDropContext>
  );
}

export default BoardUI;
