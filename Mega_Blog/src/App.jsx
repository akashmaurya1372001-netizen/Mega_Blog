import "./App.css";
import { Header, Footer } from "./components";
import { useDispatch } from "react-redux";
import  { useState, useEffect } from "react";
import AuthService from "./appwrite/auth.js";
import { login, logout } from "./Stores/authSlice.js";
import { Outlet } from "react-router-dom";
import Hero from "./components/Hero.jsx";


function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    AuthService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);
  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
       
        <Header />
         
        <main>
          <Hero></Hero>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
