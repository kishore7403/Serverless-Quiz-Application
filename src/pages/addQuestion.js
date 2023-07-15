import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import styles from '../styles/addQuestion.module.css';

const AddQuestionForm = () => {
  const navigate = useNavigate();
  const [questionNumber, setQuestionNumber] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState('');
  const [category, setCategory] = useState('');
  const [difficultyLevel, setDifficultyLevel] = useState('');

  const handleAddQuestion = () => {
    const questionData = {
      questionNumber,
      questionText,
      options,
      correctAnswerIndex,
      category,
      difficultyLevel,
    };

    // Make the POST request to the backend server
    fetch('https://us-central1-sdp-19.cloudfunctions.net/add_question', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(questionData),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Question added successfully');
          navigate(-1);
        } else {
          console.error('Failed to add question');
        }
      })
      .catch((error) => {
        console.error('Failed to add question', error);
      });
  };

  const handleOptionChange = (index, value) => {
    setOptions((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions[index] = value;
      return updatedOptions;
    });
  };

  return (
    <div className={styles.container}>
      <h2>Add Question</h2>
      <div className={styles.formContainer}>
        <div className={styles.formRow}>
          <h4>Question Number</h4>
          <TextField
            value={questionNumber}
            onChange={(e) => setQuestionNumber(e.target.value)}
            fullWidth
            margin="normal"
          />
        </div>
        <div className={styles.formRow}>
          <h4>Question Text</h4>
          <TextField
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            fullWidth
            margin="normal"
          />
        </div>
        <div className={styles.formRow}>
          <h4>Option 1</h4>
          <TextField
            value={options[0]}
            onChange={(e) => handleOptionChange(0, e.target.value)}
            fullWidth
            margin="normal"
          />
        </div>
        <div className={styles.formRow}>
          <h4>Option 2</h4>
          <TextField
            value={options[1]}
            onChange={(e) => handleOptionChange(1, e.target.value)}
            fullWidth
            margin="normal"
          />
        </div>
        <div className={styles.formRow}>
          <h4>Option 3</h4>
          <TextField
            value={options[2]}
            onChange={(e) => handleOptionChange(2, e.target.value)}
            fullWidth
            margin="normal"
          />
        </div>
        <div className={styles.formRow}>
          <h4>Option 4</h4>
          <TextField
            value={options[3]}
            onChange={(e) => handleOptionChange(3, e.target.value)}
            fullWidth
            margin="normal"
          />
        </div>
        <div className={styles.formRow}>
          <h4>Correct Answer Index</h4>
          <TextField
            type="number"
            value={correctAnswerIndex}
            onChange={(e) => setCorrectAnswerIndex(parseInt(e.target.value))}
            fullWidth
            margin="normal"
          />
        </div>
        <div className={styles.formRow}>
          <h4>Category</h4>
          <TextField
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            fullWidth
            margin="normal"
          />
        </div>
        <div className={styles.formRow}>
          <h4>Difficulty Level</h4>
          <TextField
            value={difficultyLevel}
            onChange={(e) => setDifficultyLevel(e.target.value)}
            fullWidth
            margin="normal"
          />
        </div>
        <div className={styles.formRow}>
          <Button variant="contained" onClick={handleAddQuestion} startIcon={<AddIcon />}>
            Add Question
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddQuestionForm;
