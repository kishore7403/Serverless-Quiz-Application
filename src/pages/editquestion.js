import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from '../styles/editQuestion.module.css';

const EditQuestionPage = () => {
  const [questionNumber, setQuestionNumber] = useState('');
  const navigate = useNavigate();

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
        sessionStorage.setItem('questionData', JSON.stringify(data));
        navigate('/edit-question-details');
      })
      .catch((error) => {
        alert("edit failed")
        navigate(-1);
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
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default EditQuestionPage;
