import { useEffect, useState } from "react";
import { FaRegCircleDot } from "react-icons/fa6";
import { LiaSearchSolid } from "react-icons/lia";

interface CountrySelectProps {
  selectedCountries: string[];
  setSelectedCountries: (countries: string[]) => void;
}

export default function CountrySelect({
  selectedCountries,
  setSelectedCountries,
}: CountrySelectProps) {
  const [countries, setCountries] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        // Assuming the country name is stored in data.name.common
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
    } else {
      setSearchResults(countries);
    }
  }, [search, countries]);

  const handleClickSearchedCountry = (country: string) => {
    if (selectedCountries.includes(country)) {
      setSelectedCountries(selectedCountries.filter((c) => c !== country));
    } else {
      setSelectedCountries([...selectedCountries, country]);
    }
  };

  return (
    <div className="max-w-3xl bg-white border border-light-gray-1 rounded-lg flex flex-col text-dark">
      <div className="p-4 border-b border-dashed border-light-gray-1 text-left font-raleway font-bold">
        Country
      </div>
      <div className="p-4 border-b border-dashed border-light-gray-1 flex items-center justify-start gap-2">
        <LiaSearchSolid />
        <input
          type="text"
          placeholder="Search Countries"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-light-gray-3 rounded px-2 py-1"
        />
      </div>

      <div className="flex flex-wrap gap-2 p-6">
        {searchResults.map((country) => (
          <div
            key={country}
            onClick={() => handleClickSearchedCountry(country)}
            className="flex items-center gap-2 px-2 py-1 rounded-full border border-light-gray-3 cursor-pointer hover:bg-light-gray-1"
          >
            <FaRegCircleDot className="text-light-gray-3" />
            {country}
          </div>
        ))}
      </div>

      <div className="p-4">
        <span className="font-bold">Selected Countries:</span>
        <div className="flex flex-wrap gap-2">
          {selectedCountries.map((country) => (
            <div
              key={country}
              className="flex items-center gap-2 px-2 py-1 rounded-full border border-light-gray-3 cursor-pointer bg-light-gray-1"
              onClick={() => handleClickSearchedCountry(country)}
            >
              <FaRegCircleDot className="text-light-gray-3" />
              {country}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
