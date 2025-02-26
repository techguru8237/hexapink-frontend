import { useState } from "react";
import { Combobox } from "@headlessui/react";
import { ChevronDownIcon, CheckIcon } from "@heroicons/react/20/solid";
import { countries } from "countries-list";

interface Country {
  id: number;
  name: string;
  code: string;
  phone: string;
}

const countryArray: Country[] = Object.entries(countries).map(
  ([code, country], index) => ({
    id: index + 1,
    name: country.name,
    code: code,
    phone: country.phone.join(", "),
  })
);

interface PhoneNumberInputProps {
  label: string;
  setPhoneNumber: (phoneNumber: string) => void;
  error: string;
}

export default function PhoneNumberInput({
  label,
  setPhoneNumber,
  error
}: PhoneNumberInputProps) {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(countryArray[0]);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredCountries =
    query === ""
      ? countryArray
      : countryArray.filter(
          (country) =>
            country.name.toLowerCase().includes(query.toLowerCase()) ||
            country.phone.includes(query) ||
            country.code.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <Combobox
      as="div"
      value={selectedCountry}
      onChange={(country: Country) => {
        setQuery("");
        setSelectedCountry(country);
        setIsOpen(false);
      }}
      style={{ width: "100%" }}
      className="flex flex-col gap-1"
    >
      <label className="text-sm text-light-dark font-medium text-left">
        {label}
      </label>
      <div className="flex justify-center items-bottom divide-x border border-light-gray-3 rounded-lg">
        <div className="relative flex p-2">
          <Combobox.Input
            className="w-28 bg-transparent placeholder:text-gray-400 focus:outline-none text-dark-blue font-bold"
            onChange={(event) => setQuery(event.target.value)}
            onBlur={() => setQuery("")}
            displayValue={(country: Country) =>
              country ? `+${country.phone}` : ""
            }
            maxLength={6}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
          <Combobox.Button
            className="absolute inset-y-0 right-0 flex items-center px-2 focus:outline-none bg-transparent hover:bg-transparent hover:border-none outline-none border-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <ChevronDownIcon
              className="h-5 w-5 text-gray-400 "
              aria-hidden="true"
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
                  <span className="block font-raleway font-medium truncate group-data-[selected]:font-raleway">
                    +{country.phone}
                  </span>

                  <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-pink-500 group-data-[selected]:flex group-data-[focus]:text-white">
                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
                </Combobox.Option>
              ))}
            </Combobox.Options>
          )}
        </div>
        <input
          type="text"
          inputMode="numeric"
          name="phone-number"
          pattern="[0-9]*"
          maxLength={12}
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
          onChange={(event) => {
            setPhoneNumber(selectedCountry?.phone + event.target.value);
          }}
          className="bg-transparent block w-full focus:outline-none p-2 text-dark-blue font-bold"
        />
      </div>
      {error && <span className="text-red text-xs">{error}</span>}
    </Combobox>
  );
}
