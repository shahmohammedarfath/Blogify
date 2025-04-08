import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { Input } from "../ui/input.jsx";
import { Label } from "../ui/label.jsx";
import { Button } from "../ui/button.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/blog");
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Login Failed. Please check your credentials."
      );
    }
  };
  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email" className="mb-1">Email</Label>
          {/* <label htmlFor="email" className="block mb-1">
            Email
          </label> */}
          <Input className="bg-white" type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
          {/* <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          /> */}
        </div>
        <div>
          <Label htmlFor="password" className="mb-5">Password</Label>
          {/* <label htmlFor="password" className="block mb-1">
            Password
          </label> */}
          <Input className="bg-white" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          {/* <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          /> */}
        </div>
        {error && <p className="text-red-500">{error}</p>}
            <Button type="submit" className="w-full">Login</Button>
        {/* <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Login
        </button> */}
      </form>
    </div>
  );
};

export default Login;
