import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./components/Home.jsx";
import BlogList from "./components/blog/BlogList.jsx";
import BlogPost from "./components/blog/BlogPost.jsx";
import Register from "./components/auth/Register.jsx";
import Login from "./components/auth/Login.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex-col min-h-screen">
          <Header />
          <main className="flex-1 p-8 my-0 mx-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<BlogList />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
