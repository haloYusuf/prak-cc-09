import { AuthProvider } from "./auth/authProvider";
import Router from "./routes/RouterApp"; // halaman-halaman
import AxiosInterceptor from "./api/axiosInterceptor";

const App = () => {
  return (
    <AuthProvider>
      <AxiosInterceptor />
      <Router />
    </AuthProvider>
  );
};

export default App;
