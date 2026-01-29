import React from 'react';
import Signup from './Signup'; // This links your Signup.js file
import Login from './Login';   // This links your Login.js file

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
