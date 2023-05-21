import { store } from "../store/board/store";
import SquareUI from "./square";

function BoardUI() {
    console.log();
        
    return (
        <div className="flex flex-wrap" style={{ width: "640px" }}>
            {
                store
                .getState()
                .board
                .getBoard()
                .flat()
                .map(({ row, column, piece }) => 
                    <SquareUI
                        piece={piece}
                        row={row}
                        column={column}
                        isLightSquared={(row + column) % 2 === 0}
                    />)}
        </div>
    )
}

export default BoardUI;