import { useMemo, useState } from "react";
import { PiBinoculars } from "react-icons/pi";
import countryList from "react-select-country-list";
import Select from "react-select";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";

import PhoneNumberInput from "../../Common/Inputs/PhoneNumberInput";

interface LookupPanelProps {
  onLookup: (country: string, phoneNumber: string) => void;
}

interface CountryOption {
  value: string;
  label: string;
  phoneCode: string;
}

countries.registerLocale(enLocale);

export default function LookupPanel({ onLookup }: LookupPanelProps) {
  const options: CountryOption[] = useMemo(() => {
    return countryList().getData().map((country) => ({
      ...country,
      phoneCode: countries.getAlpha2Code(country.value, "en") || "",
    }));
  }, []);

  const [country, setCountry] = useState<CountryOption | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleLookupClick = () => {
    if (country) {
      onLookup(country.label, phoneNumber);
    }
  };

  const handleCountryChange = (selectedOption: CountryOption | null) => {
    setCountry(selectedOption);
    if (selectedOption) {
      setPhoneNumber(`+${selectedOption.phoneCode}`);
    }
  };

  return (
    <div className="flex flex-col bg-white border-2 border-light-gray-3 rounded-lg">
      <div className="flex flex-col items-start px-6 py-4 border-b border-light-gray-3 border-dashed">
        <h2 className="text-xl font-semibold">Look Up</h2>
      </div>
      <div className="flex flex-col gap-4 p-4">
        <div className="w-full">
          <label className="block mb-2 text-left">Country</label>
          <Select
            options={options}
            onChange={handleCountryChange}
            className="text-left"
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                padding: "2px 0px",
                borderColor: state.isFocused ? "#4040BF" : "#D9D9F2",
                borderRadius: "8px",
              }),
            }}
          />
        </div>
        <PhoneNumberInput
          label="Phone Number"
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          error=""
        />
        <button
          onClick={handleLookupClick}
          className="flex items-center justify-center border rounded-full px-2 py-2 mt-2 bg-dark-blue text-white"
        >
          <PiBinoculars className="mr-2 text-xl" />
          Look Up
        </button>
      </div>
    </div>
  );
}
