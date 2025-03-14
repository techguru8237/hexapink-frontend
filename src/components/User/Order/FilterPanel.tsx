import React, { useState, useEffect, useCallback } from "react";
import { X, RotateCcw, Filter, Check, ChevronDown } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useCurrency } from "../../../contexts/Currency";

interface FilterPanelProps {
  onClose: () => void;
  onFilterChange: (filters: FilterValues) => void;
}

export interface FilterValues {
  paid?: string[];
  minVolume?: string;
  maxVolume?: string;
  minPrix?: string;
  maxPrix?: string;
  minDate?: string;
  maxDate?: string;
}

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
const monthToNumber: Record<string, string> = {
  Jan: "01",
  Feb: "02",
  Mar: "03",
  Apr: "04",
  May: "05",
  Jun: "06",
  Jul: "07",
  Aug: "08",
  Sept: "09",
  Oct: "10",
  Nov: "11",
  Dec: "12",
};

const OrderFilterPanel: React.FC<FilterPanelProps> = ({
  onClose,
  onFilterChange,
}) => {
  const [searchParams] = useSearchParams();
  const { currency } = useCurrency();
  // Initialize state from URL params
  const [paymentStatus, setPaymentStatus] = useState<string[]>(
    searchParams.get("paid")?.split(",") || ["Processing", "Paid"]
  );
  const [volumeMin, setVolumeMin] = useState<string>(
    searchParams.get("minVolume") || ""
  );
  const [volumeMax, setVolumeMax] = useState<string>(
    searchParams.get("maxVolume") || ""
  );
  const [prixMin, setPrixMin] = useState<string>(
    searchParams.get("minPrix") || ""
  );
  const [prixMax, setPrixMax] = useState<string>(
    searchParams.get("maxPrix") || ""
  );

  // Parse date params if they exist
  const initializeDate = (
    paramName: string,
    defaultValue: { day: string; month: string; year: string }
  ) => {
    const dateParam = searchParams.get(paramName);
    if (dateParam) {
      try {
        const date = new Date(dateParam);
        return {
          day: String(date.getDate()).padStart(2, "0"),
          month: months[date.getMonth()],
          year: String(date.getFullYear()),
        };
      } catch (e) {
        return defaultValue;
      }
    }
    return defaultValue;
  };

  const [dateMin, setDateMin] = useState(
    initializeDate("minDate", { day: "01", month: "Sept", year: "2024" })
  );
  const [dateMax, setDateMax] = useState(
    initializeDate("maxDate", { day: "01", month: "Sept", year: "2024" })
  );

  const togglePaymentStatus = (status: string) => {
    if (paymentStatus.includes(status)) {
      setPaymentStatus(paymentStatus.filter((s) => s !== status));
    } else {
      setPaymentStatus([...paymentStatus, status]);
    }
  };

  // Memoize the onFilterChange function to prevent unnecessary re-renders
  const memoizedOnFilterChange = useCallback(onFilterChange, []);

  // Apply filters when any filter value changes
  useEffect(() => {
    const filters: FilterValues = {};

    if (paymentStatus.length > 0) {
      filters.paid = paymentStatus;
    }

    if (volumeMin) filters.minVolume = volumeMin;
    if (volumeMax) filters.maxVolume = volumeMax;
    if (prixMin) filters.minPrix = prixMin;
    if (prixMax) filters.maxPrix = prixMax;

    // Format dates for API
    if (dateMin.day && dateMin.month && dateMin.year) {
      const formattedMinDate = `${dateMin.year}-${
        monthToNumber[dateMin.month]
      }-${dateMin.day}`;
      filters.minDate = formattedMinDate;
    }

    if (dateMax.day && dateMax.month && dateMax.year) {
      const formattedMaxDate = `${dateMax.year}-${
        monthToNumber[dateMax.month]
      }-${dateMax.day}`;
      filters.maxDate = formattedMaxDate;
    }

    memoizedOnFilterChange(filters);
  }, [
    paymentStatus,
    volumeMin,
    volumeMax,
    prixMin,
    prixMax,
    dateMin,
    dateMax,
    memoizedOnFilterChange,
  ]);

  const resetFilters = () => {
    setPaymentStatus(["Processing", "Paid"]);
    setVolumeMin("");
    setVolumeMax("");
    setPrixMin("");
    setPrixMax("");
    setDateMin({ day: "01", month: "Sept", year: "2024" });
    setDateMax({ day: "01", month: "Sept", year: "2024" });
  };

  return (
    <div className="border border-[#4040BF]/30 rounded-lg p-4 w-full max-w-xs bg-white shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2 text-gray-700">
          <button onClick={resetFilters} className="hover:text-[#4040BF]">
            <RotateCcw size={18} />
          </button>
          <Filter size={18} />
          <span className="font-medium">Filter</span>
        </div>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={18} />
        </button>
      </div>

      <div className="space-y-4">
        {/* Payment Status */}
        <div>
          <p className="text-sm text-gray-500 mb-2 text-left">Payment Status</p>
          <div className="space-y-2">
            {["Unpaid", "Processing", "Paid"].map((status) => (
              <div
                key={status}
                className={`flex items-center p-2 rounded-md border cursor-pointer ${
                  paymentStatus.includes(status)
                    ? "bg-[#4040BF] text-white"
                    : "bg-white text-gray-700 border-gray-200"
                }`}
                onClick={() => togglePaymentStatus(status)}
              >
                <div
                  className={`w-5 h-5 flex items-center justify-center rounded border ${
                    paymentStatus.includes(status)
                      ? "border-white"
                      : "border-gray-300"
                  }`}
                >
                  {paymentStatus.includes(status) && (
                    <Check size={14} className="text-white" />
                  )}
                </div>
                <span className="ml-2">{status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Volume Range */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-sm text-gray-500 mb-2 text-left">Volume Min</p>
            <input
              type="text"
              value={volumeMin}
              onChange={(e) => setVolumeMin(e.target.value)}
              className="w-full p-2 border border-gray-200 rounded-md text-[#4040BF] focus:outline-none focus:ring-1 focus:ring-[#4040BF] bg-transparent"
            />
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-2 text-left">Volume Max</p>
            <input
              type="text"
              value={volumeMax}
              onChange={(e) => setVolumeMax(e.target.value)}
              className="w-full p-2 border border-gray-200 rounded-md text-[#4040BF] focus:outline-none focus:ring-1 focus:ring-[#4040BF] bg-transparent"
            />
          </div>
        </div>

        {/* Prix Range */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-sm text-gray-500 mb-2 text-left">Prix Min</p>
            <div className="relative">
              <input
                type="text"
                value={prixMin}
                onChange={(e) => setPrixMin(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-md text-[#4040BF] focus:outline-none focus:ring-1 focus:ring-[#4040BF] bg-transparent"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#4040BF]">
                {currency}
              </span>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-2 text-left">Prix Max</p>
            <div className="relative">
              <input
                type="text"
                value={prixMax}
                onChange={(e) => setPrixMax(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-md text-[#4040BF] focus:outline-none focus:ring-1 focus:ring-[#4040BF] bg-transparent"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#4040BF]">
                {currency}
              </span>
            </div>
          </div>
        </div>

        {/* Date Min */}
        <div>
          <p className="text-sm text-gray-500 mb-2 text-left">Date Min</p>
          <div className="grid grid-cols-3 gap-2">
            <div className="relative">
              <select
                value={dateMin.day}
                onChange={(e) =>
                  setDateMin({ ...dateMin, day: e.target.value })
                }
                className="w-full appearance-none p-2 border border-gray-200 rounded-md text-[#4040BF] focus:outline-none focus:ring-1 focus:ring-[#4040BF] bg-white"
              >
                {Array.from({ length: 31 }, (_, i) =>
                  String(i + 1).padStart(2, "0")
                ).map((day) => (
                  <option key={`min-day-${day}`} value={day}>
                    {day}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#4040BF]"
              />
            </div>
            <div className="relative">
              <select
                value={dateMin.month}
                onChange={(e) =>
                  setDateMin({ ...dateMin, month: e.target.value })
                }
                className="w-full appearance-none p-2 border border-gray-200 rounded-md text-[#4040BF] focus:outline-none focus:ring-1 focus:ring-[#4040BF] bg-white"
              >
                {months.map((month) => (
                  <option key={`min-month-${month}`} value={month}>
                    {month}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#4040BF]"
              />
            </div>
            <div className="relative">
              <select
                value={dateMin.year}
                onChange={(e) =>
                  setDateMin({ ...dateMin, year: e.target.value })
                }
                className="w-full appearance-none p-2 border border-gray-200 rounded-md text-[#4040BF] focus:outline-none focus:ring-1 focus:ring-[#4040BF] bg-white"
              >
                {Array.from({ length: 10 }, (_, i) => String(2020 + i)).map(
                  (year) => (
                    <option key={`min-year-${year}`} value={year}>
                      {year}
                    </option>
                  )
                )}
              </select>
              <ChevronDown
                size={16}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#4040BF]"
              />
            </div>
          </div>
        </div>

        {/* Date Max */}
        <div>
          <p className="text-sm text-gray-500 mb-2 text-left">Date Max</p>
          <div className="grid grid-cols-3 gap-2">
            <div className="relative">
              <select
                value={dateMax.day}
                onChange={(e) =>
                  setDateMax({ ...dateMax, day: e.target.value })
                }
                className="w-full appearance-none p-2 border border-gray-200 rounded-md text-[#4040BF] focus:outline-none focus:ring-1 focus:ring-[#4040BF] bg-white"
              >
                {Array.from({ length: 31 }, (_, i) =>
                  String(i + 1).padStart(2, "0")
                ).map((day) => (
                  <option key={`max-day-${day}`} value={day}>
                    {day}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#4040BF]"
              />
            </div>
            <div className="relative">
              <select
                value={dateMax.month}
                onChange={(e) =>
                  setDateMax({ ...dateMax, month: e.target.value })
                }
                className="w-full appearance-none p-2 border border-gray-200 rounded-md text-[#4040BF] focus:outline-none focus:ring-1 focus:ring-[#4040BF] bg-white"
              >
                {months.map((month) => (
                  <option key={`max-month-${month}`} value={month}>
                    {month}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#4040BF]"
              />
            </div>
            <div className="relative">
              <select
                value={dateMax.year}
                onChange={(e) =>
                  setDateMax({ ...dateMax, year: e.target.value })
                }
                className="w-full appearance-none p-2 border border-gray-200 rounded-md text-[#4040BF] focus:outline-none focus:ring-1 focus:ring-[#4040BF] bg-white"
              >
                {Array.from({ length: 10 }, (_, i) => String(2020 + i)).map(
                  (year) => (
                    <option key={`max-year-${year}`} value={year}>
                      {year}
                    </option>
                  )
                )}
              </select>
              <ChevronDown
                size={16}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#4040BF]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderFilterPanel;
