import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import { CiFilter } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";

import Pagination from "../../components/Common/Pagination";
import AdminHeader from "../../components/Admin/AdminHeader";
import LoadingElement from "../../components/Common/LoadingElement";
import UserListHeader from "../../components/Admin/User/UserListHeader";
import { UserListItem } from "../../components/Admin/User/UserListItem";
import NewUserSkeleton from "../../components/Admin/User/NewUserSkeleton";
import CreateUser from "../../components/Admin/User/CreateUser";
import FilterPanel from "../../components/Admin/User/FilterPanel";
import EditUser from "../../components/Admin/User/EditUser";

import api from "../../actions/api";
import { updateStatus } from "../../actions/user";
import { UserItem } from "../../types";

export default function Users() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<UserItem[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isFilterPanelVisible, setIsFilterPanelVisible] = useState(false);
  const [isNewUserPanelVisible, setIsNewUserPanelVisible] = useState(false);
  const [isEditUserPanelVisible, setIsEditUserPanelVisible] = useState(false);
  const [editUser, setEditUser] = useState<UserItem>();

  const handleAddUserClick = () => {
    setIsEditUserPanelVisible(false);
    setIsNewUserPanelVisible(!isNewUserPanelVisible);
  };

  const handleEditUserClick = (userId: string) => {
    if (isEditUserPanelVisible) {
      setIsEditUserPanelVisible(false);
    } else {
      const user = users.find((user) => user._id === userId);
      setEditUser(user);
      setIsNewUserPanelVisible(false);
      setIsEditUserPanelVisible(true);
    }
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

  const handleChangeUserStatus = (id: string) => {
    const user = users.find((user) => user._id === id);
    if (user) {
      const newStatus = user.status === "Active" ? "Suspended" : "Active";
      const onSuccess = () => {
        const updatedUsers = users.map((user) =>
          user._id === id ? { ...user, status: newStatus } : user
        );
        setUsers(updatedUsers);
        toast.success("Changed user status successfully.");
      };

      updateStatus(id, newStatus, onSuccess);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <AdminHeader icon={<FaRegUserCircle />} label="Users" />

      <div className="h-full bg-light-gray flex flex-row">
        <div className="h-full flex flex-col flex-1 border-r border-light-gray-1">
          <div className="px-8 py-4 border-b border-light-gray-1 flex items-center justify-between text-light-dark">
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
                      : "border-light-gray-3"
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
          <div className="min-w-full h-full p-4 sm:p-8 flex flex-col items-center gap-4">
            <UserListHeader />

            {loading ? (
              <LoadingElement width="32" color="#4040BF" />
            ) : (
              users.map((item: UserItem, index) => (
                <UserListItem
                  key={item._id}
                  index={(currentPage - 1) * itemsPerPage + index + 1}
                  data={item}
                  isSelected={selectedUsers.includes(item._id)}
                  handleStatusChange={handleChangeUserStatus}
                  onCheckboxChange={handleCheckboxChange}
                  handleEditUserClick={handleEditUserClick}
                />
              ))
            )}
          </div>
        </div>

        {isNewUserPanelVisible && (
          <div className="w-96 px-4 py-4 border-l-2 border-light-gray-1 flex justify-center">
            <CreateUser onClose={() => setIsNewUserPanelVisible(false)} />
          </div>
        )}

        {isEditUserPanelVisible && editUser && (
          <div className="w-96 px-4 py-4 border-l-2 border-light-gray-1 flex justify-center">
            <EditUser
              userData={editUser}
              users={users}
              setUsers={setUsers}
              onClose={() => setIsEditUserPanelVisible(false)}
            />
          </div>
        )}

        {isFilterPanelVisible && (
          <div className="h-screen w-96 px-4 py-4 border-l-2 border-light-gray-1 flex justify-center">
            <FilterPanel onClose={handleClickFilter} />
          </div>
        )}
      </div>
    </div>
  );
}
