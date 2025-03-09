import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  PiDatabaseLight,
  PiDownloadSimpleLight,
  PiSquareSplitHorizontalThin,
  PiSquareSplitVerticalThin,
} from "react-icons/pi";
import { GoArrowUpRight } from "react-icons/go";
import { GiPositionMarker } from "react-icons/gi";

import { File } from "../../../types";
import api from "../../../actions/api";
import LoadingElement from "../../../components/Common/LoadingElement";

const filterOptions = ["All", "Ready", "Waiting"];

export default function RecentFiles() {
  const [currentFilter, setCurrentFilter] = useState<string>("All");
  const [loading, setLoading] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await api.get(
          `/api/file/recent?status=${currentFilter}`
        );

        setFiles(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentFilter]);

  return (
    <div className="w-full flex flex-col gap-4 p-8 text-dark border-b-2 border-light-gray-1">
      <div className="w-full flex items-center">
        <div className="flex items-center gap-2 text-xl">
          <PiDatabaseLight />
          Recent Files
        </div>
        <Link
          to="/user/files"
          className="flex items-center gap-1 ml-2 underline text-xs"
        >
          See All <GoArrowUpRight />
        </Link>

        {/* Filter */}
        <div className="flex items-center gap-2 ml-auto bg-light-gray-2 border border-light-gray-3 rounded-lg p-1">
          {filterOptions.map((item, index) => (
            <button
              key={index}
              onClick={() => setCurrentFilter(item)}
              className={`px-2 py-0.5 bg-transparent outline-light-gray-3 focus:outline-light-gray-3 ${
                item === currentFilter
                  ? "bg-white border border-light-gray-3 rounded-md"
                  : ""
              } text-sm`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white text-dark">
          <thead>
            <tr className="text-left text-xs font-semibold tracking-wider">
              <th className="px-4 py-3">
                <PiDatabaseLight className="inline-block text-xl mr-1" />#
              </th>
              <th className="px-4 py-3">Collection</th>
              <th className="px-4 py-3">Volume</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Download</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-light-gray-1">
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  <div className="flex justify-center">
                    <LoadingElement width="24" color="#4040BF" />
                  </div>
                </td>
              </tr>
            ) : files.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-3 text-center text-gray-500">
                  No files available.
                </td>
              </tr>
            ) : (
              files.map((file, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <PiDatabaseLight className="inline-block mr-1 text-xl" />
                    file_{file._id?.slice(-5)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="w-full flex items-center gap-2">
                      <div className="w-12 h-12 flex items-center justify-center rounded-lg">
                        <img src={file.image} alt="file image" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold">Insurance Companies</span>
                        <div className="flex items-center gap-2 text-light-dark">
                          <div className="flex items-center">
                            <PiDatabaseLight className="text-md" />
                            <span>{file.type}</span>
                          </div>
                          <div className="flex items-center">
                            <GiPositionMarker className="text-md" />
                            <span>Belgique</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="w-full flex items-center gap-2 flex-wrap 2xl:divide-x">
                      <div className="flex items-center 2xl:pr-2">
                        <PiSquareSplitHorizontalThin className="text-2xl" />
                        <span>{file.columns && Object.keys(file.columns).length || 0}</span>
                      </div>
                      <div className="flex items-center 2xl:pl-2">
                        <PiSquareSplitVerticalThin className="text-2xl" />
                        <span>{file.volume}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">{file.createdAt?.split("T")[0]}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`border px-2 py-1 rounded-md text-xs ${
                        file.status === "Ready"
                          ? "bg-light-green-2 border-light-green-1 text-green"
                          : "bg-[#FAFAFA] border-[#E6E6E6] text-dark"
                      }`}
                    >
                      {file.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div
                      className={`w-full flex justify-center items-center flex-wrap gap-2 text-sm ${
                        file.status === "Ready"
                          ? "text-dark-blue"
                          : "text-light-gray-3"
                      }`}
                    >
                      <button
                        disabled={file.status !== "Ready"}
                        className={`px-4 py-1 rounded-full border ${
                          file.status === "Ready"
                            ? "border-dark-blue"
                            : "border-light-gray-3"
                        } flex items-center gap-2`}
                      >
                        <PiDownloadSimpleLight />
                        <span>CSV</span>
                      </button>
                      <button
                        disabled={file.status !== "Ready"}
                        className={`px-4 py-1 rounded-full border ${
                          file.status === "Ready"
                            ? "border-dark-blue"
                            : "border-light-gray-3"
                        } flex items-center gap-2`}
                      >
                        <PiDownloadSimpleLight />
                        <span>XLS</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
