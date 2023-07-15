import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/deleteQuestion.module.css';

const DeleteQuestionPage = () => {
    const navigate = useNavigate();
  const [question, setQuestion] = useState('');

  const handleDeleteQuestion = () => {
    const requestData = {
      questionNumber: question,
    };
  
    fetch('https://us-central1-sdp-19.cloudfunctions.net/delete_question', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (response.ok) {
          alert('Question deleted successfully');
          navigate(-1);
        } else {
          
          alert('Failed to delete question');
        }
      })
      .catch((error) => {
        
        alert('Failed to delete question', error);
      });
  };
  

  return (
    <div className={styles.container}>
      <h2>Delete Question</h2>
      <form className={styles.form}>
        <TextField
          label="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          className={styles.button}
          onClick={handleDeleteQuestion}
        >
          Delete
        </Button>
      </form>
    </div>
  );
};

export default DeleteQuestionPage;
