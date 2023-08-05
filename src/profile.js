import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Grid, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@material-ui/core/Box";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import LeaderboardPage from "./pages/Leaderboard";

function UserProfile() {
  const location = useLocation();
  const { state } = location;
  const [displayName, setDisplayName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from triggering a page reload
    console.log(displayName, "On submit>>>>>>", imageUrl);

    if (selectedImage) {
      const storage = getStorage();
      const imageRef = ref(
        storage,
        `profile_photos/${state?.message?.uid}/profile.png`
      );

      try {
        // Upload the selectedImage to Firebase Storage using the put method
        await uploadBytes(imageRef, selectedImage);

        // Get the download URL of the uploaded image
        const imageUrl = await getDownloadURL(imageRef);

        // Now you can store the imageUrl in the database or use it directly for displaying the image
        console.log(imageUrl, "Uploaded image URL");
        fetch(
          "https://us-central1-serverless-sdp19.cloudfunctions.net/add_users",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              uid: state?.message?.uid,
              display_name: displayName,
              email: email,
              photo_url: imageUrl,
            }),
          }
        )
          .then((data) => {
            navigate("/dashboard");
            console.log("Response:", data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const getImageUrlByUid = async (uid) => {
    const storage = getStorage();
    const imageRef = ref(storage, `profile_photos/${uid}/profile.png`);

    try {
      // Get the download URL of the image from Firebase Storage
      const imageUrl = await getDownloadURL(imageRef);
      console.log(imageUrl); // The URL of the image for the specific uid
      return imageUrl;
    } catch (error) {
      console.error("Error retrieving image:", error);
      return null;
    }
  };

  useEffect(() => {
    const uid = state?.message?.uid; // uid from dashboard

    // Call the getImageUrlByUid function inside the useEffect hook
    getImageUrlByUid(uid)
      .then((imageUrl) => {
        const displayNameFromState = state?.message?.display_name;
        setDisplayName(displayNameFromState || ""); // Use the logical OR operator to provide a fallback value for displayName
        setEmail(state?.message?.email || "");
        setImageUrl(state?.message?.photo_url);
      })
      .catch((error) => {});
  }, [state?.message?.uid]);

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid container justifyContent="center">
            <Typography
              variant="h5"
              style={{ marginTop: "20px" }}
              align="center"
              fontWeight="bold"
            >
              User Profile Management
            </Typography>
          </Grid>
          <Grid item xs={12} sm={2}></Grid>
          <Grid item xs={12} sm={6}>
            {imageUrl && (
              <>
                <input
                  accept="image/*"
                  type="file"
                  id="select-image"
                  style={{ display: "none" }}
                  onChange={(e) => setSelectedImage(e.target.files[0])}
                />
                <label htmlFor="select-image">
                  <Button
                    variant="contained"
                    style={{ left: "1%", bottom: "2%" }}
                    color="primary"
                    component="span"
                  >
                    Upload
                  </Button>
                </label>
                <Box mt={2} textAlign="center">
                  <img src={imageUrl} alt="img here" height="100px" />
                </Box>
              </>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              disabled={true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              name="displayName"
              required
              fullWidth
              id="displayName"
              label="Display Name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="caption" color="textSecondary">
              Note: You can change your profile details from here.
            </Typography>
          </Grid>
          <Grid item xs={12} container justifyContent="center">
            <Button variant="contained" color="primary" type="submit" style={{marginBottom: "20px"}}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
      <LeaderboardPage/>
    </div>
  );
}
export default UserProfile;
