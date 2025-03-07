import { useState, memo, useEffect, useCallback } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { IoMdRadioButtonOn } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { LiaSearchSolid } from "react-icons/lia";
import { Column } from "../../../types";
import NumberInput from "../../Common/Inputs/NumberInput";
import DateInput from "../../Common/Inputs/DateInput";
import dayjs from "dayjs";
import useFileDataStore from "../../../Store/userFileDataStore";

interface ColumnBuildProps {
  selectedData: Record<string, { value: any; stepName: string }>;
  column: Column;
  index: number;
  step: number;
  disabled?: boolean;
  setColumns: (columnName: string, selectedValues: any) => void;
  setVolume: (volume: number) => void;
}

export default memo(function ColumnBuild({
  column,
  index,
  step,
  disabled = false,
  selectedData,
  setColumns,
  setVolume,
}: ColumnBuildProps) {
  const { fileData } = useFileDataStore((state) => state);

  const [initialValues, setInitialValues] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [showAllCountries, setShowAllCountries] = useState<boolean>(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!column.tableColumns) {
          console.warn("No table columns available.");
          return;
        }

        let totalVolume = 0;

        const allTableData = await Promise.all(
          column.tableColumns.map(async (col) => {
            const data = fileData.find((file) => file.id === col.tableId)?.data;

            const filteredData = data.filter((item: any) => {
              return Object.keys(selectedData)
                .filter((selectedDataKey) => selectedDataKey !== column.name)
                .every((key) => {
                  const selectedValue = selectedData[key].value;
                  if (Array.isArray(selectedValue)) {
                    if (selectedValue.length === 0) return true;
                    return selectedValue.some((value) => {
                      return Object.values(item).includes(value);
                    });
                  } else if (
                    typeof selectedValue === "object" &&
                    selectedValue !== null
                  ) {
                    if (selectedValue.min !== undefined) {
                      return parseInt(item[col.tableColumn]) >= parseInt(selectedValue.min);
                    } else if (selectedValue.max !== undefined) {
                      return parseInt(item[col.tableColumn]) <= parseInt(selectedValue.max);
                    } else if (
                      selectedValue.min !== undefined &&
                      selectedValue.max !== undefined
                    ) {
                      return (
                        parseInt(item[col.tableColumn]) >= parseInt(selectedValue.min) &&
                        parseInt(item[col.tableColumn]) <= parseInt(selectedValue.max)
                      );
                    } else {
                      return true;
                    }
                  }
                  return Object.values(item).includes(selectedValue);
                });
            });
            totalVolume += filteredData.length;
            return filteredData.map((item: any) => item[col.tableColumn]);
          })
        );

        const uniqueValues = [...new Set(allTableData.flat())];
        setInitialValues(uniqueValues);
        setSearchResults(uniqueValues);
        setVolume(totalVolume);
      } catch (error) {
        console.error("Error fetching table data:", error);
      }
    };

    fetchData();
  }, [column, index, step, selectedData, fileData, setVolume]);

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

  const handleClickSearchedItem = useCallback(
    (item: string) => {
      if (
        !Object.keys(selectedData).includes(column.name) ||
        !selectedData[column.name].value ||
        (Array.isArray(selectedData[column.name].value) &&
          selectedData[column.name].value.length === 0)
      ) {
        handleParentChange(column.name, [item]);
      } else if (
        Array.isArray(selectedData[column.name].value) &&
        selectedData[column.name]?.value?.includes(item)
      ) {
        const newItems = selectedData[column.name]?.value?.filter(
          (c: string) => c !== item
        );
        handleParentChange(column.name, newItems || []);
      } else {
        handleParentChange(column.name, [
          ...(Array.isArray(selectedData[column.name].value)
            ? selectedData[column.name].value
            : []),
          item,
        ]);
      }
    },
    [selectedData, column.name]
  );

  const handleParentChange = useCallback(
    (columnName: string, selectedValue: any) => {
      setColumns(columnName, selectedValue);
    },
    [setColumns]
  );

  const handleRangeChange = useCallback(
    (name: string, value: string) => {
      const updatedValue = {
        ...selectedData[column.name]?.value,
        [name]: value,
      };
      handleParentChange(column.name, updatedValue);

      // Recalculate volume based on the updated range
      const filteredData = initialValues.filter((item) => {
        const itemValue = parseInt(item);
        const min = parseInt(updatedValue.min);
        const max = parseInt(updatedValue.max);
        return itemValue >= min && itemValue <= max;
      });
      setVolume(filteredData.length);
    },
    [column.name, selectedData, initialValues, handleParentChange, setVolume]
  );

  const toggleShowAllCountries = useCallback(() => {
    setShowAllCountries((prev) => !prev);
  }, []);

  return (
    <div className="max-w-3xl bg-white border border-light-gray-1 rounded-lg flex flex-col text-dark">
      <div className="p-4 border-b border-dashed border-light-gray-1 text-left font-raleway font-bold">
        {column.name}
      </div>
      {column.type === "Number" || column.type === "ZIP Code" ? (
        <div className="flex items-center gap-4 p-6">
          <NumberInput
            label="From"
            value={
              selectedData[column.name]?.value?.min
                ? parseInt(selectedData[column.name].value.min)
                : 0
            }
            disabled={disabled}
            isCurrency={false}
            onChange={(value) => handleRangeChange("min", value.toString())}
            error=""
          />
          <NumberInput
            label="To"
            value={
              selectedData[column.name]?.value?.max
                ? parseInt(selectedData[column.name].value.max)
                : 0
            }
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
            value={
              selectedData[column.name]?.value?.min
                ? dayjs(selectedData[column.name].value.min)
                : null
            }
            disabled={disabled}
            onChange={(value) =>
              handleRangeChange("min", value ? value.format("YYYY/MM/DD") : "")
            }
            error=""
          />
          <DateInput
            label="To"
            value={
              selectedData[column.name]?.value?.max
                ? dayjs(selectedData[column.name].value.max)
                : null
            }
            disabled={disabled}
            onChange={(value) =>
              handleRangeChange("max", value ? value.format("YYYY/MM/DD") : "")
            }
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
                  selectedData[column.name]?.value.length > 0 &&
                  selectedData[column.name]?.value?.includes(item)
                    ? "bg-light-gray-1"
                    : ""
                }`}
              >
                <IoMdRadioButtonOn
                  className={`${
                    selectedData[column.name]?.value.length > 0 &&
                    selectedData[column.name]?.value?.includes(item)
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
              {selectedData[column.name]?.value.length > 0 &&
                selectedData[column.name]?.value?.map((item: string) => (
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
