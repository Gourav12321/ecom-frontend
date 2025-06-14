import React, { useEffect, useState } from "react";
import apiClient from "../../config/api.js";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get("/api/user/users");
        setUsers(response.data);
      } catch (error) {
        toast.error("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      toast.success("User deleted successfully");

      try {
        await apiClient.delete(`/api/user/delete-user/${userId}`);

        const response = await apiClient.get("/api/user/users");
        setUsers(response.data);
      } catch (error) {
        toast.error("Failed to delete user");
      }
    }
  };

  const handleSaveUser = async () => {
    try {
      setLoading(true);

      const response = await apiClient.get("/api/user/users");
      setUsers(response.data);

      setEditingUser(null);
      toast.success("User updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      await apiClient.put("/api/user/update-user", editingUser);
      const response = await apiClient.get("/api/user/users");
      setUsers(response.data); // Changed from response.data.users to response.data
      setEditingUser(null);
      toast.success("User updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="lg:p-4 ml-0 pl-0 pt-10 lg:pt-0">
      <div className="grid gap-4 lg:gap-16 lg:grid-cols-2 xl:grid-cols-3">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white p-4 rounded-lg shadow-md border border-gray-200 md:w-[20rem] w-[18rem]"
          >
            <div className="flex items-center mb-4 md:p-4 p-1 gap-3">
              <img
                src={user.profile}
                alt={user.fullName}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {user.fullName}
                </h3>
                <p className="text-sm text-gray-500">{user.email}</p>
                <p className="text-sm text-gray-500">{user.role}</p>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => handleEdit(user)}
                className="text-indigo-600 hover:text-indigo-900"
                aria-label="Edit User"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDelete(user._id)}
                className="text-red-600 hover:text-red-900"
                aria-label="Delete User"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingUser && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded shadow-md w-80">
            <h2 className="text-lg font-bold mb-4">Edit User</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                value={editingUser.fullName}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, fullName: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                value={editingUser.role}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, role: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              >
                <option value="General">General</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleUpdate}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setEditingUser(null)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
