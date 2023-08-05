import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Logout from "./pages/logout";
import { AuthContextProvider } from "./context/AuthContext";
import Dashboard from "./pages/dashboard";
import GameLobby from "./pages/game"; // Import the GameLobby component
import TriviaContentManagementPage from "./pages/admin";
import AddQuestionForm from "./pages/addQuestion";
import EditQuestionPage from "./pages/editquestion";
import EditQuestionDetailsPage from "./pages/editQuestionDetails";
import DeleteQuestionPage from "./pages/deleteQuestion";
import CreateGamePage from "./pages/createGame";
import ManageGamePage from "./pages/manageGame";
import ManageGameDetailsPage from "./pages/manageGameDetails";
import AuthQuestions from "./pages/authquestions";
import AskQuestion from "./pages/askquestion";
import QuizGame from "./pages/quizGame";
import LeaderboardPage from "./pages/Leaderboard";
import NotificationPage from "./pages/Notification";
import ForgotPassword from "./pages/resetpassword";
import UserProfile from "./profile";

import ChatPage from "./pages/chatPage";
import TeamDetails from "./pages/TeamDetails";
import CreateGameLobbies from "./pages/createGameLobbies";

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Routes>
          <Route element={<Login />} path="/login" />
          <Route element={<Logout />} path="/logout" />
          <Route element={<Dashboard />} path="/dashboard" />
          <Route element={<AuthQuestions />} path="/authQuestions" />
          <Route element={<AskQuestion />} path="/askQuestion" />
          <Route element={<ForgotPassword />} path="/reset-password" />
          <Route element={<UserProfile />} path="/profile" />
          <Route path="/game-lobby" element={<GameLobby />} />
          <Route element={<TriviaContentManagementPage />} path="/admin" />
          <Route element={<AddQuestionForm />} path="/add-question" />
          <Route element={<EditQuestionPage />} path="/edit-question" />
          <Route
            element={<EditQuestionDetailsPage />}
            path="/edit-question-details"
          />
          <Route element={<DeleteQuestionPage />} path="/delete-question" />
          <Route element={<TeamDetails />} path="/team-details" />

          <Route element={<CreateGamePage />} path="/create-game" />
          <Route element={<ManageGamePage />} path="/edit-game" />
          <Route element={<LeaderboardPage />} path="/leaderboard" />
          <Route element={<NotificationPage />} path="/notification" />
          <Route
            element={<ManageGameDetailsPage />}
            path="/edit-game-details"
          />

          <Route element={<Home />} path="/" />

          <Route element={<QuizGame />} path="/game-experience" />
          <Route element={<ChatPage />} path="/chatpage" />
          <Route element={<CreateGameLobbies />} path="/create-game-lobbies" />


        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
