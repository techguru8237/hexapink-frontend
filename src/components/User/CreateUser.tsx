import { JSX, useMemo, useState } from "react";
import Input from "../Common/Input";
import { PiPlusCircle } from "react-icons/pi";
import { createUser } from "../../actions/user";
import Select from "react-select";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input/input";
import countryList from "react-select-country-list";

interface CountryOption {
  value: string;
  label: string;
}

const CreateUser = (): JSX.Element => {
  const options: CountryOption[] = useMemo(() => countryList().getData(), []);

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string | undefined>(undefined);
  const [country, setCountry] = useState<CountryOption | null>(null);

  const handleSubmit = async () => {
    // Create user object
    const userData = {
      firstName,
      lastName,
      email,
      password,
      phone,
      country: country ? country.label : "", // Use country name if selected
    };

    await createUser(userData, () => {});
    // Reset form
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setPhone(undefined);
    setCountry(null);
  };

  return (
    <div className="flex flex-col w-[350px] items-start relative">
      <div className="flex flex-col items-center relative w-full bg-white rounded-lg overflow-hidden border border-solid border-[#3f3fbf] shadow-[0px_0px_0px_4px_#ececf8]">
        <div className="flex h-12 items-center gap-2 pl-4 pr-0 py-0 relative self-stretch w-full border-b [border-bottom-style:dashed] border-light-gray3">
          <div className="relative w-fit [font-family:'Raleway-SemiBold',Helvetica] font-semibold text-[#333333] text-md tracking-[0.28px] leading-[21px] whitespace-nowrap">
            Create New User
          </div>
        </div>

        <div className="w-full flex flex-col items-start gap-6 p-6 border-b border-dashed border-light-gray3">
          <Input
            label="First Name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            error=""
          />
          <Input
            label="Last Name"
            type="text"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            error=""
          />
          <Input
            label="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error=""
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error=""
          />
          <div className="w-full">
            <label className="block mb-2 text-left">Country</label>
            <Select
              options={options}
              value={country}
              onChange={(selectedOption) => setCountry(selectedOption)}
              className="text-left focus-within:border-dark-blue"
            />
          </div>
          <div className="w-full flex flex-col">
            <label htmlFor="" className="text-left">
              Phone
            </label>
            <PhoneInput
              placeholder="Enter phone number"
              type="tel"
              autoComplete="tel"
              value={phone}
              onChange={setPhone}
              className="bg-white p-2 text-dark rounded-md border outline-none focus:border-dark-blue"
            />
          </div>
        </div>

        <div className="w-full p-6">
          <button
            onClick={handleSubmit}
            disabled={!firstName || !lastName || !email || !password}
            className={`bg-dark-blue ${
              !firstName || !lastName || !email || !password
                ? "opacity-20 cursor-default read-only"
                : ""
            } text-white flex items-center justify-center gap-2 rounded-full w-full`}
          >
            <PiPlusCircle className="text-xl" />
            <span>Create User</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
