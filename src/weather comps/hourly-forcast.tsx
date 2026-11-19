import { useState } from "react";
import type { all } from "../App";

import fog from "../assets/icon-fog.webp";
import snow from "../assets/icon-snow.webp";
import rainy from "../assets/icon-rain.webp";
import drizzle from "../assets/icon-drizzle.webp";
import storm from "../assets/icon-storm.webp";
import sunny from "../assets/icon-sunny.webp";
import partlyCloudy from "../assets/icon-partly-cloudy.webp";
import overcast from "../assets/icon-overcast.webp";

interface Props {
  allInfo: all | null;
  isLoading: boolean;
}

export function HourlyForecast({ allInfo, isLoading }: Props) {
  const [selectedDay, setSelectedDay] = useState(0);

  if (isLoading) {
    return (
      <section className="p-4 flex flex-col bg-Neutral-700/70 m-4 rounded-2xl gap-3 md:row-start-1 md:row-span-2 md:col-start-3">
        <div className="flex justify-between items-center">
          <h2>Hourly forecast</h2>

          <div className="h-8 w-24 rounded-md bg-Neutral-600 animate-pulse" />
        </div>

        <article className="flex flex-col gap-3">
          {Array.from({ length: 9 }).map((_, index) => (
            <div
              key={index}
              className="bg-neutral-300/15 flex justify-between items-center p-1 rounded-md px-2 animate-pulse"
            >
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-Neutral-600" />
                <div className="h-4 w-16 rounded bg-Neutral-600" />
              </div>

              <div className="h-4 w-10 rounded bg-Neutral-600" />
            </div>
          ))}
        </article>
      </section>
    );
  }

  if (!allInfo) return null;

  const days = allInfo.daily.time;
  const selectedDate = days[selectedDay];

  const hourlyData = allInfo.hourly.time
    .map((time, index) => ({
      time,
      temperature: allInfo.hourly.temperature_2m[index],
      code: allInfo.hourly.weather_code[index],
    }))
    .filter(({ time }) => time.slice(0, 10) === selectedDate)
    .slice(0, 9);

  function getIcon(code: number) {
    if (code === 0) return sunny;
    if (code <= 2) return partlyCloudy;
    if (code === 3) return overcast;
    if (code === 45 || code === 48) return fog;
    if (code <= 55) return drizzle;
    if (code <= 67) return rainy;
    if (code <= 77) return snow;
    if (code <= 82) return rainy;
    if (code <= 86) return snow;
    return storm;
  }

  return (
    <section className="p-4 flex flex-col bg-Neutral-700/70 m-4 rounded-2xl gap-3 md:row-start-1 md:row-span-2 md:col-start-3">
      <div className="flex justify-between items-center">
        <h2>Hourly forecast</h2>

        <select
          value={selectedDay}
          onChange={(e) => setSelectedDay(Number(e.target.value))}
          className="text-white bg-Neutral-600 p-1 px-2 rounded-md outline-0"
        >
          {days.map((date, index) => (
            <option key={date} value={index}>
              {new Date(`${date}T12:00:00`).toLocaleDateString("en-US", {
                weekday: "long",
                timeZone: "UTC",
              })}
            </option>
          ))}
        </select>
      </div>

      <article className="flex flex-col gap-3">
        {hourlyData.map(({ time, temperature, code }) => {
          const hour = new Date(time).toLocaleTimeString("en-US", {
            hour: "numeric",
            hour12: true,
            timeZone: "UTC",
          });

          return (
            <div
              key={time}
              className="bg-neutral-300/15 flex justify-between items-center p-1 rounded-md px-2"
            >
              <div className="flex items-center">
                <img className="w-10" src={getIcon(code)} alt="Weather icon" />
                <p>{hour}</p>
              </div>

              <p>{Math.round(temperature)}°</p>
            </div>
          );
        })}

        {hourlyData.length === 0 && (
          <p>No hourly forecast available for this day.</p>
        )}
      </article>
    </section>
  );
}
