import UserForm from "./users/UserForm";
import UserList from "./users/UserList";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <UserForm />
      <UserList />
    </div>
  );
}
