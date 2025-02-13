import ToggleSwitch from "@/features/components/ToggleSwitch";
import { useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";

export default function ProfilePage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profileVisibility, setProfileVisibility] = useState(true);

  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [twoFactor, setTwoFactor] = useState(false);
  const [accountPrivacy, setAccountPrivacy] = useState(true);

  return (
    <main className="m-0 p-0">
      <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
        <header className="text-gray-800 dark:text-gray-200 flex items-center mb-6">
          <FaRegCircleUser size={30} />
          <h1 className="text-2xl font-bold">Profile</h1>
        </header>

        <div className="space-y-4">
          {/* Profile Settings */}
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg flex flex-col">
            <h2 className="font-semibold text-gray-700 dark:text-gray-300">
              Profile Settings
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Manage your profile information.
            </p>
            <div className="flex flex-col gap-4 mt-4">
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="p-2 border rounded w-full"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="p-2 border rounded w-full"
                />
              </div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="p-2 border rounded w-full"
                disabled
              />
              <textarea
                placeholder="Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="p-2 border rounded w-full"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 border rounded w-full"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="p-2 border rounded w-full"
              />
              <ToggleSwitch
                label="Profile Visibility"
                value={profileVisibility}
                onChange={setProfileVisibility}
              />
            </div>
            <button className="mt-3 mx-auto py-2 px-4 bg-zinc-200 rounded-md">
              Update Profile
            </button>
          </div>

          {/* Account Settings */}
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <h2 className="font-semibold text-red-600 dark:text-red-400">
              Account Settings
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Manage your account and security.
            </p>
            <div>
              <div className="space-y-3 text-gray-400">
                <input
                  type="email"
                  placeholder="New Email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="p-2 border rounded w-full"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                  <button className="ml-auto py-2 px-4 bg-zinc-400 hover:bg-zinc-300 duration-200 rounded-md">
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
