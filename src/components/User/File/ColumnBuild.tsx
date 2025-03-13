import { useState, memo, useEffect, useCallback } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { IoMdRadioButtonOn } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { LiaSearchSolid } from "react-icons/lia";
import { Column } from "../../../types";
import NumberInput from "../../Common/Inputs/NumberInput";
import DateInput from "../../Common/Inputs/DateInput";
import dayjs from "dayjs";
import useFileDataStore from "../../../Store/useFileDataStore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

interface ColumnBuildProps {
  selectedData: Record<string, { value: any; type: string }>;
  columns: Column[];
  column: Column;
  index: number;
  step: number;
  disabled?: boolean;
  setColumns: (
    columnType: string,
    columnName: string,
    selectedValues: any
  ) => void;
  setVolume: (volume: number) => void;
  setFilteredData: (filteredData: any) => void;
}

export default memo(function ColumnBuild({
  column,
  columns,
  index,
  step,
  disabled = false,
  selectedData,
  setColumns,
  setVolume,
  setFilteredData,
}: ColumnBuildProps) {
  const { fileData } = useFileDataStore((state) => state);

  console.log("fileData", fileData);

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

        const allTableData = await Promise.all(
          column.tableColumns.map(async (col) => {
            const data = fileData.find((file) => file.id === col.tableId)?.data;

            const filteredData = data.filter((item: any) => {
              return Object.keys(selectedData)
                .filter((selectedDataKey) => selectedDataKey !== column.name)
                .every((key) => {
                  const tableColumnNames = columns
                    .find((col) => col.name === key)
                    ?.tableColumns?.flatMap((tc) => tc.tableColumn);
                  const ItemKeys = Object.keys(item);
                  const correctTableColumName = tableColumnNames?.find((tcn) =>
                    ItemKeys.includes(tcn)
                  );
                  const selectedValue = selectedData[key].value;
                  if (correctTableColumName) {
                    if (Array.isArray(selectedValue)) {
                      if (selectedValue.length === 0) return true;
                      return selectedValue.some((value) => {
                        return Object.values(item).includes(value);
                      });
                    } else {
                      if (
                        selectedValue.min !== undefined &&
                        selectedValue.max !== undefined
                      ) {
                        if (selectedData[key].type === "Date") {
                          const itemDate = dayjs(item[correctTableColumName]);
                          const minDate = selectedValue.min
                            ? dayjs(selectedValue.min)
                            : null;
                          const maxDate = selectedValue.max
                            ? dayjs(selectedValue.max)
                            : null;
                          if (minDate && maxDate) {
                            return (
                              itemDate.isSameOrAfter(minDate) &&
                              itemDate.isSameOrBefore(maxDate)
                            );
                          } else if (minDate) {
                            return itemDate.isSameOrAfter(minDate);
                          } else if (maxDate) {
                            return itemDate.isSameOrBefore(maxDate);
                          }
                        } else {
                          const itemValue = parseInt(
                            item[correctTableColumName]
                          );
                          const minValue = selectedValue.min
                            ? parseInt(selectedValue.min)
                            : null;
                          const maxValue = selectedValue.max
                            ? parseInt(selectedValue.max)
                            : null;

                          if (minValue !== null && maxValue !== null) {
                            return (
                              itemValue >= minValue && itemValue <= maxValue
                            );
                          } else if (minValue !== null) {
                            return itemValue >= minValue;
                          } else if (maxValue !== null) {
                            return itemValue <= maxValue;
                          }
                        }
                      }
                      return true;
                    }
                  }
                });
            });
            return filteredData.map((item: any) => item[col.tableColumn]);
          })
        );
        const uniqueValues = [...new Set(allTableData.flat())];
        setInitialValues(uniqueValues);
        setSearchResults(uniqueValues);

        let totalVolume = 0;
        let allFilteredData: any[] = [];
        await Promise.all(
          column.tableColumns.map(async (col) => {
            const data = fileData.find((file) => file.id === col.tableId)?.data;

            const filteredData = data.filter((item: any) => {
              return Object.keys(selectedData).every((key) => {
                const tableColumnNames = columns
                  .find((col) => col.name === key)
                  ?.tableColumns?.flatMap((tc) => tc.tableColumn);
                const ItemKeys = Object.keys(item);
                const correctTableColumName = tableColumnNames?.find((tcn) =>
                  ItemKeys.includes(tcn)
                );
                const selectedValue = selectedData[key].value;
                if (correctTableColumName) {
                  if (Array.isArray(selectedValue)) {
                    if (selectedValue.length === 0) return true;
                    return selectedValue.some((value) => {
                      return Object.values(item).includes(value);
                    });
                  } else {
                    if (
                      selectedValue.min !== undefined &&
                      selectedValue.max !== undefined
                    ) {
                      if (selectedData[key].type === "Date") {
                        const itemDate = dayjs(item[correctTableColumName]);
                        const minDate = selectedValue.min
                          ? dayjs(selectedValue.min)
                          : null;
                        const maxDate = selectedValue.max
                          ? dayjs(selectedValue.max)
                          : null;
                        if (minDate && maxDate) {
                          return (
                            itemDate.isSameOrAfter(minDate) &&
                            itemDate.isSameOrBefore(maxDate)
                          );
                        } else if (minDate) {
                          return itemDate.isSameOrAfter(minDate);
                        } else if (maxDate) {
                          return itemDate.isSameOrBefore(maxDate);
                        }
                      } else {
                        const itemValue = parseInt(item[correctTableColumName]);
                        const minValue = selectedValue.min
                          ? parseInt(selectedValue.min)
                          : null;
                        const maxValue = selectedValue.max
                          ? parseInt(selectedValue.max)
                          : null;

                        if (minValue !== null && maxValue !== null) {
                          return itemValue >= minValue && itemValue <= maxValue;
                        } else if (minValue !== null) {
                          return itemValue >= minValue;
                        } else if (maxValue !== null) {
                          return itemValue <= maxValue;
                        }
                      }
                    }
                    return true;
                  }
                }
              });
            });
            totalVolume += filteredData.length;
            allFilteredData.push(...filteredData);
            return filteredData.map((item: any) => item[col.tableColumn]);
          })
        );
        setFilteredData(allFilteredData);
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
        setColumns(column.type, column.name, [item]);
      } else if (
        Array.isArray(selectedData[column.name].value) &&
        selectedData[column.name]?.value?.includes(item)
      ) {
        const newItems = selectedData[column.name]?.value?.filter(
          (c: string) => c !== item
        );
        setColumns(column.type, column.name, newItems || []);
      } else {
        setColumns(column.type, column.name, [
          ...(Array.isArray(selectedData[column.name].value)
            ? selectedData[column.name].value
            : []),
          item,
        ]);
      }
    },
    [selectedData, column.name]
  );

  const handleRangeChange = useCallback(
    (name: string, value: number | string) => {
      const updatedValue = {
        ...selectedData[column.name]?.value,
        [name]: value,
      };

      if (
        (updatedValue.min === "" && updatedValue.max === "") ||
        (updatedValue.min === 0 && updatedValue.max === 0)
      ) {
        const { [column.name]: _, ...rest } = selectedData;
        setColumns(column.type, column.name, rest);
      } else {
        setColumns(column.type, column.name, updatedValue);
      }
    },
    [column.name, selectedData, initialValues, setColumns]
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
            onChange={(value) => handleRangeChange("min", value)}
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
            onChange={(value) => handleRangeChange("max", value)}
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
