import Piece from "./pieces/piece";

class Square {
    row: number;
    column: number;
    isLight: boolean;
    piece?: Piece | null;
    possibleMove: boolean;
    
    constructor(row: number, column: number, isLight: boolean) {
        this.row = row;
        this.column = column;
        this.isLight = isLight;
        this.piece = null;
        this.possibleMove = false;
    }

    setPiece(piece: Piece) {
        this.piece = piece;
    }

    isEmpty() {
        return this.piece ? false : true;
    }

    hasEnemyPiece(color: boolean) {
        return (this.piece && this.piece.color !== color) ? true : false ;
    }

    isEmptyOrEnemy(color: boolean) {
        return this.isEmpty() || this.hasEnemyPiece(color);
    }
}

export default Square;