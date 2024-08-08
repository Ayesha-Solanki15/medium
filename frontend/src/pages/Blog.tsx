import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";

const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({ id: String(id) });
  if (loading) {
    return <div>Loading...</div>;
  }

  return <div>Blog Details</div>;
};

export default Blog;
