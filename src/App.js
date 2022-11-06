import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Settings from './pages/Settings';

import Login from './pages/Login';
import Game from './pages/Game';
import Ranking from './pages/Ranking';
import Feedback from './pages/Feedback';

export default function App() {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/game" component={ Game } />
        <Route path="/ranking" component={ Ranking } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/settings" component={ Settings } />
      </Switch>
    </main>

  );
}
