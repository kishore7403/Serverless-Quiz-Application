import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/createGame.module.css';

const CreateGamePage = () => {
  const navigate = useNavigate();
  const [gameId, setGameId] = useState('');
  const [gameName, setGameName] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [timeFrame, setTimeFrame] = useState(0);
  const [questionNumbers, setQuestionNumbers] = useState([]);
  const [newQuestionNumber, setNewQuestionNumber] = useState('');

  const handleCreateGame = () => {
    // Validate the form inputs here

    // Create the game data object
    const gameData = {
      gameId,
      gameName,
      category,
      difficulty,
      timeFrame,
      questionNumbers,
    };

    // Make the backend request here
    fetch('https://us-central1-sdp-19.cloudfunctions.net/create_game', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(gameData),
    })
      .then((response) => {
        if (response.ok) {
          // Handle successful game creation
          alert('Game created successfully');
          navigate(-1); // Navigate to the previous page
        } else {
          // Handle error cases here
          alert('Failed to create game');
        }
      })
      .catch((error) => {
        // Handle error cases here
        alert('Failed to create game', error);
      });
  };

  const handleAddNumber = () => {
    if (newQuestionNumber.trim() !== '') {
      setQuestionNumbers((prevQuestionNumbers) => [...prevQuestionNumbers, newQuestionNumber]);
      setNewQuestionNumber(''); // Clear the new question number field
    }
  };

  const handleRemoveNumber = (number) => {
    setQuestionNumbers((prevQuestionNumbers) =>
      prevQuestionNumbers.filter((num) => num !== number)
    );
  };

  return (
    <div className={styles.container}>
      <h2>Create Game</h2>
      <form className={styles.form}>
        <div className={styles.formRow}>
          <h4>Game ID</h4>
          <TextField
            label="Game ID"
            value={gameId}
            onChange={(e) => setGameId(e.target.value)}
            fullWidth
            margin="normal"
          />
        </div>
        <div className={styles.formRow}>
          <h4>Game Name</h4>
          <TextField
            label="Game Name"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            fullWidth
            margin="normal"
          />
        </div>
        <div className={styles.formRow}>
          <h4>Category</h4>
          <TextField
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            fullWidth
            margin="normal"
          />
        </div>
        <div className={styles.formRow}>
          <h4>Difficulty</h4>
          <TextField
            label="Difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            fullWidth
            margin="normal"
          />
        </div>
        <div className={styles.formRow}>
          <h4>Time Frame</h4>
          <TextField
            label="Time Frame"
            type="number"
            value={timeFrame}
            onChange={(e) => setTimeFrame(parseInt(e.target.value))}
            fullWidth
            margin="normal"
          />
        </div>
        <div className={styles.formRow}>
          <h4>Question Numbers</h4>
          {questionNumbers.map((number, index) => (
            <div key={index}>
              {number}
              <Button variant="contained" onClick={() => handleRemoveNumber(number)} className={styles.removeButton}>
  Remove
</Button>

            </div>
          ))}
          <div className={styles.formRow}>
            <TextField
              label="New Question Number"
              value={newQuestionNumber}
              onChange={(e) => setNewQuestionNumber(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button variant="contained" onClick={handleAddNumber}>
              Add Question Number
            </Button>
          </div>
        </div>
        <Button variant="contained" onClick={handleCreateGame} className={styles.createButton}>
          Create Game
        </Button>
      </form>
    </div>
  );
};

export default CreateGamePage;
