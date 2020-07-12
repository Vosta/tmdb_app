import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './components/navBar';
import HomePage from './pages/home';
import GlobalStateProvider from './store/globalStateProvider';
import WatchPage from './pages/watch';

function App() {
    return (
        <Router>
            <GlobalStateProvider>
                <div className="App">
                    <NavBar />
                    <Route path="/browse" component={HomePage} />
                    <Route path="/watch" component={WatchPage} />
                </div>
            </GlobalStateProvider>
        </Router>

    );
}

export default App;
