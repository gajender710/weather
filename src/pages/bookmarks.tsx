import { useAppContext } from "@/context/app-context";
import { FaBookmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Bookmarks = () => {
  const { bookmarks, setBookmarks, setCurrentCity } = useAppContext();
  const navigate = useNavigate();

  const onCitySelect = (city: string) => {
    setCurrentCity(city);
    navigate("/");
  };

  const onBookmark = (city: string) => {
    setBookmarks((prev) => prev.filter((item) => item !== city));
  };

  return (
    <div className="flex h-screen flex-col  items-center  p-8 space-y-6">
      <div className="flex flex-col w-full h-full items-center py-4 px-6 bg-white bg-opacity-10 rounded-lg shadow-lg text-xl text-white font-semibold ">
        {!bookmarks.length ? (
          <div className="flex h-full w-full justify-center items-center">
            <h2>No Bookmarks</h2>
          </div>
        ) : (
          <>
            {bookmarks.map((item, index) => {
              return (
                <div
                  className={`flex w-full  items-center justify-between relative pt-2 mb-4 ${
                    !!index && "border-t-2 border-white"
                  }`}
                  key={index}
                >
                  <p className="text-xl self-start">{item}</p>
                  <div className="flex items-center space-x-8">
                    <button
                      className="rounded-full px-2 text-slate-600 text-base"
                      onClick={() => onCitySelect(item)}
                    >
                      View
                    </button>
                    <FaBookmark
                      className="text-white cursor-pointer hover:scale-110 transition-all"
                      onClick={() => onBookmark(item)}
                    />
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
