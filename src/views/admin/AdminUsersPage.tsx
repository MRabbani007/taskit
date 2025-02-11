import { useContext, useState } from "react";
import { FiUsers } from "react-icons/fi";
import { AdminContext } from "@/context/AdminContext";
import CardAdminUser from "@/features/admin/CardAdminUser";
import FormEditUser from "@/features/admin/FormEditUser";

export default function AdminUsersPage() {
  const { users } = useContext(AdminContext);

  const [edit, setEdit] = useState(false);
  const [editItem, setEditItem] = useState<User | null>(null);

  return (
    <main>
      <header className="bg-teal-900 rounded-md text-zinc-100 py-2 px-4">
        <FiUsers size={30} />
        <h1 className="font-semibold">Users</h1>
      </header>
      <div className="flex flex-col gap-2">
        {users.length !== 0 &&
          users.map((user) => {
            return (
              <CardAdminUser
                key={user?.id}
                user={user}
                setEdit={setEdit}
                setEditItem={setEditItem}
              />
            );
          })}
      </div>
      {edit && editItem && (
        <FormEditUser edit={edit} setEdit={setEdit} user={editItem} />
      )}
    </main>
  );
}
