"use client";
import { useEffect, useState } from "react";
import {
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // for modal
  const [newRole, setNewRole] = useState("");
  const [newStatus, setNewStatus] = useState("");

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete user
  const handleDelete = async (userId) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`/api/users/${userId}`, { method: "DELETE" });
      if (res.ok) {
        setUsers(users.filter((u) => u._id !== userId));
        alert("✅ User deleted!");
      } else {
        const data = await res.json();
        alert("❌ " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Something went wrong!");
    }
  };

  // Open modal to edit role/status
  const openEditUser = (user) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setNewStatus(user.status || "active");
  };

  // Update role/status
  const handleUserUpdate = async () => {
    if (!selectedUser) return;
    try {
      const res = await fetch(`/api/users/${selectedUser._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole, status: newStatus }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        data = { message: res.statusText || "No response body" };
      }

      if (res.ok) {
        setUsers((prevUsers) =>
          prevUsers.map((u) =>
            u._id === selectedUser._id
              ? { ...u, role: newRole, status: newStatus }
              : u
          )
        );
        setSelectedUser(null);
        alert("✅ User updated successfully!");
      } else {
        alert("❌ " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Something went wrong!");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
        Users Management
      </h1>

      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white">
            <th className="py-2 px-4 border">#</th>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Role</th>
            <th className="py-2 px-4 border">Status</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, index) => (
            <tr
              key={u._id}
              className="text-center text-gray-900 dark:text-gray-200"
            >
              <td className="py-2 px-4 border">{index + 1}</td>
              <td className="py-2 px-4 border">{u.name}</td>
              <td className="py-2 px-4 border">{u.email}</td>
              <td className="py-2 px-4 border">{u.role}</td>
              <td className="py-2 px-4 border">
                {u.status === "active" ? (
                  <span className="text-green-600 font-semibold">Active</span>
                ) : (
                  <span className="text-red-600 font-semibold">Suspended</span>
                )}
              </td>
              <td className="py-2 px-4 border flex justify-center gap-2">
                <button
                  onClick={() => openEditUser(u)}
                  className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition"
                  title="Edit Role/Status"
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(u._id)}
                  className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white transition"
                  title="Delete User"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              Edit {selectedUser.name}
            </h2>

            <label className="block mb-2 font-semibold">Role:</label>
            <select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="superadmin">Super Admin</option>
            </select>

            <label className="block mb-2 font-semibold">Status:</label>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
            >
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedUser(null)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUserUpdate}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
