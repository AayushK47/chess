import Square from "./square";

export class MoveCalculator {
    board: Square[][];

    constructor(board: Square[][]) {
        this.board = board;
    }

    private straightLineMoves(
        row: number,
        col: number,
        increments: [number, number][]
    ) {
        const possibleMoves = [];
        const color = this.board[row][col].piece.color;
        for (let increment of increments) {
            let [possibleRow, possibleCol] = [
                increment[0] + row,
                increment[1] + col
            ];
            while (true) {
                if (this.isCoordinateValid(possibleRow, possibleCol)) {
                    if (this.board[possibleRow][possibleCol].isEmpty()) {
                        possibleMoves.push([possibleRow, possibleCol]);
                    }
                    if (this.board[possibleRow][possibleCol].piece) {
                        if (
                            this.board[possibleRow][possibleCol].hasEnemyPiece(
                                color
                            )
                        ) {
                            possibleMoves.push([possibleRow, possibleCol]);
                        }
                        break;
                    }
                    possibleRow += increment[0];
                    possibleCol += increment[1];
                } else {
                    break;
                }
            }
        }
        return possibleMoves;
    }

    isKingUnderAttack() {}

    calculatePawnMoves(row: number, col: number) {
        const possibleMoves = [];
        const piece = this.board[row][col].piece;
        const steps = piece.hasMoved ? 1 : 2;
        const pieceDir = piece.color ? -1 : 1;

        const start = row + pieceDir;
        const end = row + steps * pieceDir;

        for (let i of Array.from(
            { length: (end - start) / pieceDir + 1 },
            (value, index) => start + index * pieceDir
        )) {
            if (!this.isCoordinateValid(i, col)) break;
            if (this.board[i][col].piece) break;
            possibleMoves.push([i, col]);
        }

        const possibleColMoves = [col - 1, col + 1];
        for (let possibleColMove of possibleColMoves) {
            if (
                this.isCoordinateValid(row + pieceDir, possibleColMove) &&
                this.board[row + pieceDir][possibleColMove]?.hasEnemyPiece(
                    piece.color
                )
            ) {
                possibleMoves.push([row + pieceDir, possibleColMove]);
            }
        }

        return possibleMoves;
    }

    private isCoordinateValid(row: number, col: number) {
        return row >= 0 && row < 8 && col >= 0 && col < 8;
    }

    calculateKnightMoves(row: number, col: number) {
        const piece = this.board[row][col].piece;
        const possibleMoves = [
            [row - 2, col + 1],
            [row - 1, col + 2],
            [row + 1, col + 2],
            [row + 2, col + 1],
            [row + 2, col - 1],
            [row + 1, col - 2],
            [row - 1, col - 2],
            [row - 2, col - 1]
        ].filter(
            ([possibleMoveRow, possibleMoveColumn]) =>
                this.isCoordinateValid(possibleMoveRow, possibleMoveColumn) &&
                this.board[possibleMoveRow][possibleMoveColumn].isEmptyOrEnemy(
                    piece.color
                )
        );
        return possibleMoves;
    }

    calculateBishopMoves(row: number, col: number) {
        return this.straightLineMoves(row, col, [
            [1, 1],
            [-1, -1],
            [-1, 1],
            [1, -1]
        ]);
    }

    calculateRookMoves(row: number, col: number) {
        return this.straightLineMoves(row, col, [
            [0, 1],
            [0, -1],
            [1, 0],
            [-1, 0]
        ]);
    }

    calculateQueenMoves(row: number, col: number) {
        return this.straightLineMoves(row, col, [
            [0, 1],
            [0, -1],
            [1, 0],
            [-1, 0],
            [1, 1],
            [-1, -1],
            [-1, 1],
            [1, -1]
        ]);
    }

    calculateKingMoves(row: number, col: number) {
        const piece = this.board[row][col].piece;
        const possibleMoves = [
            [row + 1, col + 1],
            [row + 1, col - 1],
            [row + 1, col],
            [row, col - 1],
            [row, col + 1],
            [row - 1, col + 1],
            [row - 1, col - 1],
            [row - 1, col]
        ].filter(
            ([possibleMoveRow, possibleMoveColumn]) =>
                this.isCoordinateValid(possibleMoveRow, possibleMoveColumn) &&
                this.board[possibleMoveRow][possibleMoveColumn].isEmptyOrEnemy(
                    piece.color
                )
        );
        return possibleMoves;
    }
}
