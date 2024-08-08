import Avatar from "./Avatar";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <div className=" border-b-2 border-slate-200 p-4 mb-4">
      <div className="flex justify-start items-center">
        <Avatar authorName={authorName} size="small" />{" "}
        <span className="font-extralight text-slate-500 ml-2 text-sm">
          {authorName}
        </span>
        <span className="inline-block bg-slate-400 rounded-full h-1 w-1 ml-2" />
        <span className="text-slate-400 ml-1 text-sm">{publishedDate} </span>
      </div>
      <div className="text-2xl font-semibold mt-2">{title}</div>
      <div className="text-xl font-thin pt-1">{content.slice(0, 100)}...</div>
      <div className="text-slate-500 text-sm font-thin">
        {Math.ceil(content.length / 100)} minute(s) read
      </div>
    </div>
  );
};

export default BlogCard;
