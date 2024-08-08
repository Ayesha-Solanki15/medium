import { Link } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import Navbar from "../components/Navbar";
import { BlogTypeProps, useBlogs } from "../hooks";

const Blogs = () => {
  const { loading, blogs } = useBlogs();

  return (
    <>
      <div>
        <Navbar authorName="Ayesha" />
      </div>
      {loading ? (
        <div className="text-xl font-semibold ml-[5%] max-w-[80%] lg:ml-[15%]">
          Loading...
        </div>
      ) : (
        <div className="flex flex-col justify-center ml-[5%] max-w-[80%] lg:ml-[15%]">
          {blogs.map((blog: BlogTypeProps) => (
            <Link to={`/blog/${blog.id}`} key={blog.id}>
              <BlogCard
                authorName={blog.author.name || "Anonymous"}
                title={blog.title}
                content={blog.content}
                publishedDate={blog.publishedDate}
              />
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Blogs;
