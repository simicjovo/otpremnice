import React, { useState, useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import LoginComponent from "./Components/LoginComponent";
import axios from "axios";
axios.defaults.withCredentials = true;

function App() {
  const [user, setUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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

  return <LoginComponent setUser={setUser}></LoginComponent>;
}

export default App;
