import React from 'react';
import './styles/App.css';

import Main from './components/Main';
import Landing from './components/Landing';

import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase/app';

function App() {
  const auth = firebase.auth();
  const [user] = useAuthState(auth);

  return <div className="app">{user ? <Main /> : <Landing />}</div>;
}

export default App;
