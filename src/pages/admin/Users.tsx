import { useState, useEffect } from "react";
import { CiFilter } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import AdminHeader from "../../components/Dashboard/AdminHeader";
import Pagination from "../../components/Pagination";
import UserListHeader from "../../components/User/UserListHeader";
import { UserListItem } from "../../components/User/UserListItem";
import NewUserSkeleton from "../../components/User/NewUserSkeleton";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../../actions/api";
import { UserItem } from "../../types";
import CreateUser from "../../components/User/CreateUser";
import FilterPanel from "../../components/User/FilterPanel";
import LoadingElement from "../../components/Common/LoadingElement";

export default function Users() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<UserItem[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isFilterPanelVisible, setIsFilterPanelVisible] = useState(false);
  const [isNewUserPanelVisible, setIsNewUserPanelVisible] = useState(false);

  const handleAddUserClick = () => {
    setIsNewUserPanelVisible(!isNewUserPanelVisible);
  };

  const itemsPerPage = 5;
  const currentPage = parseInt(searchParams.get("page") || "1");

  useEffect(() => {
    const fetchUsers = async () => {
      // Construct the query string from all search params
      const queryParams = new URLSearchParams(searchParams);

      try {
        setLoading(true);
        const response = await api.get(
          `/api/users?${queryParams.toString()}&limit=${itemsPerPage}`
        );

        setUsers(response.data.users);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [searchParams]); // Now depends on searchParams instead of just page

  const handlePageChange = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", page.toString());
    navigate(`/admin/users?${newSearchParams.toString()}`);
  };

  const handleCheckboxChange = (id: string) => {
    setSelectedUsers((prevSelectedUsers) =>
      prevSelectedUsers.includes(id)
        ? prevSelectedUsers.filter((tableId) => tableId !== id)
        : [...prevSelectedUsers, id]
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
      <AdminHeader icon={<FaRegUserCircle />} label="Users" />

      <div className="bg-light-gray flex flex-row">
        <div className="flex flex-col flex-1 border-r border-light-gray1">
          <div className="px-8 py-4 border-b border-light-gray1 flex items-center justify-between text-light-dark">
            {selectedUsers.length > 0 && (
              <span>{selectedUsers.length} Selected</span>
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

          {/* Skeleton */}
          <NewUserSkeleton onAddUserClick={handleAddUserClick} />

          {/* Main Table */}
          <div className="p-8 flex flex-col gap-4">
            <UserListHeader />

            {loading ? (
              <LoadingElement width="32" color="#4040B" />
            ) : (
              users.map((item: UserItem, index) => (
                <UserListItem
                  key={item._id}
                  index={(currentPage - 1) * itemsPerPage + index + 1}
                  data={item}
                  isSelected={selectedUsers.includes(item._id)}
                  onCheckboxChange={handleCheckboxChange}
                />
              ))
            )}
          </div>
        </div>

        {isNewUserPanelVisible && (
          <div className="h-screen w-96 px-4 py-4 border-l-2 border-light-gray1 flex justify-center">
            <CreateUser />
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
