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
import EditQuestionDetailsPage from "./pages/editQuestionDetails";
import DeleteQuestionPage from "./pages/deleteQuestion";
import CreateGamePage from "./pages/createGame";


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
        <Route element={<EditQuestionDetailsPage />} path="/edit-question-details" />
        <Route element={<DeleteQuestionPage />} path="/delete-question" />
        <Route element={<CreateGamePage />} path="/create-game" />
      </Routes>
    </AuthContextProvider>
  </div>;
}

export default App;
