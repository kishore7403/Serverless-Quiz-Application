import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { firestore } from "../firebase";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";

const Game = () => {
  const { logOut, user } = UserAuth();
  const navigate = useNavigate();
  const [gameLobbies, setGameLobbies] = useState([]);
  const [filteredLobbies, setFilteredLobbies] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const [timeFrameFilter, setTimeFrameFilter] = useState("");

  const handleLogOut = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // Fetch all game lobbies from Firestore
    const fetchGameLobbies = async () => {
      try {
        const gameLobbiesRef = collection(firestore, "gameLobbies");
        const snapshot = await getDocs(gameLobbiesRef);
        const lobbiesData = snapshot.docs.map((doc) => doc.data());
        setGameLobbies(lobbiesData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchGameLobbies();
  }, []);

  const createGameLobby = async () => {
    try {
      const gameLobbiesRef = collection(firestore, "gameLobbies");
      const gameLobbyId = doc(gameLobbiesRef);
      const players = [
        { id: "player1-id", name: "Player 1" },
        { id: "player2-id", name: "Player 2" },
        // Add more player objects as needed
      ];

      const newGameLobby = {
        id: gameLobbyId.id,
        name: "My Game Lobby",
        category: "Trivia",
        difficulty: "Easy",
        timeFrame: "30 minutes",
        players: players,
        // Add other required fields for the game lobby
      };

      await setDoc(gameLobbyId, newGameLobby);

      setGameLobbies((prevGameLobbies) => [...prevGameLobbies, newGameLobby]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleJoinGame = (gameId) => {
    navigate(`/game/${gameId}`);
  };

  const handleFilterGames = () => {
    // Filter the game lobbies based on the selected criteria
    const filteredLobbies = gameLobbies.filter((lobby) => {
      return (
        (categoryFilter === "" || lobby.category === categoryFilter) &&
        (difficultyFilter === "" || lobby.difficulty === difficultyFilter) &&
        (timeFrameFilter === "" || lobby.timeFrame === timeFrameFilter)
      );
    });

    setFilteredLobbies(filteredLobbies);
  };

  const resetFilter = () => {
    setCategoryFilter("");
    setDifficultyFilter("");
    setTimeFrameFilter("");
    setFilteredLobbies([]);
  };

  return (
    <div>
      <h1>Game Lobby</h1>
      {/* Display game lobbies */}
      <h2>Available Game Lobbies</h2>
      <ul>
        {(filteredLobbies.length > 0 ? filteredLobbies : gameLobbies).map((lobby) => (
          <li key={lobby.id}>
            <h3>{lobby.name}</h3>
            <p>Category: {lobby.category}</p>
            <p>Difficulty: {lobby.difficulty}</p>
            <p>Time Frame: {lobby.timeFrame}</p>
            {/* Add other lobby details */}
            <button onClick={() => handleJoinGame(lobby.id)}>Join Lobby</button>
          </li>
        ))}
      </ul>

      {/* Filter game lobbies */}
      <h2>Filter Game Lobbies</h2>
      {/* Category filter */}
      <div>
        <label>Category:</label>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="Trivia">Trivia</option>
          <option value="Puzzle">Puzzle</option>
          {/* Add more category options as needed */}
        </select>
      </div>
      {/* Difficulty filter */}
      <div>
        <label>Difficulty:</label>
        <select
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
          {/* Add more difficulty options as needed */}
        </select>
      </div>
      {/* Time Frame filter */}
      <div>
        <label>Time Frame:</label>
        <select
          value={timeFrameFilter}
          onChange={(e) => setTimeFrameFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="15 minutes">15 minutes</option>
          <option value="30 minutes">30 minutes</option>
          <option value="1 hour">1 hour</option>
          {/* Add more time frame options as needed */}
        </select>
      </div>
      <button onClick={handleFilterGames}>Filter Lobbies</button>
      <button onClick={resetFilter}>Reset Filter</button>

      {/* Create game lobby button */}
      <button onClick={createGameLobby}>Create Game Lobby</button>

      <button onClick={handleLogOut}>Logout</button>
    </div>
  );
};

export default Game;
