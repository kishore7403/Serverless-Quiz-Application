import React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import './admin.css'; 

const TriviaContentManagementPage = () => {
  const handleAdd = () => {
    // Handle the logic for adding a new trivia question
  };

  const handleEdit = () => {
    // Handle the logic for editing a trivia question
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
