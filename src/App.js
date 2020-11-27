import React, { useState, useEffect } from 'react';
import './styles/App.css';

import Main from './components/Main';
import Landing from './components/Landing';

import firebase from 'firebase/app';

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('authUser'))
  );

  useEffect(() => {
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

  return <div className="app">{user ? <Main /> : <Landing />}</div>;
}

export default App;
