import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import FormContainer from "../components/FormContainer";
import { AdminContext } from "@/context/AdminContext";

export default function FormEditUser({
  user,
  edit,
  setEdit,
}: {
  user: User;
  edit: boolean;
  setEdit: Dispatch<SetStateAction<boolean>>;
}) {
  const { updateAdminUser } = useContext(AdminContext);

  const [state, setState] = useState<User>({ ...user });

  const [roleUser, setRoleUser] = useState(true);
  const [roleAdmin, setRoleAdmin] = useState(true);

  useEffect(() => {
    const temp = Object.values(user?.roles);
    if (temp.includes(2001)) {
      setRoleUser(true);
    } else {
      setRoleUser(false);
    }
    if (temp.includes(5150)) {
      setRoleAdmin(true);
    } else {
      setRoleAdmin(false);
    }
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    await updateAdminUser(state);
    setEdit(false);
  };

  return (
    <FormContainer
      title="Edit User"
      submitButton="Save"
      showForm={edit}
      setShowForm={setEdit}
      onSubmit={onSubmit}
    >
      <div>
        <p>Roles</p>
        <input
          type="checkbox"
          id="roleUser"
          checked={roleUser}
          onChange={(e) => setRoleUser(e.target.checked)}
        />
        <label htmlFor="roleUser">User</label>
        <input
          type="checkbox"
          id="roleAdmin"
          checked={roleAdmin}
          onChange={(e) => setRoleAdmin(e.target.checked)}
        />
        <label htmlFor="roleAdmin">Admin</label>
      </div>
    </FormContainer>
  );
}
