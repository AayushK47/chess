import { createSlice } from "@reduxjs/toolkit";
import Board from "../../core/board";

export interface BoardState {
    board: Board
}

const initialState: BoardState = {
    board: new Board()
}

const boardSlice = createSlice({
    name: "board",
    initialState,
    reducers: {

    }
})

export default boardSlice.reducer;