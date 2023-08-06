import React, { useEffect, useState } from 'react';
import { useLocation,Link } from 'react-router-dom';
import styles from '../styles/quizGame.module.css'; // Import the CSS module
import { Chat } from './chatapp';

const QuizGame = () => {
  // Retrieve state from the URL using the useLocation hook
  const location = useLocation();
  const { state } = location;

  // State variables
  const [gameData, setGameData] = useState(null);
  const [gameId, setGameId] = useState("");
  const [questionNumbers, setQuestionNumbers] = useState([]);
  const [questionData, setQuestionData] = useState({});
  const [selectedIndexes, setSelectedIndexes] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [timer, setTimer] = useState(null);
  const [countdown, setCountdown] = useState(20); // 20 seconds
  const [explanations, setExplanations] = useState({});

  // Fetch game data from the API when the component mounts
  useEffect(() => {
    if (state && state.message && state.message.game_Id) {
      const gameId = state.message.game_Id;
      fetch(`https://us-central1-sdp-19.cloudfunctions.net/manage_game`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gameId: gameId }),
      })
        .then((response) => response.json())
        .then((data) => {
          setGameData(data);
          setGameId(gameId);
          setQuestionNumbers(data.questionNumbers || []);

          // Initialize selectedIndexes with null values for each question
          const initialSelectedIndexes = {};
          data.questionNumbers.forEach((number) => {
            initialSelectedIndexes[number] = null;
          });
          setSelectedIndexes(initialSelectedIndexes);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [state]);

  // Fetch question data for each question number from the API
  useEffect(() => {
    if (gameData && questionNumbers.length > 0) {
      const fetchDataForQuestionNumber = async (number) => {
        try {
          const response = await fetch(`https://us-central1-sdp-19.cloudfunctions.net/edit_question`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ gameId: gameId, questionNumber: number }),
          });
          const data = await response.json();

          setQuestionData((prevData) => ({
            ...prevData,
            [number]: {
              ...data,
            },
          }));

          // Fetch explanation for the question
          const explanationResponse = await fetch(`https://us-central1-sdp-19.cloudfunctions.net/edit_question`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ gameId: gameId, questionNumber: number }),
          });
          const explanationData = await explanationResponse.json();

          setExplanations((prevExplanations) => ({
            ...prevExplanations,
            [number]: explanationData.explanation,
          }));
        } catch (error) {
          console.error(`Error fetching data for Question Number ${number}:`, error);
        }
      };

      // Fetch data for each question number
      questionNumbers.forEach((number) => {
        fetchDataForQuestionNumber(number);
      });
    }

    // If all questions are answered, set the quiz as completed
    if (currentQuestionIndex === questionNumbers.length) {
      setIsQuizCompleted(true);
      clearInterval(timer);
      setCountdown(null);
    }
  }, [gameData, questionNumbers, gameId, currentQuestionIndex, timer]);

  useEffect(() => {
    // If all questions are answered, set the quiz as completed
    if (currentQuestionIndex === questionNumbers.length) {
      setIsQuizCompleted(true);
      clearInterval(timer);
      setCountdown(null);

      // Get the user details from local storage
      const userId = state.message.userId;
      const currentLoggedInUser = JSON.parse(localStorage.getItem("currentLoggedInUser"));
        const username = currentLoggedInUser.display_name;
      // Here we'll send the selected indexes to your backend
      fetch('https://northamerica-northeast1-sdp-19.cloudfunctions.net/score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gameId: gameId,
          userId: userId,
          selectedIndexes: selectedIndexes,
          displayName:username
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response from your backend
          console.log('Successfully posted the results:', data);
        })
        .catch((error) => {
          console.error('Error posting the results:', error);
        });
    }
  }, [gameData, questionNumbers, gameId, currentQuestionIndex, timer, state]);

  // Handle user option selection for a question
  const handleOptionSelect = (questionNumber, optionIndex) => {
    setSelectedIndexes((prevIndexes) => ({
      ...prevIndexes,
      [questionNumber]: optionIndex,
    }));
  };

  // Automatically move to the next question after 3 seconds
  useEffect(() => {
    const questionInterval = setInterval(() => {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setCountdown(5); // 3 seconds
    }, 5000); // 3 seconds

    setTimer(questionInterval);

    return () => clearInterval(questionInterval);
  }, [questionNumbers.length]);

  // Handle countdown timer for each question
  useEffect(() => {
    if (timer !== null && countdown > 0) {
      const countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      return () => clearInterval(countdownInterval);
    }

    // Reset the countdown for the current question
    if (currentQuestionIndex >= 0 && currentQuestionIndex < questionNumbers.length) {
      setCountdown(5); // 3 seconds
    }
  }, [timer, countdown, currentQuestionIndex, questionNumbers.length]);

  // Handle "View Leaderboard" button click
  const handleViewLeaderboard = () => {
    console.log('View Leaderboard clicked!');
  };

  return (
    <div className={styles.container}>
      {state && (
        <div>
          <p>GameId: {state.message.game_Id}</p>
          <p>UserId: {state.message.userId}</p>
        </div>
      )}

      {currentQuestionIndex < questionNumbers.length && questionNumbers[currentQuestionIndex] && (
        <div className={styles.question}>
          <p>
            Question {currentQuestionIndex + 1} of {questionNumbers.length}
          </p>
          <p>Time Remaining: {countdown} seconds</p>

          <p>Question Text: {questionData[questionNumbers[currentQuestionIndex]]?.questionText}</p>
          <p>Options:</p>
          <ul className={styles.options}>
            {questionData[questionNumbers[currentQuestionIndex]]?.options.map((option, optionIndex) => {
              const selectedOptionIndex = selectedIndexes[questionNumbers[currentQuestionIndex]];
              return (
                <li key={optionIndex}>
                  <input
                    type="radio"
                    name={`question_${questionNumbers[currentQuestionIndex]}`}
                    value={option}
                    checked={selectedOptionIndex === optionIndex}
                    onChange={() => handleOptionSelect(questionNumbers[currentQuestionIndex], optionIndex)}
                  />
                  {option}
                </li>
              );
            })}
          </ul>
        </div>
      )}
      <h3>Global chat</h3>
      <div><Chat room={state.message.game_Id} /></div>
      <div className={styles.privateChatContainer}>
        {/* The "Private chat" button that opens in a new tab */}
        <Link to="/chatpage" target="_blank">
          <button className={styles.privateChatButton}>Private chat</button>
        </Link>
      </div>


      {isQuizCompleted && currentQuestionIndex === questionNumbers.length && (
        <div className={styles.quizend}>
          <h2>Quiz has ended</h2>
          <Link to="/leaderboard">
          <button onClick={handleViewLeaderboard}>View Leaderboard</button>
          </Link>
          <div className={styles.leaderboard}>
            <h3>Selected Indexes and Answers for Each Question:</h3>
            {questionNumbers.map((number) => (
              <div key={number} className={styles.explanation}>
                <h4>Question {number}:</h4>
                <p>
                  Selected Answer:{' '}
                  {selectedIndexes[number] !== null ? questionData[number]?.options[selectedIndexes[number]] : 'Not selected'}
                </p>
                <p>Explanation: {explanations[number]}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizGame;
