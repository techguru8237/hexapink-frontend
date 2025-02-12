import { JSX, useMemo, useState, useEffect } from "react";
import { toast } from "react-toastify";
import Select from "react-select";
import countryList from "react-select-country-list";
import "react-phone-number-input/style.css";

import { PiPlusCircle } from "react-icons/pi";
import { IoCloseCircleOutline } from "react-icons/io5";

import { UserItem } from "../../types";
import { updateUser } from "../../actions/user";
import Input from "../Common/Input";

interface CountryOption {
  value: string;
  label: string;
}

interface UserTypeOption {
  value: string;
  label: string;
}

interface EditUserProps {
  userData: UserItem;
  users: UserItem[];
  setUsers: (updatedUsers: UserItem[]) => void;
  onClose: () => void;
}

const userTypeOptions: UserTypeOption[] = [
  { value: "Customer", label: "Customer" },
  { value: "Partner", label: "Partner" },
  { value: "Manager", label: "Manager" },
];

const EditUser = ({
  onClose,
  userData,
  users,
  setUsers,
}: EditUserProps): JSX.Element => {
  const options: CountryOption[] = useMemo(() => countryList().getData(), []);

  const [firstName, setFirstName] = useState<string>(userData?.firstName || "");
  const [lastName, setLastName] = useState<string>(userData?.lastName || "");
  const [email, setEmail] = useState<string>(userData?.email || "");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [phone, setPhone] = useState<string | undefined>(userData?.phone);
  const [country, setCountry] = useState<CountryOption | null>(
    options.find((option) => option.label === userData?.country) || null
  );
  const [industry, setIndustry] = useState(userData.industry);
  const [company, setCompany] = useState(userData.company);
  const [userType, setUserType] = useState<UserTypeOption | null>(
    userTypeOptions.find((option) => option.value === userData?.type) ||
      userTypeOptions[0]
  );

  useEffect(() => {
    if (userData) {
      setFirstName(userData.firstName);
      setLastName(userData.lastName);
      setEmail(userData.email);
      setPhone(userData.phone);
      setCountry(
        options.find((option) => option.label === userData.country) || null
      );
      setUserType(
        userTypeOptions.find((option) => option.value === userData.type) ||
          userTypeOptions[0]
      );
    }
  }, [userData, options]);

  const handleSubmit = async () => {
    if (password !== passwordConfirm) {
      toast.error("Password is not match");
      return;
    }

    const updatedUser: UserItem = {
      ...userData,
      firstName,
      lastName,
      email,
      phone,
      country: country ? country.label : "",
      type: userType ? userType.value : "Customer", // Default to Customer
      industry,
      company,
    };

    await updateUser(userData._id, updatedUser, (updatedUser) => {
      const updatedUsers = users.map((user) =>
        user._id === updatedUser._id ? updatedUser : user
      );
      setUsers(updatedUsers);
      toast.success("User data udpated successfully.");
    });
    onClose(); // Close the edit panel after submission
  };

  return (
    <div className="flex flex-col w-[350px] overflow-y-auto items-start relative">
      <div className="flex flex-col items-center relative w-full bg-white rounded-lg overflow-hidden border border-solid border-[#3f3fbf] shadow-[0px_0px_0px_4px_#ececf8]">
        <div className="flex h-12 items-center justify-between gap-2 p-4 relative self-stretch w-full border-b [border-bottom-style:dashed] border-light-gray-3">
          <div className="relative w-fit [font-family:'Raleway-SemiBold',Helvetica] font-semibold text-[#333333] text-md tracking-[0.28px] leading-[21px] whitespace-nowrap">
            Edit User
          </div>
          <IoCloseCircleOutline
            onClick={onClose}
            className="text-2xl cursor-pointer"
          />
        </div>

        <div className="w-full flex flex-col items-start gap-4 p-6 border-b border-dashed border-light-gray-3">
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
            onChange={(e) => setLastName(e.target.value)}
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
          <Input
            label="Confirm Password"
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            error=""
          />
          <div className="w-full">
            <label className="block text-left">Country</label>
            <Select
              options={options}
              value={country}
              onChange={(selectedOption) => setCountry(selectedOption)}
              className="text-left focus-within:border-dark-blue"
            />
          </div>
          <div className="w-full">
            <label className="block text-left">User Type</label>
            <Select
              options={userTypeOptions}
              value={userType}
              onChange={(selectedOption) => setUserType(selectedOption)}
              className="text-left focus-within:border-dark-blue"
            />
          </div>
          <Input
            label="Phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            error=""
          />
          <Input
            label="Industry"
            type="text"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            error=""
          />
          <Input
            label="Company"
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            error=""
          />
        </div>

        <div className="w-full p-6">
          <button
            onClick={handleSubmit}
            disabled={!firstName || !lastName || !email}
            className={`bg-dark-blue ${
              !firstName || !lastName || !email
                ? "opacity-20 cursor-default read-only"
                : ""
            } text-white flex items-center justify-center gap-2 rounded-full w-full`}
          >
            <PiPlusCircle className="text-xl" />
            <span>Update User</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
