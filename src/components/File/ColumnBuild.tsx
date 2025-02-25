import { useState, memo, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { IoMdRadioButtonOn } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { LiaSearchSolid } from "react-icons/lia";
import { Column } from "../../types";
import api from "../../actions/api";
import NumberInput from "../Common/Inputs/NumberInput";
import DateInput from "../Common/Inputs/DateInput";
import dayjs from "dayjs";

interface ColumnBuildProps {
  selectedData: Record<string, any>;
  setColumns: (selectedValues: any) => void;
  column: Column;
  index: number;
  step: number;
  disabled?: boolean;
}

export default memo(function ColumnBuild({
  setColumns,
  column,
  index,
  step,
  disabled = false,
  selectedData,
}: ColumnBuildProps) {
  const [initialValues, setInitialValues] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [showAllCountries, setShowAllCountries] = useState<boolean>(false);
  const [search, setSearch] = useState("");
  const [rangeValues, setRangeValues] = useState({ min: "", max: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!column.tableColumns) {
          console.warn("No table columns available.");
          return;
        }

        let selectedDataForQuery = { ...selectedData };
        if (index > 0) {
          const previousColumn = Object.keys(selectedDataForQuery)[index - 1];
          if (previousColumn) {
            selectedDataForQuery = {
              [previousColumn]: selectedDataForQuery[previousColumn],
            };
          }
        }

        const allTableData = await Promise.all(
          column.tableColumns.map(async (col) => {
            const response = await api.post("/api/table/table-data", {
              id: col.tableId,
            });

            const data = response.data.data;

            if (step === 2 && index === 0) {
              return data.map((item: any) => item[col.tableColumn]);
            } else {
              const filteredData = data.filter((item: any) => {
                return Object.keys(selectedData).some((key) => {
                  const selectedValue = selectedData[key];
                  if (Array.isArray(selectedValue)) {
                    return selectedValue.some((value) => {
                      return Object.values(item).includes(value);
                    });
                  } else if (selectedValue) {
                    return Object.values(item).includes(selectedValue);
                  }
                  return false;
                });
              });

              return filteredData.map((item: any) => item[col.tableColumn]);
            }
          })
        );

        const uniqueValues = [...new Set(allTableData.flat())];
        setInitialValues(uniqueValues);
        setSearchResults(uniqueValues);
      } catch (error) {
        console.error("Error fetching table data:", error);
      }
    };

    fetchData();
  }, [column, index, step, selectedData]);

  useEffect(() => {
    if (search !== "") {
      const results = initialValues.filter((item) =>
        item.toLowerCase().includes(search.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults(initialValues);
    }
  }, [search, initialValues]);

  const handleClickSearchedItem = (item: string) => {
    if (
      !Object.keys(selectedData).includes(column.name) ||
      selectedData[column.name].length === 0
    ) {
      setColumns([item]);
    } else if (selectedData[column.name]?.includes(item)) {
      const newItems = selectedData[column.name]?.filter(
        (c: string) => c !== item
      );
      setColumns(newItems || []);
    } else {
      setColumns([...selectedData[column.name], item]);
    }
  };

  const handleRangeChange = (name: string, value: string) => {
    setRangeValues((prev) => ({ ...prev, [name]: value }));
  };

  const toggleShowAllCountries = () => {
    setShowAllCountries((prev) => !prev);
  };

  console.log("column", column);

  return (
    <div className="max-w-3xl bg-white border border-light-gray-1 rounded-lg flex flex-col text-dark">
      <div className="p-4 border-b border-dashed border-light-gray-1 text-left font-raleway font-bold">
        {column.name}
      </div>
      {column.type === "Number" || column.type === "ZIP Code" ? (
        <div className="flex items-center gap-4 p-6">
          <NumberInput
            label="From"
            value={parseInt(rangeValues.min)}
            disabled={disabled}
            isCurrency={false}
            onChange={(value) => handleRangeChange("min", value.toString())}
            error=""
          />
          <NumberInput
            label="To"
            value={parseInt(rangeValues.max)}
            disabled={disabled}
            isCurrency={false}
            onChange={(value) => handleRangeChange("max", value.toString())}
            error=""
          />
        </div>
      ) : column.type === "Date" ? (
        <div className="flex items-center gap-4 p-6">
          <DateInput
            label="From"
            value={rangeValues.min ? dayjs(rangeValues.min) : null} // Convert to Dayjs or null
            disabled={disabled}
            onChange={(value) =>
              handleRangeChange("min", value ? value.format("YYYY-MM-DD") : "")
            } // Convert back to string if needed
            error=""
          />
          <DateInput
            label="To"
            value={rangeValues.max ? dayjs(rangeValues.max) : null} // Convert to Dayjs or null
            disabled={disabled}
            onChange={(value) =>
              handleRangeChange("max", value ? value.format("YYYY-MM-DD") : "")
            } // Convert back to string if needed
            error=""
          />
        </div>
      ) : (
        <>
          <div className="p-4 border-b border-dashed border-light-gray-1 flex items-center justify-start gap-2">
            <div className="flex items-center gap-4 p-2 border border-light-gray-3 rounded-lg">
              <LiaSearchSolid />
              <input
                type="text"
                placeholder={`Search ${column.name}s`}
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
              )}
            </button>
          </div>

          <div className="max-h-48 overflow-y-auto flex flex-wrap gap-2 p-6 border-b border-dashed border-light-gray-1">
            {searchResults.map((item) => (
              <button
                key={item}
                onClick={() => handleClickSearchedItem(item)}
                disabled={disabled}
                className={`flex items-center gap-2 px-2 py-1 rounded-full border border-light-gray-3 cursor-pointer hover:bg-light-gray-1 ${
                  selectedData[column.name]?.includes(item)
                    ? "bg-light-gray-1"
                    : ""
                }`}
              >
                <IoMdRadioButtonOn
                  className={`${
                    selectedData[column.name]?.includes(item)
                      ? "text-dark-blue"
                      : "text-light-gray-3"
                  }`}
                />
                {item}
              </button>
            ))}
          </div>

          <div className="p-4 flex flex-col justify-start gap-2">
            <span className="font-bold text-left">Selected Results:</span>
            <div className="flex flex-wrap gap-2">
              {selectedData[column.name]?.map((item: string) => (
                <div
                  key={item}
                  className="flex items-center gap-2 px-2 py-1 rounded-full border border-light-gray-3 bg-light-gray-1"
                >
                  <IoMdRadioButtonOn className="text-dark-blue" />
                  <span className="text-dark-blue">{item}</span>
                  <button
                    onClick={() => handleClickSearchedItem(item)}
                    className="w-4 h-4 text-red border border-light-gray-3 rounded-full p-1 box-content"
                    disabled={disabled}
                  >
                    <IoClose />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
});
