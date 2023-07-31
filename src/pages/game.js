import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  card: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderRadius: theme.spacing(1),
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    transition: "background-color 0.2s",
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  button: {
    marginRight: theme.spacing(2),
  },
  formControl: {
    marginBottom: theme.spacing(2),
    minWidth: 150,
  },
}));

const GameLobby = () => {
  const classes = useStyles();
  const { logOut, user } = UserAuth();
  const navigate = useNavigate();
  const [gameLobbies, setGameLobbies] = useState([]);
  const [filteredLobbies, setFilteredLobbies] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const [timeFrameFilter, setTimeFrameFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const handleLogOut = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchGameLobbies = async () => {
      try {
        const response = await fetch(
          "https://us-central1-csci5410-b00934899.cloudfunctions.net/function-1_test"
        );
        const data = await response.json();
        setGameLobbies(data.gameLobbies);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchGameLobbies();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      const filteredLobbies = gameLobbies.filter((lobby) => {
        const categoryMatch =
          !categoryFilter || lobby.category === categoryFilter;
        const difficultyMatch =
          !difficultyFilter || lobby.difficulty === difficultyFilter;
        const timeFrameMatch =
          !timeFrameFilter || lobby.timeFrame === timeFrameFilter;
        return categoryMatch && difficultyMatch && timeFrameMatch;
      });

      setFilteredLobbies(filteredLobbies);
    };

    applyFilters();
  }, [gameLobbies, categoryFilter, difficultyFilter, timeFrameFilter]);

  const handleJoinGame = (gameId) => {
    navigate(`/game/${gameId}`);
  };

  const resetFilter = () => {
    setCategoryFilter("");
    setDifficultyFilter("");
    setTimeFrameFilter("");
    setFilteredLobbies([]);
  };

  const uniqueCategories = Array.from(
    new Set(gameLobbies.map((lobby) => lobby.category))
  );
  const uniqueDifficulties = Array.from(
    new Set(gameLobbies.map((lobby) => lobby.difficulty))
  );
  const uniqueTimeFrames = Array.from(
    new Set(gameLobbies.map((lobby) => lobby.timeFrame))
  );

  return (
    <Container className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Game Lobby
      </Typography>
      <Typography variant="h6" gutterBottom>
        Available Game Lobbies
      </Typography>
      <Grid container spacing={2}>
        {(loading ? gameLobbies : filteredLobbies).map((lobby) => (
          <Grid item xs={12} sm={6} md={4} key={lobby.id}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h5" align="center">
                  {lobby.name}
                </Typography>
                <Typography align="center">
                  Category: {lobby.category}
                </Typography>
                <Typography align="center">
                  Difficulty: {lobby.difficulty}
                </Typography>
                <Typography align="center">
                  Time Frame: {lobby.timeFrame}
                </Typography>
                <Typography align="center">Teams:</Typography>
                <ul>
                  {lobby.players.map((team) =>
                    team.name ? <li key={team.id}>{team.name}</li> : null
                  )}
                </ul>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  onClick={() => handleJoinGame(lobby.id)}
                >
                  Join Lobby
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Typography variant="h6" gutterBottom>
        Filter Game Lobbies
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <FormControl className={classes.formControl}>
            <InputLabel>Category</InputLabel>
            <Select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              {uniqueCategories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl className={classes.formControl}>
            <InputLabel>Difficulty</InputLabel>
            <Select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              {uniqueDifficulties.map((difficulty) => (
                <MenuItem key={difficulty} value={difficulty}>
                  {difficulty}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl className={classes.formControl}>
            <InputLabel>Time Frame</InputLabel>
            <Select
              value={timeFrameFilter}
              onChange={(e) => setTimeFrameFilter(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              {uniqueTimeFrames.map((timeFrame) => (
                <MenuItem key={timeFrame} value={timeFrame}>
                  {timeFrame}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Button variant="contained" color="default" onClick={resetFilter}>
        Reset Filter
      </Button>
      <Button variant="contained" color="default" onClick={handleLogOut}>
        Logout
      </Button>
    </Container>
  );
};

export default GameLobby;
