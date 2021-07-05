import React, { useState } from "react";
import LoginComponent from "./Components/LoginComponent";

function App() {
  const [user, setUser] = useState(false);
  return <LoginComponent setUser={setUser}></LoginComponent>;
}

export default App;
