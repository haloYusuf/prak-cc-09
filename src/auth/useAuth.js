import { useAuthContext } from "./authProvider";

const useAuth = () => {
  const { accessToken, login, user, logout, refreshAccessToken } = useAuthContext();

  return {
    accessToken,
    login,
    user,
    logout,
    refreshAccessToken,
    isAuthenticated: !!accessToken,
  };
};

export default useAuth;
