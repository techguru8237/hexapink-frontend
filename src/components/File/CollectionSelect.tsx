import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6"; // Import arrow icons
import { LiaSearchSolid } from "react-icons/lia";
import { MdLocationPin } from "react-icons/md";
import { HiUsers, HiMiniCircleStack } from "react-icons/hi2";
import { FaMoneyBillWave } from "react-icons/fa";
import { IoMdRadioButtonOn } from "react-icons/io";

import api from "../../actions/api";
import { useCurrency } from "../../contexts/Currency";
import { Collection } from "../../types";
import LoadingElement from "../Common/LoadingElement";

interface CollectionProps {
  type: string;
  countries: string[];
  selectedCollection: Collection | undefined;
  setSelectedCollection: (collection: Collection) => void;
  disabled?: boolean;
}

export default function CollectionSelect({
  type,
  countries,
  selectedCollection,
  setSelectedCollection,
  disabled = false,
}: CollectionProps) {
  const { currency } = useCurrency();

  const [collections, setCollections] = useState<Collection[]>([]);
  const [collectionLoading, setCollectionLoading] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<Collection[]>([]);
  const [showAllCollections, setShowAllCollections] = useState<boolean>(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setCollectionLoading(true);
        const response = await api.post(`/api/collection/one`, {
          type,
          countries,
        });
        setCollections(response.data);
      } catch (error) {
        console.error("Error fetching collections:", error);
      } finally {
        setCollectionLoading(false);
      }
    };

    fetchCollections();
  }, [type, countries]);

  useEffect(() => {
    if (search) {
      const results = collections.filter((collection) =>
        collection.title.includes(search.toLowerCase())
      );
      setSearchResults(results);
    } else if (showAllCollections) {
      setSearchResults(collections);
    } else {
      setSearchResults(collections.slice(0, 10));
    }
  }, [search, collections, showAllCollections]);

  const toggleShowAllCollections = () => {
    setShowAllCollections((prev) => !prev);
  };

  return (
    <div className="max-w-3xl bg-white border border-light-gray-1 rounded-lg flex flex-col text-dark">
      <div className="p-4 border-b border-dashed border-light-gray-1 text-left font-raleway font-bold">
        Collections
      </div>
      <div className="p-4 border-b border-dashed border-light-gray-1 flex items-center justify-start gap-2">
        <div className="flex items-center gap-4 p-2 border border-light-gray-3 rounded-lg">
          <LiaSearchSolid />
          <input
            type="text"
            placeholder="Search Collections"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            disabled={disabled}
            className="bg-transparent border-none outline-none"
          />
        </div>
        <button
          onClick={toggleShowAllCollections}
          className="ml-auto px-2 py-1 border flex items-center rounded-full text-dark"
        >
          {showAllCollections ? (
            <FaChevronUp className="text-sm" />
          ) : (
            <FaChevronDown className="text-sm" />
          )}{" "}
          {/* Arrow icon */}
          {/* <span className="ml-1">
            {showAllCollections ? "Show Less" : "Show All"}
          </span> */}
        </button>
      </div>

      <div className="max-h-48 min-w-full overflow-y-auto flex flex-wrap gap-2 p-6 border-b border-dashed border-light-gray-1">
        {collectionLoading ? (
          <div className="flex justify-center py-4">
            <LoadingElement width="16" color="#4040BF" />
          </div>
        ) : (
          <div className="w-full flex flex-col gap-2">
            {searchResults.map((collection) => {
              const isSelected = collection._id === selectedCollection?._id;

              return (
                <div
                  key={collection._id}
                  onClick={() => setSelectedCollection(collection)}
                  className={`w-full flex items-center p-3 border rounded-lg bg-light-gray-2 ${
                    isSelected
                      ? "border-dark-blue"
                      : "border-light-gray-3 hover:border-light-dark"
                  }`}
                >
                  <div className="flex flex-1 items-center gap-3">
                    <img
                      src={`${
                        import.meta.env.VITE_BACKEND_URL
                      }/${collection.image?.replace("uploads", "")}`}
                      alt="Collection image"
                      className="w-16 h-16 object-contain border border-light-gray-1 rounded-lg"
                    />
                    <div className="flex flex-col gap-1">
                      <span
                        className={`font-bold text-left ${
                          isSelected ? "text-dark-blue" : "text-dark"
                        }`}
                      >
                        {collection.title}
                      </span>
                      <div className="flex flex-wrap items-center gap-0 lg:gap-3">
                        <div className="flex items-center gap-1">
                          {collection.type === "Business" ? (
                            <HiMiniCircleStack className="text-md text-light-dark" />
                          ) : (
                            <HiUsers className="text-md text-light-dark" />
                          )}

                          <span>{collection.type}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MdLocationPin className="text-md text-light-dark" />
                          <span className="text-left text-nowrap">
                            {collection.countries?.length &&
                              collection.countries[0]}
                          </span>
                        </div>

                        {collection.fee && (
                          <div className="flex items-center gap-1">
                            <FaMoneyBillWave className="text-md text-light-dark" />
                            <span className="text-left text-nowrap">{`${currency} ${collection.fee}/Lead`}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <IoMdRadioButtonOn
                    className={`text-xl ${
                      isSelected ? "text-dark-blue" : "text-light-gray-3"
                    }`}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
