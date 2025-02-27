import { useState, useEffect } from "react";

import { PiFileTextBold } from "react-icons/pi";
import { CiFilter } from "react-icons/ci";
import Pagination from "../../../components/Common/Pagination";
import NewFileSkeleton from "../../../components/User/File/NewFileSkeleton";
import FileListHeader from "../../../components/User/File/FileListHeader";
import { FileListItem } from "../../../components/User/File/FileListItem";
import UserHeader from "../../../components/User/UserHeader";

const dummyData = Array.from({ length: 25 }, (_, index) => ({
  id: index,
  name: `file_${index + 1}`,
  date: "11 Nov 2024",
  status: "Ready",
  order: `ord_${index + 124}`,
}));

export default function Files() {
  const [selectedFiles, setSelectedFiles] = useState<number[]>([]);
  const [filteredFiles, setFilteredFiles] = useState<
    { id: number; name: string; date: string; status: string; order: string }[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterPanelVisible, setIsFilterPanelVisible] = useState(false);
  const itemsPerPage = 5; // Number of items per page
  const totalPages = Math.ceil(dummyData.length / itemsPerPage);

  useEffect(() => {
    setFilteredFiles(dummyData);
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCheckboxChange = (index: number) => {
    setSelectedFiles((prevSelectedFiles) =>
      prevSelectedFiles.includes(index)
        ? prevSelectedFiles.filter((fileIndex) => fileIndex !== index)
        : [...prevSelectedFiles, index]
    );
  };

  const handleClickFilter = () => {
    setIsFilterPanelVisible(!isFilterPanelVisible);
  };

  // Calculate the start and end indices for slicing the filteredFiles array
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFiles = filteredFiles.slice(startIndex, endIndex);

  return (
    <div className="h-full flex flex-col">
      <UserHeader icon={<PiFileTextBold />} label="Files" />

      <div className="h-full bg-light-gray border-b border-light-gray-1 flex">
        <div className="flex flex-col flex-1 border-r border-light-gray-1">
          <div className="px-8 py-4 border-b border-light-gray-1 flex items-center justify-between text-light-dark">
            {selectedFiles.length > 0 && (
              <span>{selectedFiles.length} Selected</span>
            )}
            <div className="ml-auto flex items-center divide-x">
              <div className="pr-4 flex items-center gap-2">
                {filteredFiles.length > 0 && (
                  <span>{filteredFiles.length} Results</span>
                )}
                <button
                  onClick={handleClickFilter}
                  className="flex items-center border rounded-md px-2 py-1 text-dark cursor-pointer"
                >
                  <CiFilter />
                  <span>Filter</span>
                </button>
              </div>
              <div className="pl-4">
                <Pagination
                  onPageSizeChange={() => {}}
                  rowsPerPage={itemsPerPage}
                  pageSizeOptions={[5, 10, 20, 50]}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>

          <NewFileSkeleton />

          <div className="p-8 flex flex-col gap-4">
            <FileListHeader />
            {currentFiles.map((item) => (
              <FileListItem
                key={item.id}
                index={item.id}
                isSelected={selectedFiles.includes(item.id)}
                onCheckboxChange={handleCheckboxChange}
              />
            ))}
          </div>
        </div>
        {/* {isFilterPanelVisible && (
          <div className="p-6">
            <FilterPanel
              onClose={handleClickFilter}
              items={dummyData}
              setFilteredItems={setFilteredFiles}
            />
          </div>
        )} */}
      </div>
    </div>
  );
}
