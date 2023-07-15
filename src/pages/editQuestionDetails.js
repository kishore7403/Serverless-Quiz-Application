import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import styles from '../styles/editQuestionDetails.module.css';

const EditQuestionDetailsPage = () => {
  const [questionData, setQuestionData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedQuestionData = sessionStorage.getItem('questionData');
    if (storedQuestionData) {
      setQuestionData(JSON.parse(storedQuestionData));
    }
  }, []);

  const handleSaveChanges = () => {
    // Make the backend request here
    fetch('https://us-central1-sdp-19.cloudfunctions.net/add_question', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(questionData)
    })
      .then((response) => {
        if (response.ok) {
          // Navigate two pages back upon successful completion
          navigate(-2);
        } else {
          // Handle error cases here
          console.error('Failed to save question details');
        }
      })
      .catch((error) => {
        // Handle error cases here
        console.error('Failed to save question details');
      });
  };

  if (!questionData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h2>Edit Question Details</h2>
      <div className={styles.formContainer}>
        <div className={styles.formRow}>
          <h4>Question Number</h4>
          <TextField
            type="text"
            value={questionData.questionNumber}
            disabled
          />
        </div>
        <div className={styles.formRow}>
          <h4>Question Text</h4>
          <TextField
            type="text"
            value={questionData.questionText}
            onChange={(e) => setQuestionData({ ...questionData, questionText: e.target.value })}
          />
        </div>
        <div className={styles.formRow}>
          <h4>Option 1</h4>
          <TextField
            type="text"
            value={questionData.options[0]}
            onChange={(e) => setQuestionData({ ...questionData, options: [e.target.value, questionData.options[1], questionData.options[2], questionData.options[3]] })}
          />
        </div>
        <div className={styles.formRow}>
          <h4>Option 2</h4>
          <TextField
            type="text"
            value={questionData.options[1]}
            onChange={(e) => setQuestionData({ ...questionData, options: [questionData.options[0], e.target.value, questionData.options[2], questionData.options[3]] })}
          />
        </div>
        <div className={styles.formRow}>
          <h4>Option 3</h4>
          <TextField
            type="text"
            value={questionData.options[2]}
            onChange={(e) => setQuestionData({ ...questionData, options: [questionData.options[0], questionData.options[1], e.target.value, questionData.options[3]] })}
          />
        </div>
        <div className={styles.formRow}>
          <h4>Option 4</h4>
          <TextField
            type="text"
            value={questionData.options[3]}
            onChange={(e) => setQuestionData({ ...questionData, options: [questionData.options[0], questionData.options[1], questionData.options[2], e.target.value] })}
          />
        </div>
        <div className={styles.formRow}>
          <h4>Correct Answer Index</h4>
          <TextField
            type="number"
            value={questionData.correctAnswerIndex}
            onChange={(e) => setQuestionData({ ...questionData, correctAnswerIndex: parseInt(e.target.value) })}
          />
        </div>
        <div className={styles.formRow}>
          <h4>Category</h4>
          <TextField
            type="text"
            value={questionData.category}
            onChange={(e) => setQuestionData({ ...questionData, category: e.target.value })}
          />
        </div>
        <div className={styles.formRow}>
          <h4>Difficulty Level</h4>
          <TextField
            type="text"
            value={questionData.difficultyLevel}
            onChange={(e) => setQuestionData({ ...questionData, difficultyLevel: e.target.value })}
          />
        </div>
        <div className={styles.formRow}>
          <Button onClick={handleSaveChanges} variant="contained">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditQuestionDetailsPage;
