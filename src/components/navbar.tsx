import { Link } from "react-router-dom";
import { FaBookmark, FaHome } from "react-icons/fa";

const Navbar = () => {
  return (
    <header className="w-full lg:w-fit">
      <nav className="lg:h-screen  px-6 py-2 lg:py-8 w-full ">
        <ul className="flex  items-center lg:items-start  justify-evenly lg:justify-start lg:flex-col bg-white bg-opacity-10 rounded-lg h-full p-6 lg:space-y-4">
          <li>
            <Link
              to={"/"}
              className="flex items-center text-white text-xl hover:text-white space-x-2"
            >
              <FaHome size={25} />
              <p>Home</p>
            </Link>
          </li>
          <li>
            <Link
              to={"/bookmarks"}
              className="flex items-center text-white text-xl hover:text-white space-x-2"
            >
              <FaBookmark size={20} />
              <p>Bookmarks</p>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
