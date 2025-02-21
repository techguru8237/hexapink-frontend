import React, { useEffect, useState } from "react";
import { PreviewModalProps } from "../../types";
import { IoCloseCircleOutline } from "react-icons/io5";
import Pagination from "./Pagination";

const PreviewModal: React.FC<PreviewModalProps> = ({
  data,
  onRequestClose,
}) => {
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  useEffect(() => {
    setTotalPages(Math.ceil(filteredData.length / rowsPerPage));
  }, [filteredData, rowsPerPage]);

  const columns = data[0] ? Object.keys(data[0]).map((key) => key) : [];

  return (
    <div className="fixed inset-0 flex flex-col gap-4 bg-light-gray border border-dark-blue shadow-[0px_0px_0px_4px_#ececf8] max-w-7xl my-32 mx-auto p-8 rounded-lg overflow-x-auto z-10">
      <div className="flex justify-between">
        <h2 className="pb-4 text-xl font-bold font-kanit flex items-center gap-2">
          File Data Preview (Columns: {columns.length}, Rows: {data.length})
        </h2>
        <IoCloseCircleOutline
          onClick={onRequestClose}
          className="text-2xl cursor-pointer"
        />
      </div>
      <div className="flex items-center justify-between">
        <input
          value={search}
          placeholder="Search by any field"
          onChange={handleSearchChange}
          className="bg-white p-1 border border-gray-300 rounded-lg"
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          rowsPerPage={rowsPerPage}
          pageSizeOptions={[25, 100, 500, 1000]}
          onPageChange={(value) => setCurrentPage(value)}
          onPageSizeChange={(value) => setRowsPerPage(value)}
        />
      </div>

      <div className="w-full flex flex-col gap-4 font-raleway">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border border-gray-300 rounded-lg">
              {columns.map((col, index) => (
                <th
                  className={`h-full bg-white px-2 py-1 text-center font-bold ${
                    index == 0 ? "rounded-l-lg" : ""
                  } ${
                    index < columns.length - 1
                      ? "border-r border-dashed border-gray-300"
                      : "rounded-r-lg"
                  }`}
                  key={col}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.slice(startIndex, endIndex).map((row, index) => (
              <tr
                className="border border-gray-300 rounded-lg"
                key={index}
              >
                {columns.map((col, colIndex) => (
                  <td
                    className={`h-full bg-white px-2 py-1 text-left ${
                      colIndex == 0 ? "rounded-l-lg" : ""
                    } ${
                      colIndex < columns.length - 1
                        ? "border-r border-dashed border-gray-300"
                        : "rounded-r-lg"
                    }`}
                    key={col}
                  >
                    <span className="text-sm line-clamp-1">{row[col]}</span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        pageSizeOptions={[25, 100, 500, 1000]}
        onPageChange={(value) => setCurrentPage(value)}
        onPageSizeChange={(value) => setRowsPerPage(value)}
      />
    </div>
  );
};

export default PreviewModal;