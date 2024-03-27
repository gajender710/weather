import { useAppContext } from "@/context/app-context";
import { GeoDetail } from "@/models/location";
import { weatherService } from "@/service/weather";
import { FaThermometerHalf } from "react-icons/fa";
import { TbDropletCheck } from "react-icons/tb";
import { BsSearch, BsWind } from "react-icons/bs";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineVisibility } from "react-icons/md";

const weatherImages: any = {
  haze: "/public/drizzle.png",
  clear: "/public/clear.png",
  clouds: "/public/clouds.png",
  rain: "/public/rain.png",
};

const Home = () => {
  const { bookmarks, setBookmarks, currentCity, setCurrentCity } =
    useAppContext();
  const navigate = useNavigate();
  const [location, setLocation] = useState<string>(currentCity);
  const [detail, setDetail] = useState<GeoDetail | null>(null);

  const onGetWeather = async () => {
    const { data, error, success } = await weatherService.getGeoLocation(
      location
    );

    if (!success) {
      alert(error);
      return;
    }

    const found = bookmarks.some(
      (item) => item.toLowerCase() === location.toLowerCase()
    );
    data.bookmarked = found;
    setDetail(data);
    setCurrentCity(data.name);
  };

  const onLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const onBookmark = () => {
    if (!detail?.name) {
      return;
    }

    let newBookmarks: string[] = [];
    if (detail.bookmarked) {
      newBookmarks = bookmarks.filter((item) => item != detail.name);
    } else {
      newBookmarks = [detail?.name, ...bookmarks];
    }
    setBookmarks(newBookmarks);
    setDetail({ ...detail, bookmarked: !detail.bookmarked });
  };

  useEffect(() => {
    if (!currentCity.length) {
      return;
    }
    onGetWeather();
  }, []);

  return (
    <div className="flex sm:h-screen flex-col  items-center  p-8 space-y-6">
      <div className="flex w-full items-center justify-center py-4 px-6 space-x-6  bg-white bg-opacity-10 rounded-lg shadow-lg">
        <input
          value={location}
          onChange={onLocationChange}
          className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder={"Enter City"}
        />
        <button
          onClick={onGetWeather}
          className="flex items-center py-2 px-4 text-lg font-medium rounded-full text-white bg-blue-500"
        >
          <BsSearch size={20} />
          <p className="ml-2">Search</p>
        </button>
      </div>

      <div className="flex flex-col w-full h-full items-center py-4 px-6 bg-white bg-opacity-10 rounded-lg shadow-lg text-xl text-white font-semibold space-y-8">
        {!detail ? (
          <div className="flex h-full w-full justify-center items-center">
            <h2>No Detail</h2>
          </div>
        ) : (
          <>
            <div className="flex w-full justify-center items-center relative">
              <p className="text-5xl sm:text-7xl self-start">{detail.name}</p>
              {detail.bookmarked ? (
                <FaBookmark
                  className="absolute right-0 text-white cursor-pointer hover:scale-110 transition-all"
                  onClick={onBookmark}
                />
              ) : (
                <FaRegBookmark
                  className="absolute right-0 text-white cursor-pointer hover:scale-110 transition-all"
                  onClick={onBookmark}
                />
              )}
            </div>

            <div className="flex flex-col sm:flex-row w-full">
              <div className="flex flex-col items-center">
                <img
                  src={weatherImages[detail.weather[0].main.toLowerCase()]}
                  className="h-50 w-50"
                />

                <p className="capitalize rounded-full border-white border-2 px-2 py-1 ">
                  {detail.weather[0].description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 w-full mt-8 gap-8 ">
                <div className="flex flex-col items-center space-y-2 sm:border-r-2 border-white">
                  <FaThermometerHalf className="" size={40} />
                  <p>
                    Temperature: {Math.round(detail.main.temp - 273.15)} &deg;C
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 ">
                  <TbDropletCheck className="" size={40} />
                  <p>Humidity: {detail.main.humidity} %</p>
                </div>
                <div className="flex flex-col items-center space-y-2 sm:border-r-2 border-white">
                  <BsWind className="" size={40} />
                  <p>Wind: {Math.round(detail.wind.speed * 3.6)} km/h</p>
                </div>
                <div className="flex flex-col items-center space-y-2 ">
                  <MdOutlineVisibility className="" size={40} />
                  <p>{Math.round(detail.visibility / 1000)} km</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
