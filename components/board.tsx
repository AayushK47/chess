"use client";
import { DragDropContext } from "react-beautiful-dnd";
import useBoard from "../hooks/useBoard";
import SquareUI from "./square";
import Square from "../core/square";

function BoardUI() {
    const { board, movePiece, clearSuggestions, getValidMoves } = useBoard();
    return (
        <DragDropContext
            onDragEnd={(e) => {
                const [sourceCol, sourceRow] = e.source.droppableId.split("");
                const [finalCol, finalRow] =
                    e.destination.droppableId.split("");
                movePiece.mutate({
                    initial: [
                        parseInt(sourceRow) - 1,
                        sourceCol.charCodeAt(0) - 65
                    ],
                    final: [parseInt(finalRow) - 1, finalCol.charCodeAt(0) - 65]
                });
            }}
        >
            <div className="flex flex-wrap" style={{ width: "640px" }}>
                {board &&
                    board
                        .flat()
                        .map(({ row, column, piece, possibleMove }: Square) => (
                            <SquareUI
                                clearSuggestions={clearSuggestions}
                                getValidMoves={getValidMoves}
                                key={`${row}_${column}`}
                                piece={piece}
                                row={row}
                                column={column}
                                isLightSquared={(row + column) % 2 === 0}
                                possibleMove={possibleMove}
                            />
                        ))}
            </div>
        </DragDropContext>
    );
}

export default BoardUI;
