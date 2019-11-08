import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';
import UserForm from './components/Form.js';



function App() {

    const [users, setUsers] = useState([]);

  return (
    <div className="App">
      <UserForm
        users={users}
        setUsers={setUsers}

      />
    </div>
  );
}

export default App;
