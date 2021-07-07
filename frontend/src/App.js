import React, { useState, useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import LoginComponent from "./Components/LoginComponent";
import Interface from "./Components/Interface";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Otpremnice from "./Components/Otpremnice";
import OtpremnicaNova from "./Components/OtpremnicaNova";
import Skladiste from "./Components/Skladiste";
import Servisi from "./Components/Servisi";
import NoviProdukt from "./Components/NoviProdukt";
axios.defaults.withCredentials = true;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const [user, setUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    axios
      .get("/api/users/check")
      .then((res) => {
        setUser(true);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);

  const handleLogOut = () => {
    axios
      .get("/api/users/logout")
      .then((res) => setUser(false))
      .catch((err) => console.log(err));
  };

  if (isLoading) {
    return (
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
        }}
      >
        <CircularProgress />
      </div>
    );
  }
  if (!user) {
    return <LoginComponent setUser={setUser}></LoginComponent>;
  } else {
    return (
      <div className={classes.root}>
        <BrowserRouter>
          <AppBar position="static">
            <Toolbar style={{ justifyContent: "space-between" }}>
              <Typography variant="h6">
                <Link to="/" style={{ color: "#FFF", textDecoration: "none" }}>
                  <Button color="inherit">Pocetna</Button>
                </Link>
              </Typography>
              <Link to="/" style={{ color: "#FFF", textDecoration: "none" }}>
                <Button
                  color="inherit"
                  onClick={() => handleLogOut()}
                  style={{ float: "right" }}
                >
                  LOGOUT
                </Button>
              </Link>
            </Toolbar>
          </AppBar>
          <Switch>
            <Route path="/" exact component={() => <Interface />}></Route>
            <Route
              path="/otpremnice"
              exact
              component={() => <Otpremnice />}
            ></Route>
            <Route
              path="/otpremnice/nova"
              exact
              component={() => <OtpremnicaNova />}
            ></Route>
            <Route
              path="/skladiste"
              exact
              component={() => <Skladiste />}
            ></Route>
            <Route
              path="/skladiste/noviProdukt"
              exact
              component={() => <NoviProdukt />}
            ></Route>
            <Route path="/servisi" exact component={() => <Servisi />}></Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
