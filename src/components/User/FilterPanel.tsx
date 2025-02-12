import { useState } from "react";
import Input from "../Common/Input";
import { useNavigate, useSearchParams } from "react-router-dom";

interface FilterPanelProps {
  onClose: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    firstName: searchParams.get("firstName") || "",
    lastName: searchParams.get("lastName") || "",
    email: searchParams.get("email") || "",
    phone: searchParams.get("phone") || "",
    country: searchParams.get("country") || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof typeof filters
  ) => {
    setFilters((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleApplyFilters = () => {
    const currentPage = searchParams.get("page") || "1";
    const queryParams = new URLSearchParams();

    // Add filters to query params
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        queryParams.set(key, value);
      }
    });

    // Preserve the current page
    queryParams.set("page", currentPage);

    // Navigate with the new filters
    navigate(`/admin/users?${queryParams.toString()}`);
    onClose();
  };

  const handleClearFilters = () => {
    setFilters({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      country: "",
    });
    navigate("/admin/users");
    onClose();
  };

  return (
    <div className="flex flex-col w-[350px] items-start relative">
      <div className="flex flex-col items-center relative w-full bg-white rounded-lg overflow-hidden border border-solid border-[#3f3fbf] shadow-[0px_0px_0px_4px_#ececf8]">
        <div className="flex h-12 items-center gap-2 pl-4 pr-0 py-0 relative self-stretch w-full border-b [border-bottom-style:dashed] border-light-gray-3">
          <div className="relative w-fit [font-family:'Raleway-SemiBold',Helvetica] font-semibold text-[#333333] text-md tracking-[0.28px] leading-[21px] whitespace-nowrap">
            Filter Users
          </div>
        </div>

        <div className="w-full flex flex-col items-start gap-6 p-6 border-b border-dashed border-light-gray-3">
          <Input
            label="First Name"
            type="text"
            value={filters.firstName}
            onChange={(e) => handleChange(e, "firstName")}
            error=""
          />
          <Input
            label="Last Name"
            type="text"
            value={filters.lastName}
            onChange={(e) => handleChange(e, "lastName")}
            error=""
          />
          <Input
            label="Email"
            type="email"
            value={filters.email}
            onChange={(e) => handleChange(e, "email")}
            error=""
          />
          <Input
            label="Phone"
            type="tel"
            value={filters.phone}
            onChange={(e) => handleChange(e, "phone")}
            error=""
          />
          <Input
            label="Country"
            type="text"
            value={filters.country}
            onChange={(e) => handleChange(e, "country")}
            error=""
          />
        </div>

        <div className="w-full p-6 flex gap-4">
          <button
            onClick={handleClearFilters}
            className="flex-1 py-2 px-4 border border-dark-blue text-dark-blue rounded-full"
          >
            Clear
          </button>
          <button
            onClick={handleApplyFilters}
            className="flex-1 py-2 px-4 bg-dark-blue text-white rounded-full"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
