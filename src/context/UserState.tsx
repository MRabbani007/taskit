import { ReactNode, createContext, useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

type UserState = {
  userProfile: UserProfile | null;
  userSettings: UserSettings | null;
  updateUserProfile: (settings: UserProfile) => void;
  updateUserSettings: (settings: UserSettings) => void;
};

// Initial state
const initialState: UserState = {
  userProfile: null,
  userSettings: null,
  updateUserProfile: () => {},
  updateUserSettings: () => {},
};

// Create context
export const UserContext = createContext(initialState);

// Provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { auth, config } = useAuth();

  // Store userName
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userSettings, setUserSettings] = useState<UserSettings | null>(null);

  const axiosPrivate = useAxiosPrivate();

  const getUserProfile = async () => {
    try {
      const response = await axiosPrivate.get("/user/profile", { ...config });

      if (response?.data) {
        setUserProfile(response.data?.userProfile);
        // setUserSettings(response.data?.userSettings);
      }
    } catch (error) {}
  };

  const updateUserProfile = async (profileData: UserProfile) => {
    try {
      const response = await axiosPrivate.patch("/user/profile", {
        profileData,
        ...config,
      });

      if (response?.status === 204) {
        toast.success("Profile Updated");

        getUserProfile();
      }
    } catch (error) {}
  };

  const updateUserSettings = async (settings: UserSettings) => {
    setUserSettings(settings);
  };

  useEffect(() => {
    if (auth?.user && auth?.roles) {
      getUserProfile();
    }
  }, [auth?.user]);

  return (
    <UserContext.Provider
      value={{
        userProfile,
        userSettings,
        updateUserProfile,
        updateUserSettings,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
