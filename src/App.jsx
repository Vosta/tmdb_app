import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './components/navBar';
import HomePage from './pages/home';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Route path="/" component={HomePage} />
      </div>
    </Router>

  );
}

export default App;
