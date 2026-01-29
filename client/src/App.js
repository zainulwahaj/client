import React from "react";
import Signup from "./Signup";
import Login from "./Login";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Welcome to My App</h1>
      <Signup />
      <hr />
      <Login />
    </div>
  );
}

export default App;
