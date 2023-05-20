import Piece from "./piece";

class Pawn extends Piece {
    constructor(color: boolean) {
        super('pawn', color);
    }
}

export default Pawn;