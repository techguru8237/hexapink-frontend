import { useState } from "react";
import { Combobox } from "@headlessui/react";
import { ChevronDownIcon, CheckIcon } from "@heroicons/react/20/solid";
import { countries } from "countries-list"; // Importing the countries object

interface Country {
  id: number;
  name: string;
}

interface CountryData {
  name: string;
}

interface CountryComboboxProps {
  onCountrySelect: (country: string) => void;
}

// Convert countries object to an array of countries
const countryArray: Country[] = Object.keys(countries).map((key, index) => {
  const country = countries[key as keyof typeof countries] as CountryData;
  return {
    id: index + 1,
    name: country.name,
  };
});

const CountryCombobox = ({ onCountrySelect }: CountryComboboxProps) => {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(
    countryArray[0]
  );
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const filteredCountries =
    query === ""
      ? countryArray
      : countryArray.filter((country) =>
          country.name.toLowerCase().includes(query.toLowerCase())
        );

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    onCountrySelect(country.name);
  };

  return (
    <Combobox as="div" value={selectedCountry} onChange={handleCountrySelect} style={{width: "100%"}}>
      <label
        className={`block text-sm font-raleway font-semibold] text-start ${
          isOpen ? "text-pink-500" : "text-gray-900"
        }`}
      >
        COUNTRY *
      </label>
      <div className="relative mt-2">
        <Combobox.Input
          className="peer block w-full font-raleway font-medium bg-transparent py-1.5 pr-12 text-base text-gray-900 placeholder:text-gray-400 border-b border-gray-300 focus:border-pink-500 focus:outline-none sm:text-sm"
          onChange={(event) => setQuery(event.target.value)}
          onBlur={() => setQuery("")}
          displayValue={(country: Country) => country?.name}
        />
        <Combobox.Button
          className="absolute inset-y-0 right-0 border-none outline-none flex items-center px-2 bg-transparent focus:outline-none hover:bg-transparent hover:border-none hover:outline-none mb-1"
          onClick={() => setIsOpen(!isOpen)}
        >
          <ChevronDownIcon
            className="h-5 w-5 text-gray-400"
          />
        </Combobox.Button>

        {filteredCountries.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {filteredCountries.map((country) => (
              <Combobox.Option
                key={country.id}
                value={country}
                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-pink-500 data-[focus]:text-gray-600 data-[focus]:outline-none"
              >
                <span className="block font-raleway font-medium truncate group-data-[selected]:font-raleway text-left">
                  {country.name}
                </span>

                <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-pink-500 group-data-[selected]:flex group-data-[focus]:text-white">
                  <CheckIcon className="h-5 w-5" />
                </span>
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
};

export default CountryCombobox;
