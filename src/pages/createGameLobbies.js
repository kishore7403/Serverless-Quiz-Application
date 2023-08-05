import React, { useState } from "react";
import {
  Button,
  Container,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(2),
  },
  responseMessage: {
    color: theme.palette.primary.main,
    fontWeight: "bold",
  },
}));

const CreateGameLobbies = () => {
  const classes = useStyles();
  const [gameId, setGameId] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleCreateGameLobbies = async () => {
    try {
      const response = await fetch(
        "https://us-central1-csci5410-b00934899.cloudfunctions.net/create-game-lobbies",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            gameId: gameId,
          }),
        }
      );

      const data = await response.json();
      setResponseMessage(data.message);
    } catch (error) {
      console.error("Error creating game lobbies:", error);
      setResponseMessage("Error creating game lobbies. Please try again.");
    }
  };

  return (
    <Container className={classes.root}>
      <Typography variant="h2" color="primary">
        Create Game Lobbies
      </Typography>
      <TextField
        className={classes.input}
        variant="outlined"
        label="Enter Game ID"
        value={gameId}
        onChange={(e) => setGameId(e.target.value)}
      />
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={handleCreateGameLobbies}
      >
        Create Lobbies
      </Button>
      {responseMessage && (
        <Typography className={classes.responseMessage} variant="body1">
          {responseMessage}
        </Typography>
      )}
    </Container>
  );
};

export default CreateGameLobbies;
