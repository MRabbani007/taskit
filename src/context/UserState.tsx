import { ReactNode, createContext, useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import { SERVER } from "../data/actions";

type UserProfile = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage?: string;
};

type UserSettings = {
  taskView: string;
};

type UserState = {
  userProfile: UserProfile | null;
  userSettings: UserSettings | null;
  updateUserSettings: (settings: UserSettings) => void;
};

// Initial state
const initialState: UserState = {
  userProfile: null,
  userSettings: null,
  updateUserSettings: () => {},
};

// Create context
export const UserContext = createContext(initialState);

// Provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  // Store userName
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userSettings, setUserSettings] = useState<UserSettings | null>(null);

  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const getUserProfile = async () => {
    const response = await axiosPrivate.post(SERVER.GET_USER_SETTINGS, {
      username: auth?.user,
      roles: auth?.roles,
    });

    if (response?.data) {
      setUserProfile(response.data?.userProfile);
      setUserSettings(response.data?.userSettings);
    }
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
        updateUserSettings,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
