import { createContext, useContext, useEffect, useState } from "react";
import API from "../components/utils/api.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     API.get("/user/profile")
  //       .then((response) => {
  //         // setUser({
  //         //   username: response.data.username,
  //         //   email: response.data.email,
  //         // });

  //         console.log(response);

  //       })
  //       .catch((error) => {
  //         console.error("Error fetching user data:", error);
  //       });
  //   }
  // }, []);

  const login = async (email, password) => {
    try {
      const response = await API.post("/user/login", { email, password });

      const { token } = response.data;
      const { username } = response.data.user;

      localStorage.setItem("token", token);
      setUser(username);
      alert(response.data.message + " Redirecting to Dashboard");
    } catch (error) {
      throw new Error("Login Failed");
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await API.post("/user/register", {
        username,
        email,
        password,
      });
      alert(response.data.message + " Redirecting to login");
      // console.log(response.data.message)
    } catch (error) {
      throw new Error("Registration Failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
