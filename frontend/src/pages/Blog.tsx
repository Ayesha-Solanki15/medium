import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import BlogDetail from "../components/BlogDetail";
import Navbar from "../components/Navbar";

const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({ id: String(id) });

  return (
    <div>
      <Navbar authorName={blog?.author.name || "Anonymous"} />
      {loading && <div>Loading...</div>}
      <BlogDetail blog={blog} />
    </div>
  );
};

export default Blog;
