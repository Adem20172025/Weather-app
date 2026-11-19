import type { all } from "../App";
import fog from "../assets/icon-fog.webp";
import snow from "../assets/icon-snow.webp";
import rainy from "../assets/icon-rain.webp";
import drizzle from "../assets/icon-drizzle.webp";
import storm from "../assets/icon-storm.webp";
import sunny from "../assets/icon-sunny.webp";
import partlyClound from "../assets/icon-partly-cloudy.webp";
import overcast from "../assets/icon-overcast.webp";

interface daily {
  allInfo: all | null;
  isLoading: boolean;
}
export function DailyForeCast({ allInfo, isLoading }: daily) {
  if (isLoading) {
    return (
      <section className="p-4 pt-0 flex flex-col gap-3 md:col-start-1 md:col-span-2">
        <h2>Daily forecast</h2>
        <article className="h-50 grid grid-cols-3 md:grid-cols-7 gap-3">
          {Array.from({ length: 7 }).map((_, index) => (
            <div
              key={index}
              className={`flex flex-col ${isLoading ? "animate-pulse" : ""} bg-Neutral-600/60 p-2 items-center rounded-xl gap-4`}
            >
              <p></p>
              <img src="" alt="" />
              <div className="flex justify-between w-full">
                <p></p>
                <p></p>
              </div>
            </div>
          ))}
        </article>
      </section>
    );
  }
  if (!allInfo) return null;
  return (
    <section className="p-4 md:pb-0 flex flex-col gap-3 md:col-start-1 md:col-span-2">
      <h2>Daily forecast</h2>
      <article className="grid grid-cols-3 md:grid-cols-7 gap-3">
        {allInfo.daily.time.map((date, index) => {
          const day = new Date(date).toLocaleDateString("en-US", {
            weekday: "short",
            timeZone: "UTC",
          });
          const code = allInfo?.daily.weather_code[index];
          const max = allInfo.daily.temperature_2m_max[index];
          const min = allInfo.daily.temperature_2m_min[index];

          return (
            <div
              key={date}
              className="flex flex-col bg-Neutral-600/60 p-2 items-center rounded-xl gap-4"
            >
              <p>{day}</p>

              {code !== undefined && (
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
                  alt="daily icon"
                />
              )}

              <div className="flex justify-between w-full">
                <p>{Math.round(max)}°</p>
                <p>{Math.round(min)}°</p>
              </div>
            </div>
          );
        })}
      </article>
    </section>
  );
}
