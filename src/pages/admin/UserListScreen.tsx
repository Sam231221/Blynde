import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";

import PageContainer from "../../components/PageContainer";
import { useUser } from "../../hooks/useAuth";

import { DeleteModal } from "../../components/reusables/DeleteModal";
import { useDeleteUserMutation, useUsersQuery } from "../../lib/userApi";
import { AddUserModal } from "../../components/reusables/AddUserModal";
function UserListScreen() {
  const dispatch = useDispatch();
  const redirect = useNavigate();
  const userInfo = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setfilteredUsers] = useState([]);
  const [filterRole, setFilterRole] = useState<string | null>(null);
  const { data: users, isLoading } = useUsersQuery();

  const [userToDelete, setUserToDelete] = useState({
    id: "",
    name: "",
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const { mutate: deleteMutation } = useDeleteUserMutation();
  const handleDeleteUser = (userId: number) => {
    deleteMutation(userId);
    setIsDeleteModalOpen(false);
  };

  useEffect(() => {
    if (Array.isArray(users) && users.length > 0) {
      const filteredUsers = users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (filterRole ? user.role === filterRole : true)
      );
      setfilteredUsers(filteredUsers);
    }
  }, [users]);
  useEffect(() => {
    if (!userInfo && !userInfo.isAdmin) {
      redirect("/login");
    }
  }, [dispatch, redirect, userInfo]);

  if (isLoading) return <>Loading...</>;

  return (
    <>
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-8">User Dashboard</h1>

        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              className="h-5 w-5 text-gray-400 absolute right-3 top-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={filterRole || ""}
              onChange={(e) => setFilterRole(e.target.value || null)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="User">User</option>
            </select>
            <button
              onClick={() => {
                setIsAddUserModalOpen(true);
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Add User
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>

                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.length > 0 &&
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <img
                          src={
                            user.profile_pic !== null
                              ? user.profile_pic
                              : "https://ui-avatars.com/api/?name=Profile+Picture"
                          }
                          alt={user.name}
                          width={32}
                          height={32}
                          className="h-8 w-8 rounded-full mr-2"
                        />
                        <span>{user.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">{user.email}</td>

                    {/* <td className="py-3 px-4">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td> */}

                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <Link
                          to={`/user/${user.id}`}
                          className="text-blue-500 hover:text-blue-600"
                        >
                          View
                        </Link>
                        <Link
                          to={`/admin/userlist/${user.id}/`}
                          className="text-gray-500 hover:text-gray-600"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => {
                            setUserToDelete({
                              ...userToDelete,
                              id: String(user.id),
                              name: user.name,
                            });
                            setIsDeleteModalOpen(true);
                          }}
                          className="text-red-500 hover:text-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <AddUserModal
          isOpen={isAddUserModalOpen}
          onClose={() => setIsAddUserModalOpen(false)}
        />
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={() => handleDeleteUser(userToDelete.id)}
          user={userToDelete}
        />
      </div>
    </>
  );
}

export default UserListScreen;
