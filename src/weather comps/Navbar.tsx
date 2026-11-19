import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../assets/logo.svg";
export function Navbar() {
  return (
    <nav className=" flex items-center h-15 justify-between p-4 md:w-full md:max-w-7xl md:p-0 md:px-10 md:py-10">
      <img src={logo} className="w-30 md:w-40" alt="weather Now logo" />
      <div className="text-sm bg-Neutral-600/60 p-1 rounded-md">
        <FontAwesomeIcon icon={faGear} />
        <select className="outline-0">
          <option value="Units">Units</option>
        </select>
      </div>
    </nav>
  );
}
