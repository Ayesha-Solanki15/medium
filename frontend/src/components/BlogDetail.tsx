import { BlogTypeProps } from "../hooks";
import Avatar from "./Avatar";

const BlogDetail = ({ blog }: { blog: BlogTypeProps | undefined }) => {
  return (
    <div className=" grid grid-cols-1 lg:grid-cols-3 gap-3 m-4 p-4 ">
      <div className="lg:col-span-2 p-4">
        <div className="text-3xl font-extrabold">{blog?.title}</div>
        <div className="text-slate-500 pt-2">Posted on 2nd December 2023</div>
        <div className="pt-4">{blog?.content}</div>
      </div>
      <div className="lg:col-span-1 p-4 shadow-inner">
        <div className="text-gray-500 text-lg mb-2">Author</div>
        <div className="flex gap-2">
          <Avatar authorName={blog?.author.name || "Anonymous"} size="big" />
          <div>
            <div className="text-xl font-bold ">
              {blog?.author.name || "Anonymous"}
            </div>
            <div className="pt-2 text-slate-500">
              Random phrase about the author's ability to catch the user's
              attention
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
