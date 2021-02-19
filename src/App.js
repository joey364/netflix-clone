import React, { useState, useEffect } from 'react';
import './styles/App.css';

import Main from './components/Main';
import Landing from './components/Landing';

import firebase from 'firebase/app';

function App() {
  // * Keeps the state of the user
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('authUser'))
  );

  useEffect(() => {
    // * User auth state changed listener
    const listener = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        localStorage.setItem('authUser', JSON.stringify(authUser));
        setUser(authUser);
      } else {
        localStorage.removeItem(authUser);
        setUser(null);
      }
    });
    return () => listener();
  }, []);

  // * Renders app conditionally based on user auth state
  return <div className="app">{user ? <Main /> : <Landing />}</div>;
}

export default App;
