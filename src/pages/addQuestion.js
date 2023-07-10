import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';

const AddQuestionForm = () => {
  const navigate = useNavigate();
  const [questionNumber, setQuestionNumber] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState('');
  const [category, setCategory] = useState('');
  const [difficultyLevel, setDifficultyLevel] = useState('');

  const handleAddQuestion = () => {
    // Handle logic to add the question to the database

    // Redirect to the previous page after adding the question
    navigate(-1);
  };

  const handleOptionChange = (index, value) => {
    setOptions((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions[index] = value;
      return updatedOptions;
    });
  };

  return (
    <div className="container">
      <h2>Add Question</h2>
      <div className="form-container">
        <div className="form-row">
          <h4>Question Number</h4>
          <TextField
            value={questionNumber}
            onChange={(e) => setQuestionNumber(e.target.value)}
            fullWidth
            margin="normal"
          />
        </div>
        <div className="form-row">
          <h4>Question Text</h4>
          <TextField
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            fullWidth
            margin="normal"
          />
        </div>
        <div className="form-row">
          <h4>Option 1</h4>
          <TextField
            value={options[0]}
            onChange={(e) => handleOptionChange(0, e.target.value)}
            fullWidth
            margin="normal"
          />
        </div>
        <div className="form-row">
          <h4>Option 2</h4>
          <TextField
            value={options[1]}
            onChange={(e) => handleOptionChange(1, e.target.value)}
            fullWidth
            margin="normal"
          />
        </div>
        <div className="form-row">
          <h4>Option 3</h4>
          <TextField
            value={options[2]}
            onChange={(e) => handleOptionChange(2, e.target.value)}
            fullWidth
            margin="normal"
          />
        </div>
        <div className="form-row">
          <h4>Option 4</h4>
          <TextField
            value={options[3]}
            onChange={(e) => handleOptionChange(3, e.target.value)}
            fullWidth
            margin="normal"
          />
        </div>
        <div className="form-row">
          <h4>Correct Answer Index</h4>
          <TextField
            type="number"
            value={correctAnswerIndex}
            onChange={(e) => setCorrectAnswerIndex(parseInt(e.target.value))}
            fullWidth
            margin="normal"
          />
        </div>
        <div className="form-row">
          <h4>Category</h4>
          <TextField
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            fullWidth
            margin="normal"
          />
        </div>
        <div className="form-row">
          <h4>Difficulty Level</h4>
          <TextField
            value={difficultyLevel}
            onChange={(e) => setDifficultyLevel(e.target.value)}
            fullWidth
            margin="normal"
          />
        </div>
        <div className="form-row">
          <Button variant="contained" onClick={handleAddQuestion} startIcon={<AddIcon />}>
            Add Question
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddQuestionForm;
