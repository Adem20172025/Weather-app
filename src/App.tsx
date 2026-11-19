import { useEffect, useState } from "react";
import { DailyForeCast } from "./weather comps/daily-forcast";
import { Header } from "./weather comps/header";
import { HourlyForecast } from "./weather comps/hourly-forcast";
import { Navbar } from "./weather comps/Navbar";
import { TempInfo } from "./weather comps/Temp-Info";
import retry from "./assets/icon-retry.svg";
export interface all {
  current: {
    time: string;
    interval: number;
    wind_speed_10m: number;
    precipitation: number;
    temperature_2m: number;
    apparent_temperature: number;
    weather_code: number;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
  };
}
export interface cityInfo {
  results: [
    {
      id: number;
      name: string;
      latitude: number;
      longitude: number;
    },
  ];
}
export default function App() {
  const [allInfo, setAllInfo] = useState<all | null>(null);
  const [city, setCity] = useState("adama");
  const [name, setName] = useState("");
  const [isLoading, setIsloading] = useState<boolean>(true);
  const [error, setError] = useState("");
  useEffect(() => {
    fetchWeather();
  }, []);
  async function handleCity() {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&format=json`,
    );

    if (!response.ok) {
      throw new Error("Failed to find city");
    }

    const data: cityInfo = await response.json();

    if (!data.results?.length) {
      throw new Error(`${city} not found`);
    }

    return data.results[0];
  }

  async function fetchWeather() {
    if (!city.trim()) {
      setError("Please, Enter City name!");
      return;
    }
    setIsloading(true);
    setError("");
    try {
      const location = await handleCity();

      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&daily=weather_code,temperature_2m_min,temperature_2m_max&hourly=temperature_2m,weather_code&current=wind_speed_10m,precipitation,temperature_2m,apparent_temperature,weather_code&timezone=auto`,
      );

      if (!response.ok) {
        throw new Error(`Weather request failed: ${response.status}`);
      }

      const data: all = await response.json();

      setName(location.name);
      setAllInfo(data);
    } catch (err) {
      if (err instanceof TypeError) {
        setError("Network error. Please check your internet connection.");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsloading(false);
    }
  }
  return (
    <main className="overflow-x-hidden md:flex md:flex-col md:items-center">
      <Navbar />
      <Header
        fetchWeather={fetchWeather}
        isLoading={isLoading}
        setCity={setCity}
      />
      <section
        className={` md:w-full md:grid md:grid-cols-3 md:max-w-7xl relative`}
      >
        {error ? (
          <div className="col-span-full flex flex-col items-center justify-center gap-5 py-20">
            <img
              onClick={fetchWeather}
              className="cursor-pointer w-10"
              src={retry}
              alt="retry"
            />
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <>
            {" "}
            <TempInfo allInfo={allInfo} name={name} isLoading={isLoading} />
            <DailyForeCast allInfo={allInfo} isLoading={isLoading} />
            <HourlyForecast allInfo={allInfo} isLoading={isLoading} />
          </>
        )}
      </section>
    </main>
  );
}
