import Knight from "./pieces/knight";
import Bishop from "./pieces/bishop";
import King from "./pieces/king";
import Pawn from "./pieces/pawn";
import Queen from "./pieces/queen";
import Rook from "./pieces/rook";
import Square from "./square";
import { MoveCalculator } from "./calculator";

class Board {
    private board: Square[][] = [];
    private possibleMoves: number[][] = [];

    setPossibleMoves(possibleMoves: number[][]) {
        this.possibleMoves = possibleMoves;
    }

    constructor() {
        this.createSquares();
        this.putPieces(true);
        this.putPieces(false);
    }

    move(initial: [number, number], final: [number, number]) {
        console.log(this.board);
        let possibleMoves = this.getValidMoves(initial[0], initial[1]);
        possibleMoves = possibleMoves.filter(
            (move) => JSON.stringify(final) === JSON.stringify(move)
        );
        if (possibleMoves.length) {
            this.board[final[0]][final[1]].piece =
                this.board[initial[0]][initial[1]].piece;
            this.board[initial[0]][initial[1]].piece = null;
        }
    }

    getBoard(): Square[][] {
        return this.board;
    }

    setBoard(board: Square[][]): void {
        this.board = board;
    }

    private createSquares(): void {
        for (let row = 0; row < 8; row++) {
            let col = 0;
            this.board.push([]);
            this.board[row] = Array.from(
                { length: 8 },
                (_, col) => new Square(row, col, (row + col) % 2 === 0)
            );
        }
    }

    private putPieces(isLightColored: boolean): void {
        const [pawnRow, piecesRow] = isLightColored ? [6, 7] : [1, 0];

        this.board[pawnRow].forEach((square) =>
            square.setPiece(new Pawn(isLightColored))
        );

        this.board[piecesRow][0].setPiece(new Rook(isLightColored));
        this.board[piecesRow][7].setPiece(new Rook(isLightColored));

        this.board[piecesRow][1].setPiece(new Knight(isLightColored));
        this.board[piecesRow][6].setPiece(new Knight(isLightColored));

        this.board[piecesRow][2].setPiece(new Bishop(isLightColored));
        this.board[piecesRow][5].setPiece(new Bishop(isLightColored));

        this.board[piecesRow][3].setPiece(new Queen(isLightColored));
        this.board[piecesRow][4].setPiece(new King(isLightColored));
    }

    markPossibleMoves(row: number, col: number) {
        const moveslist = this.getValidMoves(row, col);
        for (let [row, col] of moveslist) {
            this.board[row][col].possibleMove = true;
        }
        this.setPossibleMoves(moveslist);
    }

    clearPossibleMoves() {
        for (let [row, col] of this.possibleMoves) {
            this.board[row][col].possibleMove = false;
        }
    }

    getValidMoves(row: number, col: number) {
        console.log(this.board);
        const moveCalculator = new MoveCalculator(this.board);
        let moves: number[][];

        switch (this.board[row][col].piece.name) {
            case "knight":
                moves = moveCalculator.calculateKnightMoves(row, col);
                break;

            case "pawn":
                moves = moveCalculator.calculatePawnMoves(row, col);
                break;

            case "bishop":
                moves = moveCalculator.calculateBishopMoves(row, col);
                break;

            case "rook":
                moves = moveCalculator.calculateRookMoves(row, col);
                break;

            case "queen":
                moves = moveCalculator.calculateQueenMoves(row, col);
                break;

            case "king":
                moves = moveCalculator.calculateKingMoves(row, col);
                break;
        }
        return moves;
    }
}

export default Board;
