import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Board from "../core/board";

function useBoard() {
    const board = new Board();
    const queryClient = useQueryClient();
    const { data } = useQuery(['board'], () => board.getBoard());

    function getValidMoves() {
        return useMutation(async (params: Record<string, any>) => board.markPossibleMoves(params.row, params.column), {
            onSuccess() {
                queryClient.setQueryData(['board'], board.getBoard());
            }
        });
    }

    function clearSuggestions() {
        return useMutation(async () => board.clearPossibleMoves(), {
            onSuccess() {
                queryClient.setQueryData(['board'], board.getBoard());
            }
        });
    }


    return { 
        board: data, 
        getValidMoves: getValidMoves(), 
        clearSuggestions: clearSuggestions() 
    };
}

export default useBoard;