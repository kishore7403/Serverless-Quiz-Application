import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from '../styles/createGame.module.css';

const ManageGameDetailsPage = () => {
  const [gameData, setGameData] = useState(null);
  const [newQuestionNumber, setNewQuestionNumber] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedGameData = sessionStorage.getItem('gameData');
    if (storedGameData) {
      setGameData(JSON.parse(storedGameData));
    }
  }, []);

  const handleSaveChanges = () => {
    // Make the backend request to save the changes here
    const requestData = {
      gameId: gameData.gameId,
      gameName: gameData.gameName,
      category: gameData.category,
      difficulty: gameData.difficulty,
      timeFrame: gameData.timeFrame,
      questionNumbers: gameData.questionNumbers,
    };

    fetch('https://us-central1-sdp-19.cloudfunctions.net/create_game', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (response.ok) {
          // Handle successful save
          alert('Changes saved successfully');
          navigate(-1); // Navigate to the previous page
        } else {
          // Handle error cases here
          alert('Failed to save changes');
        }
      })
      .catch((error) => {
        // Handle error cases here
        alert('Failed to save changes', error);
      });
  };

  const handleAddNumber = () => {
    if (newQuestionNumber !== '') {
      setGameData((prevGameData) => {
        const updatedQuestionNumbers = [...prevGameData.questionNumbers, newQuestionNumber];
        return { ...prevGameData, questionNumbers: updatedQuestionNumbers };
      });
      setNewQuestionNumber('');
    }
  };

  const handleRemoveNumber = (number) => {
    setGameData((prevGameData) => {
      const updatedQuestionNumbers = prevGameData.questionNumbers.filter((num) => num !== number);
      return { ...prevGameData, questionNumbers: updatedQuestionNumbers };
    });
  };

  if (!gameData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h2>Edit Game Details</h2>
      <form className={styles.form}>
        <div className={styles.formRow}>
          <h4>Game ID</h4>
          <TextField
            label="Game ID"
            value={gameData.gameId}
            disabled
            fullWidth
            margin="normal"
          />
        </div>
        <div className={styles.formRow}>
          <h4>Game Name</h4>
          <TextField
            label="Game Name"
            value={gameData.gameName}
            onChange={(e) => setGameData({ ...gameData, gameName: e.target.value })}
            fullWidth
            margin="normal"
          />
        </div>
        <div className={styles.formRow}>
          <h4>Category</h4>
          <TextField
            label="Category"
            value={gameData.category}
            onChange={(e) => setGameData({ ...gameData, category: e.target.value })}
            fullWidth
            margin="normal"
          />
        </div>
        <div className={styles.formRow}>
          <h4>Difficulty</h4>
          <TextField
            label="Difficulty"
            value={gameData.difficulty}
            onChange={(e) => setGameData({ ...gameData, difficulty: e.target.value })}
            fullWidth
            margin="normal"
          />
        </div>
        <div className={styles.formRow}>
          <h4>Time Frame</h4>
          <TextField
            label="Time Frame"
            type="number"
            value={gameData.timeFrame}
            onChange={(e) => setGameData({ ...gameData, timeFrame: parseInt(e.target.value) })}
            fullWidth
            margin="normal"
          />
        </div>
        <div className={styles.formRow}>
          <h4>Question Numbers</h4>
          {gameData.questionNumbers.map((number, index) => (
            <div key={index}>
              {number}
              <Button variant="contained" onClick={() => handleRemoveNumber(number)} className={styles.removeButton}>
  Remove
</Button>

            </div>
          ))}
        </div>
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
        <div className={styles.formRow}>
          <Button onClick={handleSaveChanges} variant="contained">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ManageGameDetailsPage;
