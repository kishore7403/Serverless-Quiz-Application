import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { toast } from "react-toastify";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  header: {
    marginBottom: theme.spacing(2),
  },
  teamMembersList: {
    backgroundColor: theme.palette.background.paper,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    width: 400,
    padding: theme.spacing(2),
  },
  emailInput: {
    marginBottom: theme.spacing(2),
  },
}));

const TeamDetails = () => {
  const classes = useStyles();
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [teamDetails, setTeamDetails] = useState();

  const handleGetTeamDetails = async () => {
    const userDetails = localStorage.getItem("currentLoggedInUser");
    const userData = await JSON.parse(userDetails);

    const userId = userData?.uid;

    try {
      const res = await axios.post(
        `https://us-central1-csci-5410-assignment2-391801.cloudfunctions.net/get_user_team?id=${userId}`
      );

      if (res.status < 400) {
        const createTeamRes = res.data;
        toast.success(createTeamRes?.message);
        setTeamDetails(createTeamRes.team);
      } else {
        setTeamDetails(null);
        console.error("An error occurred.");
      }
    } catch (error) {
      console.error("Error: " + error);
      setTeamDetails(null);
    }
  };

  const handleDeleteTeamMember = async (id) => {
    try {
      const res = await axios.post(
        `https://us-central1-csci-5410-assignment2-391801.cloudfunctions.net/remove_from_team`,
        {
          userId: id,
        }
      );

      if (res.status < 400) {
        const createTeamRes = res.data;
        toast.success(createTeamRes?.message);
        handleGetTeamDetails();
      } else {
        console.error("An error occurred.");
      }
    } catch (error) {
      console.error("Error: " + error);
    }
  };

  useEffect(() => {
    handleGetTeamDetails();
  }, []);

  const handleInviteClick = () => {
    setInviteModalOpen(true);
  };

  const handleInviteSubmit = () => {
    // Implement your invite logic here
    console.log("Inviting player with email:", inviteEmail);
    setInviteModalOpen(false);
  };

  const handleInviteModalClose = () => {
    setInviteModalOpen(false);
  };

  return (
    <Container className={classes.root}>
      <Typography variant="h4" className={classes.header}>
        Team Details
      </Typography>
      {teamDetails ? (
        <div>
          <Typography variant="h6">
            Team Name: {teamDetails.teamname}
          </Typography>
          <Typography variant="subtitle1">Team Members:</Typography>
          <List className={classes.teamMembersList}>
            {teamDetails.teamMembers.map((memberId) => (
              <ListItem key={memberId}>
                <ListItemText primary={`Member ID: ${memberId}`} />
                <IconButton>
                  <DeleteIcon
                    onClick={() => handleDeleteTeamMember(memberId)}
                  />
                </IconButton>
              </ListItem>
            ))}
          </List>
          <Button
            variant="contained"
            color="primary"
            onClick={handleInviteClick}
          >
            Invite Other Players
          </Button>
        </div>
      ) : (
        <Typography variant="body1">No team details found.</Typography>
      )}

      {/* Invite Modal */}
      <Dialog
        open={inviteModalOpen}
        onClose={handleInviteModalClose}
        className={classes.modal}
      >
        <DialogTitle>Invite Team Player</DialogTitle>
        <DialogContent className={classes.modalContent}>
          <TextField
            label="Email ID"
            variant="outlined"
            className={classes.emailInput}
            fullWidth
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleInviteModalClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleInviteSubmit} color="primary">
            Send Invitation
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TeamDetails;