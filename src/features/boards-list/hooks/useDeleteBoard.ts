import { useQueryClient } from "@tanstack/react-query";

import { rqClient } from "@/shared/openapi/instance";
import type { Board } from "@/shared/types";



export function useDeleteBoard(){
    const queryClient = useQueryClient();
  
    const deleteBoardMutation = rqClient.useMutation("delete", "/boards/{boardId}", {
      onSettled: async () => {
        await queryClient.invalidateQueries(
          rqClient.queryOptions("get", "/boards"),
        );
      },

    });
  
    return {
      deleteBoard: (boardId : Board["id"]) => deleteBoardMutation.mutate({
        params: {
            path: {boardId}
        }
      }),
      isPending: (boardsId : Board["id"]) => 
        deleteBoardMutation.isPending && 
        deleteBoardMutation.variables.params.path.boardId === boardsId
    };
  
}