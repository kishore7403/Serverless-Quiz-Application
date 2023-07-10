import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './admin.css';

const TriviaContentManagementPage = () => {
  const navigate = useNavigate();

  const handleAdd = () => {
    navigate('/add-question');
  };

  const handleEdit = () => {
    navigate('/edit-question');
  };

  const handleDelete = () => {
    // Handle the logic for deleting a trivia question
  };

  return (
    <div className="container">
      <h2>Trivia Content Management</h2>
      <div className="button-container">
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>
          Add Question
        </Button>
        <Button variant="contained" startIcon={<EditIcon />} onClick={handleEdit}>
          Edit Question
        </Button>
        <Button variant="contained" startIcon={<DeleteIcon />} onClick={handleDelete}>
          Delete Question
        </Button>
      </div>
    </div>
  );
};

export default TriviaContentManagementPage;
