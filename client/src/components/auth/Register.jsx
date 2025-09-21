import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { Label } from "../ui/label.jsx";
import { Input } from "../ui/input.jsx";
import { Button } from "../ui/button.jsx";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await register(username, email, password)
      navigate("/login");
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Registration Failed. Please try again."
      );
    }
  };
  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5 text-center">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor='username' className="mb-1">Username</Label>
          {/* <label htmlFor="username" className="block mb-1">
            Username
          </label> */}
          <Input className="" type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          {/* <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          /> */}
        </div>
        <div>
          <Label htmlFor='username' className="mb-1">Email</Label>
          {/* <label htmlFor="email" className="block mb-1">
            Email
          </label> */}
          <Input className="" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
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
          <Label htmlFor='username' className="mb-1">Password</Label>
          {/* <label htmlFor="password" className="block mb-1">
            Password
          </label> */}
          <Input className="" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
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
        <Button type="submit" className="w-full" >Register</Button>
        {/* <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Register
        </button> */}
      </form>
    </div>
  );
};

export default Register;
