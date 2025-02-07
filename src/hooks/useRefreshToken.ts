import axios from "../api/axios";
import useAuth from "./useAuth";

export default function useRefreshToken() {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/user/refresh", {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    setAuth((prev) => {
      // console.log(JSON.stringify(prev));
      // console.log(response.data.accessToken);
      return {
        ...prev,
        user: response.data.user,
        roles: response?.data?.roles,
        accessToken: response.data.accessToken,
      };
    });

    return response.data.accessToken;
  };

  return refresh;
}
