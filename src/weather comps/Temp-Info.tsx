import fog from "../assets/icon-fog.webp";
import snow from "../assets/icon-snow.webp";
import rainy from "../assets/icon-rain.webp";
import drizzle from "../assets/icon-drizzle.webp";
import storm from "../assets/icon-storm.webp";
import sunny from "../assets/icon-sunny.webp";
import partlyClound from "../assets/icon-partly-cloudy.webp";
import overcast from "../assets/icon-overcast.webp";
import type { all } from "../App";
interface info {
  allInfo: all | null;
  name: string;
  isLoading: boolean;
}
export function TempInfo({ allInfo, name, isLoading }: info) {
  const code = allInfo?.current.weather_code ?? -1;

  const currentDate = allInfo?.current.time
    ? new Date(allInfo.current.time).toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <section
      className={`p-4 pb-0 flex flex-col gap-4 ${isLoading ? "animate-pulse" : ""} md:col-span-2`}
    >
      {isLoading ? (
        <div className="h-55 p-5 flex items-center  justify-center rounded-xl w-full bg-Neutral-600/70">
          Loading...
        </div>
      ) : (
        <div className="h-55 p-5 items-center rounded-xl w-full bg-[url('./assets/bg-today-small.svg')] md:bg-[url('./assets/bg-today-large.svg')] bg-cover flex flex-col md:flex-row md:justify-between bg-center gap-5">
          <div className="text-center flex flex-col gap-2 md:text-start md:w-fit">
            <h2 className="font-bold text-2xl capitalize">{name}</h2>
            <p className="text-md leading-7 text-neutral-300 font-semibold">
              {currentDate}
            </p>
          </div>
          <div className="flex items-center justify-between md:justify-end md:gap-7 w-full md:w-fit">
            {allInfo?.current.weather_code && (
              <img
                className="w-27"
                src={
                  code === 0
                    ? sunny
                    : code < 3
                      ? partlyClound
                      : code === 3
                        ? overcast
                        : code < 49
                          ? fog
                          : code < 58
                            ? drizzle
                            : code < 83
                              ? rainy
                              : code < 86
                                ? snow
                                : storm
                }
                alt="icon"
              />
            )}
            <h2 className="font-bold text-7xl">
              {allInfo?.current.temperature_2m}°
            </h2>
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-Neutral-600/80 p-3 rounded-xl flex flex-col gap-3">
          <p>Feels Like</p>
          <h3 className="text-xl font-semibold">
            {isLoading ? "--" : `${allInfo?.current.apparent_temperature}°`}
          </h3>
        </div>
        <div className="bg-Neutral-600/80 p-3 rounded-xl flex flex-col gap-3">
          <p>Humidity</p>
          <h3 className="text-xl font-semibold">
            {isLoading ? "--" : `${allInfo?.current.apparent_temperature}%`}
          </h3>
        </div>
        <div className="bg-Neutral-600/80 p-3 rounded-xl flex flex-col gap-3">
          <p>Wind speed</p>
          <h3>{isLoading ? "--" : `${allInfo?.current.wind_speed_10m}mph`}</h3>
        </div>{" "}
        <div className="bg-Neutral-600/80 p-3 rounded-xl flex flex-col gap-3">
          <p>Precipitation</p>
          <h3 className="text-xl font-semibold">
            {isLoading ? "--" : `${allInfo?.current.precipitation}in`}
          </h3>
        </div>
      </div>
    </section>
  );
}
