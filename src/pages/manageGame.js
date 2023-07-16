import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from '../styles/editQuestion.module.css';

const ManageGamePage = () => {
  const [gameId, setGameId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestData = {
      gameId: gameId
    };

    // Make the backend request here
    fetch('https://us-central1-sdp-19.cloudfunctions.net/manage_game', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })
      .then((response) => response.json())
      .then((data) => {
        sessionStorage.setItem('gameData', JSON.stringify(data));
        navigate('/edit-game-details');
      })
      .catch((error) => {
        alert("Failed to edit game");
        navigate(-1);
      });
  };

  return (
    <div className={styles.container}>
      <h2>Manage Game</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <TextField
          id="gameId"
          label="Game ID"
          value={gameId}
          onChange={(e) => setGameId(e.target.value)}
          required
        />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ManageGamePage;
