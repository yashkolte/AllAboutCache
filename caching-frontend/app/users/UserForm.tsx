"use client";

import { useState } from "react";
import { api } from "@/app/lib/api";
import { useUsers } from "@/app/lib/fetchUsers";

export default function UserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { mutate } = useUsers();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post("/users", { name, email });
    mutate(); // Refresh cache so new user appears in list
    setName("");
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-2">
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add User</button>
    </form>
  );
}
