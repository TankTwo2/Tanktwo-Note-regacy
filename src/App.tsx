import React from 'react';
import './App.css';

function App() {
  function apiTest() {
    fetch('http://tanktwo.synology.me:5001/users').then(res=> res.json()).then(json => console.log(json)).catch(erro=> console.error(erro))

  }

  const condition = true;
  if(condition && condition) {
      console.log('hello world!');
  }

  return (
    <div className="App">
      <header className="App-header">
        Tanktwo's Blog
        <button onClick={apiTest} >
        http://tanktwo.synology.me/users
        </button>
      </header>
    
    </div>
  );
}

export default App;
