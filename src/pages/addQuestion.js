import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import './addQuestion.css'


const AddQuestionForm = () => {
  const navigate = useNavigate();
  const [questionNumber, setQuestionNumber] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState('');
  const [category, setCategory] = useState('');
  const [difficultyLevel, setDifficultyLevel] = useState('');

  const handleAddQuestion = () => {
    // Create an object with the question data
    const questionData = {
      questionNumber,
      questionText,
      options,
      correctAnswerIndex,
      category,
      difficultyLevel,
    };

    // Make the POST request to the backend server
    const containerurl="http://localhost:5000/addquestion"
    fetch(containerurl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(questionData),
    })
      .then((response) => {
        if (response.ok) {
            console.log("status: Success")
          // Redirect to the previous page after successfully adding the question
          alert('Question added successfully');
          navigate(-1);
        } else {
          // Handle error cases here
          // ...
        }
      })
      .catch((error) => {
        // Handle error cases here
        // ...
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
