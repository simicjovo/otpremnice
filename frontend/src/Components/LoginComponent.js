import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  InputAdornment,
  Snackbar,
  IconButton,
} from "@material-ui/core";
import { AccountCircle, LockRounded } from "@material-ui/icons";
import CloseIcon from "@material-ui/icons/Close";
import MuiAlert from "@material-ui/lab/Alert";
import axios from "axios";

export default function LoginComponent(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [failedLogin, setFailedLogin] = useState(false);

  const handleOnClick = (e) => {
    e.preventDefault();
    axios
      .post(
        "/api/users/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        setFailedLogin(false);
        props.setUser(true);
      })
      .catch((err) => {
        console.log(err);
        setFailedLogin(true);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setFailedLogin(false);
  };

  return (
    <div style={{ backgroundColor: "white" }}>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={failedLogin}
        autoHideDuration={6000}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      >
        <MuiAlert severity="error" variant="filled" onClose={handleClose}>
          Pogresni podaci
        </MuiAlert>
      </Snackbar>
      <form>
        <Grid
          container
          item
          alignItems="center"
          direction="column"
          justify="space-between"
          style={{ padding: 10, minHeight: "100vh" }}
        >
          <div></div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "10%",
            }}
          >
            <Grid container justify="center">
              <img
                src="https://apeiron-uni.eu/wp-content/uploads/2020/07/Logo_770x156.png"
                style={{ maxWidth: 600, width: "90%", padding: "5%" }}
                alt="logo"
              ></img>
            </Grid>

            <TextField
              autoFocus={true}
              type="text"
              label="Email"
              margin="normal"
              justify="center"
              style={{
                maxWidth: "50%",
                marginLeft: "25%",
                textAlign: "center",
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment>
                    <AccountCircle></AccountCircle>
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setEmail(e.target.value)}
            ></TextField>
            <TextField
              type="password"
              label="Password"
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment>
                    <LockRounded></LockRounded>
                  </InputAdornment>
                ),
              }}
              style={{
                maxWidth: "50%",
                marginLeft: "25%",
                textAlign: "center",
              }}
              onChange={(e) => setPassword(e.target.value)}
            ></TextField>
            <div style={{ height: 20 }}>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                style={{ float: "right", marginRight: "25%" }}
                onClick={handleOnClick}
              >
                Log in
              </Button>
            </div>
          </div>
          <div></div>
        </Grid>
      </form>
    </div>
  );
}
