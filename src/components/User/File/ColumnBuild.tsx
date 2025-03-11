import { useState, memo, useEffect, useCallback, useMemo } from "react";
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
  selectedData: Record<string, { value: any; stepName: string }>;
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
  const [search, setSearch] = useState("");

  const filterData = useCallback(
    (data: any[], selectedData: Record<string, { value: any }>, columnName: string) => {
      return data.filter((item) => {
        return Object.keys(selectedData)
          .filter((key) => key !== columnName)
          .every((key) => {
            const selectedValue = selectedData[key].value;
            if (Array.isArray(selectedValue)) {
              if (selectedValue.length === 0) return true;
              return selectedValue.some((value) => Object.values(item).includes(value));
            } else if (typeof selectedValue === "object") {
              if (selectedValue.min !== undefined && selectedValue.max !== undefined) {
                if (selectedValue.type === "Date") {
                  return (
                    dayjs(item[key]).isSameOrAfter(dayjs(selectedValue.min)) &&
                    dayjs(item[key]).isSameOrBefore(dayjs(selectedValue.max))
                  );
                } else {
                  return (
                    parseInt(item[key]) >= parseInt(selectedValue.min) &&
                    parseInt(item[key]) <= parseInt(selectedValue.max)
                  );
                }
              }
              return true;
            }
          });
      });
    },
    []
  );

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
            const filteredData = filterData(data, selectedData, column.name);
            return filteredData.map((item: any) => item[col.tableColumn]);
          })
        );
        const uniqueValues = [...new Set(allTableData.flat())];
        setInitialValues(uniqueValues);

        let totalVolume = 0;
        let allFilteredData: any[] = [];
        await Promise.all(
          column.tableColumns.map(async (col) => {
            const data = fileData.find((file) => file.id === col.tableId)?.data;
            const filteredData = filterData(data, selectedData, column.name);
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
  }, [column, index, step, selectedData, fileData, setVolume, filterData]);

  const searchResults = useMemo(() => {
    if (search !== "") {
      return initialValues.filter((item) =>
        item.toLowerCase().includes(search.toLowerCase())
      );
    }
    return initialValues;
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
      setColumns(column.type, column.name, updatedValue);
    },
    [column.name, selectedData, initialValues, setColumns]
  );

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
