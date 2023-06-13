class Piece {
    name: string;
    color: boolean;
    hasMoved: boolean;

    constructor(name: string, color: boolean) {
        this.name = name;
        this.color = color;
        this.hasMoved = false;
    }
}

export default Piece;
