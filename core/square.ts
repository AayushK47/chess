import Piece from "./pieces/piece";

class Square {
    row: number;
    column: number;
    isLight: boolean;
    piece?: Piece | null;
    
    constructor(row: number, column: number, isLight: boolean) {
        this.row = row;
        this.column = column;
        this.isLight = isLight;
        this.piece = null;
    }

    setPiece(piece: Piece) {
        this.piece = piece;
    }
}

export default Square;