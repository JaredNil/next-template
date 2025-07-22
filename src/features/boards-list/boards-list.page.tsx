import { href, Link } from "react-router-dom";

import { rqClient } from "@/shared/openapi/instance";
import { ROUTES } from "@/shared/routes/routes";

function BoardsListPage() {

  const { data: boards } = rqClient.useQuery("get", "/boards");

  return (
    <div>
      <h1>Boards list</h1>

      {/* <Link to={href(ROUTES.BOARD, { boardId: "1" })}>Board</Link> */}
      {
        boards?.map((board) => (
          <Link to={href(ROUTES.BOARD, { boardId: board.id })}>
            {board.name}
          </Link>
        ))
      }
    </div>
  );
}

export const Component = BoardsListPage;
