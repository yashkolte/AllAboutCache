"use client";

import { useUsers } from "@/app/lib/fetchUsers";
import { api } from "@/app/lib/api";
import { User } from "../types";

export default function UserList() {
    const { users, isLoading, isError, mutate } = useUsers();
  
    // 🔴 DELETE USER (Updates UI instantly by clearing cache)
    const handleDelete = async (id: number) => {
      await api.delete(`/users/${id}`);
      mutate(); // Refresh cache so updated data is fetched
    };
  
    if (isLoading) return <p>Loading users...</p>;
    if (isError) return <p>Error loading users.</p>;
  
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold">User List</h2>
        <ul>
          {users.map((user: User) => (
            <li key={user.id} className="flex justify-between items-center p-2 border-b">
              <span>{user.name} ({user.email})</span>
              <button onClick={() => handleDelete(user.id)} className="text-red-500">Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }