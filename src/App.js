import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './utils'
import './utils/inputs'

class App extends Component {
  render() {
    console.log('Ua', window.getPllFromColors('F', 'F', 'F', 'R', 'B', 'R')) // Ua
    console.log('Ua', window.getPllFromColors('F', 'B', 'F', 'R', 'R', 'R')) // Ua
    console.log('Ub', window.getPllFromColors('F', 'F', 'F', 'R', 'L', 'R')) // Ub
    console.log('Ub', window.getPllFromColors('F', 'L', 'F', 'R', 'R', 'R')) // Ub
    console.log('Ja', window.getPllFromColors('F', 'F', 'F', 'R', 'R', 'B')) // Ja
    console.log('Ja', window.getPllFromColors('F', 'F', 'R', 'B', 'B', 'B')) // Ja
    console.log('Jb', window.getPllFromColors('F', 'F', 'F', 'R', 'B', 'B')) // Jb
    console.log('Jb', window.getPllFromColors('F', 'R', 'R', 'B', 'B', 'B')) // Jb
    console.log('F', window.getPllFromColors('F', 'F', 'F', 'R', 'L', 'B')) // F
    console.log('F', window.getPllFromColors('F', 'L', 'R', 'B', 'B', 'B')) // F

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
