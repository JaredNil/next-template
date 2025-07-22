import { useParams } from "react-router-dom";

function BoardPage() {
  const params = useParams();

  return <div>Board page {params.boardId}</div>;
}

export const Component = BoardPage;
