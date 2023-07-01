import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { firestore } from "../firebase";

const Game = () => {
  const { logOut, user } = UserAuth();
  const navigate = useNavigate();
  const [gameLobby, setGameLobby] = useState(null);

  const handleLogOut = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // Fetch game lobby data from Firestore or DynamoDB
    const fetchGameLobby = async () => {
      try {
        // Assuming you have a collection named "gameLobbies" in Firestore
        const gameLobbyRef = firestore.collection("gameLobbies").doc("your-game-lobby-id");
        const snapshot = await gameLobbyRef.get();
        if (snapshot.exists()) {
          const lobbyData = snapshot.data();
          setGameLobby(lobbyData);
        } else {
          // Game lobby not found
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchGameLobby();
  }, []);

  return (
    <div>
      <h1>Game Lobby</h1>
      {gameLobby ? (
        <>
          <h2>Lobby Details</h2>
          <p>Lobby ID: {gameLobby.id}</p>
          <p>Game Name: {gameLobby.name}</p>
          {/* Display other game lobby information */}

          {/* Render list of players */}
          <h2>Players</h2>
          <ul>
            {gameLobby.players.map((player) => (
              <li key={player.id}>{player.name}</li>
            ))}
          </ul>

          {/* Start game button */}
          <button onClick={() => console.log("Start game")}>Start Game</button>
        </>
      ) : (
        <p>Loading game lobby...</p>
      )}

      <button onClick={handleLogOut}>Logout</button>
    </div>
  );
};

export default Game;
