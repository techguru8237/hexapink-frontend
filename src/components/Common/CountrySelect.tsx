import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6"; // Import arrow icons
import { IoMdRadioButtonOn } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { LiaSearchSolid } from "react-icons/lia";

interface CountrySelectProps {
  selectedCountries: string[];
  setSelectedCountries: (countries: string[]) => void;
  disabled?: boolean;
}

export default function CountrySelect({
  selectedCountries,
  setSelectedCountries,
  disabled,
}: CountrySelectProps) {
  const [countries, setCountries] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [showAllCountries, setShowAllCountries] = useState<boolean>(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const countryNames = data.map((country: any) => country.name.common);
        setCountries(countryNames);
      });
  }, []);

  useEffect(() => {
    if (search) {
      const results = countries.filter((country) =>
        country.toLowerCase().includes(search.toLowerCase())
      );
      setSearchResults(results);
    } else if (showAllCountries) {
      setSearchResults(countries);
    } else {
      setSearchResults(countries.slice(0, 10));
    }
  }, [search, countries, showAllCountries]);

  const handleClickSearchedCountry = (country: string) => {
    if (selectedCountries.includes(country)) {
      setSelectedCountries(selectedCountries.filter((c) => c !== country));
    } else {
      setSelectedCountries([...selectedCountries, country]);
    }
  };

  const toggleShowAllCountries = () => {
    setShowAllCountries((prev) => !prev);
  };

  return (
    <div className="max-w-3xl bg-white border border-light-gray-1 rounded-lg flex flex-col text-dark">
      <div className="p-4 border-b border-dashed border-light-gray-1 text-left font-raleway font-bold">
        Country
      </div>
      <div className="p-4 border-b border-dashed border-light-gray-1 flex items-center justify-start gap-2">
        <div className="flex items-center gap-4 p-2 border border-light-gray-3 rounded-lg">
          <LiaSearchSolid />
          <input
            type="text"
            placeholder="Search Countries"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            disabled={disabled}
            className="bg-transparent border-none outline-none"
          />
        </div>
        <button
          onClick={toggleShowAllCountries}
          className="ml-auto px-2 py-1 border flex items-center rounded-full text-dark"
        >
          {showAllCountries ? (
            <FaChevronUp className="text-sm" />
          ) : (
            <FaChevronDown className="text-sm" />
          )}{" "}
          {/* Arrow icon */}
          <span className="ml-1">
            {showAllCountries ? "Show Less" : "Show All"}
          </span>
        </button>
      </div>

      <div className="max-h-48 overflow-y-auto flex flex-wrap gap-2 p-6 border-b border-dashed border-light-gray-1">
        {searchResults.map((country) => (
          <button
            key={country}
            onClick={() => handleClickSearchedCountry(country)}
            disabled={disabled}
            className="flex items-center gap-2 px-2 py-1 rounded-full border border-light-gray-3 cursor-pointer hover:bg-light-gray-1"
          >
            <IoMdRadioButtonOn className="text-light-gray-3" />
            {country}
          </button>
        ))}
      </div>

      <div className="p-4 flex flex-col justify-start gap-2">
        <span className="font-bold text-left">Selected Countries:</span>
        <div className="flex flex-wrap gap-2">
          {selectedCountries.map((country) => (
            <div
              key={country}
              className="flex items-center gap-2 px-2 py-1 rounded-full border border-light-gray-3 bg-light-gray-1"
            >
              <IoMdRadioButtonOn className="text-dark-blue" />
              <span className="text-dark-blue">{country}</span>
              <button
                onClick={() => handleClickSearchedCountry(country)}
                className="w-4 h-4 text-red border border-light-gray-3 rounded-full p-1 box-content"
                disabled={disabled}
              >
                <IoClose />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
