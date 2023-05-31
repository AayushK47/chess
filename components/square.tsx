import Piece from "../core/pieces/piece";
import { Draggable, Droppable } from "react-beautiful-dnd";

interface SquareUIProps {
    isLightSquared: boolean;
    row: number;
    column: number;
    piece?: Piece
}

function SquareUI({ isLightSquared, piece, row, column }: SquareUIProps) {
    return (
        <Droppable droppableId={`${String.fromCharCode(65 + column + 1)}${row+1}`}>
            {(provided, snapshot) => (
                <div ref={provided.innerRef} className={`h-20 w-20 ${isLightSquared ? 'bg-slate-300' : 'bg-green-600'} ${snapshot.isDraggingOver ? 'border-4 border-solid border-amber-300' : ''}`} {...provided.droppableProps}>
                    { 
                        piece && 
                        <Draggable draggableId={`${String.fromCharCode(65 + column + 1)}${row+1}_${piece.name}`} index={0}>
                            {(provided, snapshot) => (
                                <img
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    src={`/images/${piece.color ? 'white' : 'black'}_${piece.name}.png`} 
                                    alt="" 
                                />
                            )}
                        </Draggable>
                    }
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    )
}

export default SquareUI;