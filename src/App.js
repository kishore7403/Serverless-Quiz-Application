import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Logout from "./pages/logout";
import {AuthContextProvider} from "./context/AuthContext";
import Dashboard from "./pages/dashboard";

function App() {
  return <div>
    <AuthContextProvider>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Login />} path="/login" />
        <Route element={<Logout />} path="/logout" />
        <Route element={<Dashboard />} path="/dashboard" />
      </Routes>
    </AuthContextProvider>
  </div>;
}

export default App;
