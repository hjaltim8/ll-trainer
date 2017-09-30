import React, { Component } from 'react'
import LastLayer from './components/LastLayer'
import logo from './logo.svg'
import './App.css'
import './utils/inputs'

class App extends Component {
  render() {
    return (
      <div className="App">
        <LastLayer />
      </div>
    );
  }
}

export default App
