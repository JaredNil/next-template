import { useQueryClient } from '@tanstack/react-query';

import type { Board } from '@/features/boards-list/model';
import { rqClient } from '@/shared/openapi/instance';

export function useDeleteBoard() {
  const queryClient = useQueryClient();

  const deleteBoardMutation = rqClient.useMutation(
    'delete',
    '/boards/{boardId}',
    {
      onSettled: async () => {
        await queryClient.invalidateQueries(
          rqClient.queryOptions('get', '/boards')
        );
      },
    }
  );

  return {
    deleteBoard: (boardId: Board['id']) =>
      deleteBoardMutation.mutate({
        params: {
          path: { boardId },
        },
      }),
    isPending: (boardsId: Board['id']) =>
      deleteBoardMutation.isPending &&
      deleteBoardMutation.variables.params.path.boardId === boardsId,
  };
}
