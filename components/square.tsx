import Piece from "../core/pieces/piece";

interface SquareUIProps {
    isLightSquared: boolean;
    row: number;
    column: number;
    piece?: Piece
}

function SquareUI({ isLightSquared, piece }: SquareUIProps) {
    return (
        <div className={`h-20 w-20 ${isLightSquared ? 'bg-slate-300' : 'bg-green-600'}`}>
            { piece && <img draggable={false} src={`/images/${piece.color ? 'white' : 'black'}_${piece.name}.png`} alt="" /> }
        </div>
    )
}

export default SquareUI;