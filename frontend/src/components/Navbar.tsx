import Avatar from "./Avatar";

const Navbar = ({ authorName }: { authorName: string }) => {
  return (
    <div className="flex justify-between px-18 border-b-2 border-slate-100 p-4 mb-2">
      <div>Medium</div>
      <Avatar authorName={authorName} size="big" />
    </div>
  );
};

export default Navbar;
