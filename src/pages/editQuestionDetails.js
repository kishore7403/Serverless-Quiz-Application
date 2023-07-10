import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';

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
    sessionStorage.removeItem('questionData');
    navigate(-1);
  };

  if (!questionData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h2>Edit Question Details</h2>
      <div className="form-container">
        <div className="form-row">
          <h4>Question Number</h4>
          <TextField
            type="text"
            value={questionData.questionNumber}
            disabled
          />
        </div>
        <div className="form-row">
          <h4>Question Text</h4>
          <TextField
            type="text"
            value={questionData.questionText}
          />
        </div>
        <div className="form-row">
          <h4>Option 1</h4>
          <TextField
            type="text"
            value={questionData.options[0]}
          />
        </div>
        <div className="form-row">
          <h4>Option 2</h4>
          <TextField
            type="text"
            value={questionData.options[1]}
          />
        </div>
        <div className="form-row">
          <h4>Option 3</h4>
          <TextField
            type="text"
            value={questionData.options[2]}
          />
        </div>
        <div className="form-row">
          <h4>Option 4</h4>
          <TextField
            type="text"
            value={questionData.options[3]}
          />
        </div>
        <div className="form-row">
          <h4>Correct Answer Index</h4>
          <TextField
            type="number"
            value={questionData.correctAnswerIndex}
          />
        </div>
        <div className="form-row">
          <h4>Category</h4>
          <TextField
            type="text"
            value={questionData.category}
          />
        </div>
        <div className="form-row">
          <h4>Difficulty Level</h4>
          <TextField
            type="text"
            value={questionData.difficultyLevel}
          />
        </div>
        <div className="form-row">
          <Button onClick={handleSaveChanges} variant="contained">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditQuestionDetailsPage;
