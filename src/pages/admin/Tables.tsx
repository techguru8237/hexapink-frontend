import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { CiFilter } from "react-icons/ci";
import { PiTableLight } from "react-icons/pi";

import api from "../../actions/api";

import { TableListItem } from "../../components/Table/TableListItem";
import NewTableSkeleton from "../../components/Table/NewTableSkeleton";
import TableListHeader from "../../components/Table/TableListHeader";
import CreateTable from "../../components/Table/CreateTable";
import FilterPanel from "../../components/Table/FilterPanel";
import AdminHeader from "../../components/Dashboard/AdminHeader";
import Pagination from "../../components/Pagination";

import { TableItem } from "../../types";

export default function Tables() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [tables, setTables] = useState<TableItem[]>([]);
  const [selectedTables, setSelectedTables] = useState<string[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isFilterPanelVisible, setIsFilterPanelVisible] = useState(false);
  const [isNewTablePanelVisible, setIsNewTablePanelVisible] = useState(false);

  const handleAddTableClick = () => {
    setIsNewTablePanelVisible(!isNewTablePanelVisible);
  };

  const itemsPerPage = 5;
  const currentPage = parseInt(searchParams.get("page") || "1");

  useEffect(() => {
    const fetchTables = async () => {
      // Construct the query string from all search params
      const queryParams = new URLSearchParams(searchParams);

      try {
        const response = await api.get(
          `/api/table?${queryParams.toString()}&limit=${itemsPerPage}`
        );

        setTables(response.data.tables);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching tables:", error);
      }
    };

    fetchTables();
  }, [searchParams]); // Now depends on searchParams instead of just page

  const handlePageChange = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", page.toString());
    navigate(`/admin/tables?${newSearchParams.toString()}`);
  };

  const handleCheckboxChange = (id: string) => {
    setSelectedTables((prevSelectedTables) =>
      prevSelectedTables.includes(id)
        ? prevSelectedTables.filter((tableId) => tableId !== id)
        : [...prevSelectedTables, id]
    );
  };

  const handleClickFilter = () => {
    setIsFilterPanelVisible(!isFilterPanelVisible);
  };

  // Calculate active filters count
  const getActiveFiltersCount = () => {
    const filterParams = [
      "minColumns",
      "maxColumns",
      "minLeads",
      "maxLeads",
      "startDate",
      "endDate",
    ];
    return filterParams.filter((param) => searchParams.has(param)).length;
  };

  return (
    <div>
      <AdminHeader icon={<PiTableLight />} label="Tables" />

      <div className="bg-light-gray border-b border-light-gray1 flex flex-row">
        <div className="flex flex-col flex-1 border-r border-light-gray1">
          <div className="px-8 py-4 border-b border-light-gray1 flex items-center justify-between text-light-dark">
            {selectedTables.length > 0 && (
              <span>{selectedTables.length} Selected</span>
            )}
            <div className="ml-auto flex items-center divide-x">
              <div className="pr-4 flex items-center gap-2">
                {getActiveFiltersCount() > 0 && (
                  <span>{getActiveFiltersCount()} Active Filters</span>
                )}
                <button
                  onClick={handleClickFilter}
                  className={`flex items-center border rounded-md px-2 py-1 text-dark cursor-pointer ${
                    getActiveFiltersCount() > 0
                      ? "border-dark-blue text-dark-blue"
                      : "border-light-gray3"
                  }`}
                >
                  <CiFilter />
                  <span>Filter</span>
                </button>
              </div>
              <div className="pl-4">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>

          {/* Skeleton */}
          <NewTableSkeleton onAddTableClick={handleAddTableClick} />

          {/* Main Table */}
          <div className="p-8 flex flex-col gap-4">
            <TableListHeader />

            {tables.map((item: TableItem) => (
              <TableListItem
                key={item._id}
                data={item}
                index={item._id}
                isSelected={selectedTables.includes(item._id)}
                onCheckboxChange={handleCheckboxChange}
              />
            ))}
          </div>
        </div>

        {isNewTablePanelVisible && (
          <div className="h-screen w-96 px-4 py-4 border-l-2 border-light-gray1 flex justify-center">
            <CreateTable />
          </div>
        )}

        {isFilterPanelVisible && (
          <div className="h-screen w-96 px-4 py-4 border-l-2 border-light-gray1 flex justify-center">
            <FilterPanel onClose={handleClickFilter} />
          </div>
        )}
      </div>
    </div>
  );
}
