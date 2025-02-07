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
    minColumns: searchParams.get("minColumns") || "",
    maxColumns: searchParams.get("maxColumns") || "",
    minLeads: searchParams.get("minLeads") || "",
    maxLeads: searchParams.get("maxLeads") || "",
    startDate: searchParams.get("startDate") || "",
    endDate: searchParams.get("endDate") || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
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
    navigate(`/admin/tables?${queryParams.toString()}`);
    onClose();
  };

  const handleClearFilters = () => {
    setFilters({
      minColumns: "",
      maxColumns: "",
      minLeads: "",
      maxLeads: "",
      startDate: "",
      endDate: "",
    });
    navigate("/admin/tables");
    onClose();
  };

  return (
    <div className="flex flex-col w-[350px] items-start relative">
      <div className="flex flex-col items-center relative w-full bg-white rounded-lg overflow-hidden border border-solid border-[#3f3fbf] shadow-[0px_0px_0px_4px_#ececf8]">
        <div className="flex h-12 items-center gap-2 pl-4 pr-0 py-0 relative self-stretch w-full border-b [border-bottom-style:dashed] border-light-gray3">
          <div className="relative w-fit [font-family:'Raleway-SemiBold',Helvetica] font-semibold text-[#333333] text-md tracking-[0.28px] leading-[21px] whitespace-nowrap">
            Filter Tables
          </div>
        </div>

        <div className="w-full flex flex-col items-start gap-6 p-6 border-b border-dashed border-light-gray3">
          <div className="w-full flex gap-4">
            <Input
              label="Min Columns"
              type="number"
              value={filters.minColumns}
              onChange={(e) => handleChange(e, "minColumns")}
              error=""
            />
            <Input
              label="Max Columns"
              type="number"
              value={filters.maxColumns}
              onChange={(e) => handleChange(e, "maxColumns")}
              error=""
            />
          </div>

          <div className="w-full flex gap-4">
            <Input
              label="Min Leads"
              type="number"
              value={filters.minLeads}
              onChange={(e) => handleChange(e, "minLeads")}
              error=""
            />
            <Input
              label="Max Leads"
              type="number"
              value={filters.maxLeads}
              onChange={(e) => handleChange(e, "maxLeads")}
              error=""
            />
          </div>

          <Input
            label="Start Date"
            type="date"
            value={filters.startDate}
            onChange={(e) => handleChange(e, "startDate")}
            error=""
          />
          <Input
            label="End Date"
            type="date"
            value={filters.endDate}
            onChange={(e) => handleChange(e, "endDate")}
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
