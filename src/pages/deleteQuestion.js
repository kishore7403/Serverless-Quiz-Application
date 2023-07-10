import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import styles from './deleteQuestion.module.css';

const DeleteQuestionPage = () => {
  const [question, setQuestion] = useState('');

  const handleDeleteQuestion = () => {
    // ...handleDeleteQuestion logic...
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
