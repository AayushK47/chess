import Knight from "./pieces/Knight";
import Bishop from "./pieces/bishop";
import King from "./pieces/king";
import Pawn from "./pieces/pawn";
import Queen from "./pieces/queen";
import Rook from "./pieces/rook";
import Square from "./square";

class Board {
    private board: Square[][];
    constructor() {
        this.createSquares();
        this.putPieces(true);
        this.putPieces(false);
    }

    private createSquares() {
        for(let row=0;row<8;row++) {
            let col = 0;
            this.board.push([]);
            this.board[row] = Array.from({ length: 8 }, (_, col) => new Square(row, col, (row + col) % 2 === 0))
        }
    }

    private putPieces(isLightColored: boolean) {
        const [pawnRow, piecesRow] = isLightColored ? [6, 7] : [1, 0];

        this.board[pawnRow].forEach(square => square.setPiece(new Pawn(isLightColored)));

        this.board[piecesRow][0].setPiece(new Rook(isLightColored));
        this.board[piecesRow][7].setPiece(new Rook(isLightColored));

        this.board[piecesRow][1].setPiece(new Knight(isLightColored));
        this.board[piecesRow][6].setPiece(new Knight(isLightColored));

        this.board[piecesRow][2].setPiece(new Bishop(isLightColored));
        this.board[piecesRow][5].setPiece(new Bishop(isLightColored));

        this.board[piecesRow][3].setPiece(new Queen(isLightColored));
        this.board[piecesRow][4].setPiece(new King(isLightColored));
    }

    getBoard() {
        return this.board;
    }
}

const board = new Board()
console.log(board.getBoard())