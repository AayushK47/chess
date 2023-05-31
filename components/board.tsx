import { DragDropContext } from "react-beautiful-dnd";
import { store } from "../store/board/store";
import SquareUI from "./square";

function BoardUI() {
  console.log();

  return (
    <DragDropContext
      onDragEnd={(e) => {
        console.log(e);
      }}
    >
      <div className="flex flex-wrap" style={{ width: "640px" }}>
        {store
          .getState()
          .board.getBoard()
          .flat()
          .map(({ row, column, piece }) => (
            <SquareUI
              key={`${row}_${column}`}
              piece={piece}
              row={row}
              column={column}
              isLightSquared={(row + column) % 2 === 0}
            />
          ))}
      </div>
    </DragDropContext>
  );
}

export default BoardUI;
