import { useState, useEffect } from "react";

import { FaRegFolderOpen } from "react-icons/fa";
import { CiFilter } from "react-icons/ci";
import AdminHeader from "../../../components/Dashboard/AdminHeader";
import Pagination from "../../../components/Pagination";
import NewCollectionSkeleton from "../../../components/Collection/NewCollectionSkeleton";
import CollectionListHeader from "../../../components/Collection/CollectionListHeader";
import { CollectionListItem } from "../../../components/Collection/CollectionListItem";
import LoadingElement from "../../../components/Common/LoadingElement";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../../../actions/api";
import { Collection } from "../../../types";
import useAuth from "../../../hooks/useAuth";

export default function Collections() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isFilterPanelVisible, setIsFilterPanelVisible] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const currentPage = parseInt(searchParams.get("page") || "1");

  const fetchCollections = async () => {
    const queryParams = new URLSearchParams(searchParams);
    try {
      setLoading(true);
      const response = await api.get(
        `/api/collection?${queryParams.toString()}&limit=${rowsPerPage}`
      );
      setCollections(response.data.collections);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error: any) {
      if (error.response.status === 401) {
        logout()
      }
      console.error("Error fetching tables:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, [searchParams]);

  const handlePageChange = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", page.toString());
    navigate(`/admin/collections?${newSearchParams.toString()}`);
  };

  const handleCheckboxChange = (id: string) => {
    setSelectedCollections((prevSelectedCollections) =>
      prevSelectedCollections.includes(id)
        ? prevSelectedCollections.filter((collectionId) => collectionId !== id)
        : [...prevSelectedCollections, id]
    );
  };

  const handleClickFilter = () => {
    setIsFilterPanelVisible(!isFilterPanelVisible);
  };

  return (
    <div>
      <AdminHeader icon={<FaRegFolderOpen />} label="Collections" />

      <div className="bg-light-gray border-b border-light-gray-1 flex">
        <div className="flex flex-col flex-1 border-r border-light-gray-1">
          <div className="px-8 py-4 border-b border-light-gray-1 flex items-center justify-between text-light-dark">
            {selectedCollections.length > 0 && (
              <span>{selectedCollections.length} Selected</span>
            )}
            <div className="ml-auto flex items-center divide-x">
              <div className="pr-4 flex items-center gap-2">
                {/* {filteredFiles.length > 0 && (
                  <span>{filteredFiles.length} Results</span>
                )} */}
                <button
                  onClick={handleClickFilter}
                  className="flex items-center border border-light-gray-3 rounded-md px-2 py-1 text-dark cursor-pointer"
                >
                  <CiFilter />
                  <span>Filter</span>
                </button>
              </div>
              <div className="pl-4">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  rowsPerPage={rowsPerPage}
                  pageSizeOptions={[5, 10, 20]}
                  onPageChange={handlePageChange}
                  onPageSizeChange={(value) => setRowsPerPage(value)}
                />
              </div>
            </div>
          </div>

          <NewCollectionSkeleton />

          <div className="p-8 flex flex-col items-center gap-4">
            <CollectionListHeader />

            {loading ? (
              <LoadingElement width="32" color="#4040BF" />
            ) : (
              collections.map((item) => (
                <CollectionListItem
                  key={item._id}
                  data={item}
                  id={item._id}
                  isSelected={selectedCollections.includes(item._id)}
                  setCollections={setCollections}
                  collections={collections}
                  fetchCollections={fetchCollections}
                  onCheckboxChange={handleCheckboxChange}
                />
              ))
            )}
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
