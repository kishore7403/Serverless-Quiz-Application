import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import MuiAppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";

const Dashboard = () => {
  const { logOut, user } = UserAuth();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [userProfileData, setUserProfileData] = React.useState({});

  const getNotifications = () => {
    navigate("/notification");
  };

  const getLeaderboard = () => {
    navigate("/leaderboard");
  };

  const handleLogOut = async () => {
    try {
      localStorage.clear();
      await logOut();
    } catch (err) {
      console.log(err);
    }
  };

  const handleCreateTeam = async () => {
    const userDetails = localStorage.getItem("currentLoggedInUser");
    const userData = await JSON.parse(userDetails);

    const body = {
      userId: userData?.uid,
      username: userData?.display_name,
    };

    try {
      const res = await axios.post(
        `https://us-central1-csci-5410-assignment2-391801.cloudfunctions.net/create_team`,
        body
      );

      if (res.status < 400) {
        const createTeamRes = await res.data;
        toast.success(createTeamRes?.message);
        navigate("/game-lobby");
      } else {
        console.error("An error occurred.");
      }
    } catch (error) {
      console.error("Error: " + error);
    }
  };

  const drawerWidth = 240;

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const defaultTheme = createTheme();

  useEffect(() => {
    if (user == null || user == {} || user == undefined) {
      //if user is not authorized
      navigate("/");
    }
    const uid = user?.uid;
    fetch(
      `https://us-central1-serverless-sdp19.cloudfunctions.net/get_user_by_id?uid=${uid}`
    )
      .then((response) => response.json())
      .then((data) => {
        setUserProfileData(data);
        //set user in local storage
        localStorage.setItem("currentLoggedInUser", JSON.stringify(data));
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
    console.log(user, "DASHBOARD");
  }, []);

  function handleLobbyClick() {
    navigate("/game-lobby");
  }

  function handleProfileClick() {
    const data1 = { message: userProfileData };
    navigate("/profile", { state: data1 });
  }

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="absolute" open={open}>
            <Toolbar
              sx={{
                pr: "24px",
              }}
            >
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                Dashboard
              </Typography>
              <IconButton color="inherit">
                <Badge sx={{ mr: 2 }} color="secondary">
                  <LeaderboardIcon onClick={getLeaderboard} />
                </Badge>
                <Badge color="secondary">
                  {/*User Profile Menu*/}
                  <AccountCircleIcon
                    onClick={handleProfileClick}
                    sx={{ mr: 2 }}
                  />
                </Badge>
                <Badge badgeContent={2} color="secondary">
                  <NotificationsIcon onClick={getNotifications} />
                </Badge>
              </IconButton>
              {/*Logout*/}
              <Button sx={{ ml: 2 }} variant="contained" onClick={handleLogOut}>
                Logout
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
      </ThemeProvider>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 30 }}>
        <Button
          variant="contained"
          style={{ marginRight: "10px" }}
          onClick={handleCreateTeam}
        >
          Create Team
        </Button>
        <Button variant="contained" onClick={handleLobbyClick}>
          Join Game Lobby
        </Button>
      </Box>
    </>
  );
};

export default Dashboard;
