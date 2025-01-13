import { createContext, useContext, useState } from "react";
import API from "../components/utils/api.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await API.post("/user/login", { email, password });
      const { token, username: loggedInUsername } = response.data;
      localStorage.setItem("token", token);
      setUser(loggedInUsername);
    } catch (error) {
      throw new Error("Login Failed");
    }
  };

  const register = async () => {
    try {
      const response = await API.post("/user/register", {
        username,
        email,
        password,
      });
      console.log(response)
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
