import "./App.css";
import authService from "./appwrite/authentication.js";
import { Header, Footer } from "./components";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import { login, logout } from "./Stores/authSlice.js";
import { Outlet } from "react-router-dom";
import Hero from "./components/Hero.jsx";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
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
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
