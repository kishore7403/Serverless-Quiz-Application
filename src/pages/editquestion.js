import React, { useState } from 'react';

const EditQuestionPage = () => {
  const [questionNumber, setQuestionNumber] = useState('');
  const [questionData, setQuestionData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:5000/editquestion`)
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
    <div className="container">
      <h2>Edit Question</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="questionNumber">Question Number:</label>
        <input
          type="text"
          id="questionNumber"
          value={questionNumber}
          onChange={(e) => setQuestionNumber(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
      {questionData && (
        <div className="question-details">
          <h3>Question Details:</h3>
          <p>Question Number: {questionData.questionNumber}</p>
          <p>Question Text: {questionData.questionText}</p>
          {/* Render other question details */}
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default EditQuestionPage;
