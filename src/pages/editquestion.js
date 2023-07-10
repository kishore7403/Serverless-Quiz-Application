import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from './editQuestion.module.css';

const EditQuestionPage = () => {
  const [questionNumber, setQuestionNumber] = useState('');
  const [questionData, setQuestionData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestData = {
      questionNumber: questionNumber
    };

    fetch('http://localhost:5000/editquestion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })
      .then((response) => response.json())
      .then((data) => {
        setQuestionData(data);
        setError(null);
      })
      .catch((error) => {
        setError('Failed to fetch question data. Please try again.');
        setQuestionData(null);
      });
  };

  return (
    <div className={styles.container}>
      <h2>Edit Question</h2>
      <form className={styles.form} onSubmit={handleSubmit}> 
        <TextField
          id="questionNumber"
          label="Question Number"
          value={questionNumber}
          onChange={(e) => setQuestionNumber(e.target.value)}
          required
        />
        <Button type="submit" variant="contained">Submit</Button>
      </form>
      {questionData && (
        <div className={styles['question-details']}> 
          <h3>Question Details:</h3>
          <p>Question Number: {questionData.questionNumber}</p>
          <p>Question Text: {questionData.questionText}</p>
        </div>
      )}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default EditQuestionPage;
