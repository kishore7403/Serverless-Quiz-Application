import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Logout from "./pages/logout";
import {AuthContextProvider} from "./context/AuthContext";
import Dashboard from "./pages/dashboard";
import TriviaContentManagementPage from "./pages/admin";
import AddQuestionForm from "./pages/addQuestion";
import EditQuestionPage from "./pages/editquestion";

function App() {
  return <div>
    <AuthContextProvider>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Login />} path="/login" />
        <Route element={<Logout />} path="/logout" />
        <Route element={<Dashboard />} path="/dashboard" />
        <Route element={<TriviaContentManagementPage />} path="/admin" />
        <Route element={<AddQuestionForm />} path="/add-question" />
        <Route element={<EditQuestionPage />} path="/edit-question" />
      </Routes>
    </AuthContextProvider>
  </div>;
}

export default App;
