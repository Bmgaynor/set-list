import React from 'react';
import './App.css';
import Login from './Components/Login'
import CreatePlaylist from './Components/CreatePlaylist';
import Artists from './Components/Artists'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Login />
        <CreatePlaylist />
        <Artists />
      </header>
    </div>
  );
}

export default App;
