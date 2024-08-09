import { Link } from "react-router-dom";
import Avatar from "./Avatar";

const Navbar = ({ authorName }: { authorName: string }) => {
  return (
    <div className="flex justify-between items-center px-12 border-b-2 border-slate-100 p-4 mb-2 cursor-pointer">
      <Link to="/blogs" className="text-gray-600 font-semibold text-xl">
        Medium
      </Link>
      <div className="flex justify-center items-center">
        <Link to="/publish">
          <button
            type="button"
            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 cursor-pointer"
          >
            Publish
          </button>
        </Link>
        <Avatar authorName={authorName} size="big" />
      </div>
    </div>
  );
};

export default Navbar;
