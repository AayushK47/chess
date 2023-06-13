import Piece from "../core/pieces/piece";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Image from "next/image";

interface SquareUIProps {
    isLightSquared: boolean;
    row: number;
    column: number;
    piece?: Piece;
    possibleMove: boolean;
    getValidMoves?: any;
    clearSuggestions?: any;
}

function SquareUI({
    isLightSquared,
    piece,
    row,
    column,
    possibleMove,
    getValidMoves,
    clearSuggestions
}: SquareUIProps) {
    return (
        <Droppable
            droppableId={`${String.fromCharCode(65 + column)}${row + 1}`}
        >
            {(provided, snapshot) => (
                <div
                    onMouseDown={() =>
                        piece && getValidMoves.mutate({ row, column })
                    }
                    onMouseUp={() => piece && clearSuggestions.mutate()}
                    ref={provided.innerRef}
                    className={`h-20 w-20 ${
                        isLightSquared ? "bg-slate-300" : "bg-green-600"
                    } ${
                        possibleMove
                            ? "border-4 border-solid border-slate-600"
                            : ""
                    } ${
                        snapshot.isDraggingOver
                            ? "border-4 border-solid border-amber-300"
                            : ""
                    }`}
                    {...provided.droppableProps}
                >
                    {piece && (
                        <Draggable
                            draggableId={`${String.fromCharCode(65 + column)}${
                                row + 1
                            }_${piece.name}`}
                            index={0}
                        >
                            {(provided, snapshot) => (
                                <Image
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    src={`/images/${
                                        piece.color ? "white" : "black"
                                    }_${piece.name}.png`}
                                    alt=""
                                />
                            )}
                        </Draggable>
                    )}
                    {possibleMove && (
                        <div className="absolute top-0 left-0 right-0 bottom-0 mx-auto w-16 h-16 rounded-full"></div>
                    )}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
}

export default SquareUI;
