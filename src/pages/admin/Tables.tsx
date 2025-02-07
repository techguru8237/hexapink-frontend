import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { CiFilter } from "react-icons/ci";
import { PiTableLight } from "react-icons/pi";

import api from "../../actions/api";

import { TableListItem } from "../../components/Table/TableListItem";
import NewTableSkeleton from "../../components/Table/NewTableSkeleton";
import TableListHeader from "../../components/Table/TableListHeader";
import TableSideBar from "../../components/Table/CreateTable";
import AdminHeader from "../../components/Dashboard/AdminHeader";
import Pagination from "../../components/Pagination";

import { TableItem } from "../../types";

export default function Tables() {
  const navigate = useNavigate()
  const { page } = useParams(); // Get the page parameter from the URL

  const [tables, setTables] = useState([]);
  const [selectedTables, setSelectedTables] = useState<string[]>([]);
  const [filteredTables, setFilteredTables] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const [isFilterPanelVisible, setIsFilterPanelVisible] = useState(false);
  const [isNewTablePanelVisible, setIsNewTablePanelVisible] = useState(false);

  const handleAddTableClick = () => {
    setIsNewTablePanelVisible(!isNewTablePanelVisible);
  };
  const itemsPerPage = 5; // Number of items per page

  useEffect(() => {
    const fetchTables = async () => {
      const response = await api.get(
        `/api/table?page=${page}&limit=${itemsPerPage}`
      );

      setTables(response.data.tables);
      setTotalPages(response.data.totalPages);
    };

    fetchTables();
  }, [page]);

  const handlePageChange = (page: number) => {
    navigate(`/admin/tables/${page}`); // Update the URL with the new page
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
                {filteredTables.length > 0 && (
                  <span>{filteredTables.length} Results</span>
                )}
                <button
                  onClick={handleClickFilter}
                  className="flex items-center border border-light-gray3 rounded-md px-2 py-1 text-dark cursor-pointer"
                >
                  <CiFilter />
                  <span>Filter</span>
                </button>
              </div>
              <div className="pl-4">
                <Pagination
                  currentPage={page ? parseInt(page) : 1}
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
            <TableSideBar />
          </div>
        )}

        {/* {isFilterPanelVisible && (
          <div className="p-6">
            <FilterPanel
              onClose={handleClickFilter}
              items={dummyData}
              setFilteredItems={setFilteredTables}
            />
          </div>
        )} */}
      </div>
    </div>
  );
}
