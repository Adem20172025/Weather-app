import search from "../assets/icon-search.svg";
import type { Dispatch, SetStateAction } from "react";
import disabled from "../assets/icon-error.svg";
interface fetch {
  fetchWeather: () => Promise<void>;
  setCity: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
}
export function Header({ fetchWeather, setCity, isLoading }: fetch) {
  return (
    <section className="p-4 flex flex-col gap-7 md:gap-17 md:w-full md:max-w-3xl">
      <h1 className="text-5xl font-bold text-center">
        How's the sky looking today?
      </h1>
      <div className="flex flex-col gap-2.5 md:flex-row">
        <label htmlFor="search" className="md:w-2/3 w-full flex relative">
          <input
            type="search"
            onChange={(e) => setCity(e.target.value)}
            placeholder="search for a place..."
            className="rounded-md w-full p-3 bg-Neutral-600/80 placeholder: pl-10 outline-0 font-semibold text-Neutral-200 text-sm"
          />
          <img
            className="absolute left-3 top-1/2 -translate-y-1/2"
            src={search}
            alt="search icon"
          />
        </label>
        <button
          disabled={isLoading}
          onClick={fetchWeather}
          className={`w-full md:w-1/3 p-2 bg-blue-500 rounded-md ${isLoading ? "cursor-not-allowed" : "cursor-pointer"} hover:${isLoading ? "" : "bg-blue-700 "} transition-all duration-400 flex items-center justify-center`}
        >
          {isLoading ? <img src={disabled} alt="" /> : "Search"}
        </button>
      </div>
    </section>
  );
}
