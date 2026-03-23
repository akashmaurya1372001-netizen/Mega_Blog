import "./App.css";
import { Header, Footer } from "./components";
import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import authService from "./appwrite/auth";
import { login, logout } from "./Stores/authSlice.js";
import {Outlet} from "react-router-dom"
function App() {
  const [loading, setLoading] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout);
        }
      })
      .finally(() => setLoading(false));
  }, []);
  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>
           <Outlet/>
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
