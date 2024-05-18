import { useParams } from "react-router-dom";

const CommentPage = () => {
  const { productId } = useParams();

  return <div>Comment page {productId}</div>;
};

export default CommentPage;