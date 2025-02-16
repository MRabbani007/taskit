import { UserContext } from "@/context/UserState";
import PageHeader from "@/features/components/PageHeader";
import ToggleSwitch from "@/features/components/ToggleSwitch";
import FormProfileImage from "@/features/user/FormProfileImage";
import useAuth from "@/hooks/useAuth";
import useLogout from "@/hooks/useLogout";
import { T_USERACCOUNT, T_USERPROFILE, T_USERSETTINGS } from "@/lib/templates";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";

export default function ProfilePage() {
  const logout = useLogout();
  const { auth } = useAuth();
  const { userProfile, updateUserProfile } = useContext(UserContext);

  const [state, setState] = useState({ ...T_USERPROFILE, ...userProfile });
  const [accountState, setAccountState] = useState({ ...T_USERACCOUNT });
  const [settingsState, setSettingsState] = useState({ ...T_USERSETTINGS });

  const [editImage, setEditImage] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(
    userProfile?.profileImage ?? ""
  );

  useEffect(() => {
    setState({ ...T_USERPROFILE, ...userProfile });
  }, [userProfile]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const handleSettingsChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setAccountState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    updateUserProfile({ ...state, profileImage: profileImage ?? "" });
  };

  const [profileVisibility, setProfileVisibility] = useState(true);

  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [twoFactor, setTwoFactor] = useState(false);
  const [accountPrivacy, setAccountPrivacy] = useState(true);

  return (
    <main className="">
      <PageHeader
        className=""
        pageTitle="Profile"
        icon={<FaRegCircleUser size={25} />}
      ></PageHeader>
      <div className="space-y-4">
        {/* Profile Settings */}
        <form
          onSubmit={onSubmit}
          className="p-4 bg-gray-100 dark:bg-gray-80 rounded-lg flex flex-col"
        >
          <div className="flex items-stretch gap-2">
            <div
              className="bg-white rounded-full overflow-clip"
              onClick={() => setEditImage(true)}
            >
              <img
                src={userProfile?.profileImage}
                className="w-14 h-14 object-fill scale-125"
              />
            </div>
            <div>
              <h2 className="font-semibold text-gray-700 dark:text-gray-30">
                Profile Settings
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-40">
                Manage your profile information.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder="First Name"
                id="firstname"
                name="firstname"
                value={state.firstname}
                onChange={handleChange}
                className="p-2 border rounded w-full"
              />
              <input
                type="text"
                placeholder="Last Name"
                id="lastname"
                name="lastname"
                value={state?.lastname}
                onChange={handleChange}
                className="p-2 border rounded w-full"
              />
            </div>
            <input
              type="text"
              placeholder="Career Trade"
              id="careerTrade"
              name="careerTrade"
              value={state?.careerTrade}
              onChange={handleChange}
              className="p-2 border-2 rounded w-full"
            />
            <textarea
              placeholder="Bio"
              id="bio"
              name="bio"
              value={state?.bio}
              onChange={handleChange}
              className="p-2 border-2 rounded w-full"
            />
            <input
              type="email"
              id="profileEmail"
              name="profileEmail"
              placeholder="Email"
              value={state?.profileEmail}
              onChange={handleChange}
              className="p-2 border rounded w-full"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              name="phoneNumber"
              value={state.phoneNumber}
              onChange={handleChange}
              className="p-2 border-2 rounded w-full"
            />
            {/* <ToggleSwitch
              label="Profile Visibility"
              value={profileVisibility}
              onChange={setProfileVisibility}
            /> */}
          </div>
          <button
            type="submit"
            className="mt-3 mx-auto py-2 px-4 bg-zinc-200 rounded-md"
          >
            Update Profile
          </button>
        </form>

        {/* Account Settings */}
        <div className="p-4 bg-gray-100 dark:bg-gray-80 rounded-lg">
          <h2 className="font-semibold text-red-600 dark:text-red-400">
            Account Settings
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-40">
            Manage your account and security.
          </p>
          <div>
            <div className="space-y-3 text-gray-400">
              <input
                type="text"
                placeholder="Username"
                value={accountState?.username}
                onChange={handleSettingsChange}
                className="p-2 border rounded w-full"
                disabled
              />
              <input
                type="email"
                placeholder="Email"
                value={accountState.email}
                onChange={handleSettingsChange}
                className="p-2 border rounded w-full"
              />
              <ToggleSwitch
                label="Two-Factor Authentication"
                value={twoFactor}
                onChange={setTwoFactor}
              />
              <ToggleSwitch
                label="Account Privacy"
                value={accountPrivacy}
                onChange={setAccountPrivacy}
              />
              <div className="flex items-center gap-2">
                <button className="bg-blue-600 text-white p-2 rounded-md">
                  Export Data
                </button>
                <button className="bg-yellow-500 text-white p-2 rounded-md">
                  Deactivate Account
                </button>
                <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md">
                  Delete Account
                </button>
                <button
                  onClick={logout}
                  className="ml-auto py-2 px-4 text-white bg-zinc-600 hover:bg-zinc-500 duration-200 rounded-md"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {editImage && (
        <FormProfileImage
          url={state?.profileImage ?? ""}
          setUrl={setProfileImage}
          filename={auth?.user ?? ""}
          edit={editImage}
          setEdit={setEditImage}
        />
      )}
    </main>
  );
}
