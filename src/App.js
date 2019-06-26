import React from 'react';
import './App.css';
import Login from './Components/Login'
import CreatePlaylist from './Components/CreatePlaylist';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Login />
        <CreatePlaylist />
      </header>
    </div>
  );
}

export default App;
