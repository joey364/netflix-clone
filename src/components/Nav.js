import React, { useState, useEffect } from 'react';
import '../styles/Nav.css';

import { signOut } from '../utils/firebase';

function Nav() {
  const [show, handleShow] = useState(false);

  // * Checks the condition for navbar fade
  const transitionNavBar = () => {
    window.scrollY > 100 ? handleShow(true) : handleShow(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', transitionNavBar);
    return () => {
      window.removeEventListener('scroll', transitionNavBar);
    };
  }, []);
  return (
    <div className={`nav ${show && 'nav__black'}`}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/255px-Netflix_2015_logo.svg.png"
        alt="logo"
        className="nav__logo"
      />
      <div className="dropdown" style={{ float: 'right' }}>
        <img
          src="
       https://lh3.googleusercontent.com/ogw/ADGmqu8lSzgrVkMbbdk8_mmqslEyOvIVbGTdCdNfYawi=s83-c-mo 
        "
          alt=""
          className="dropdown__avatar"
        />
        <div className="dropdown-content">
          <a href="#" onClick={() => signOut()}>
            Sign out
          </a>
        </div>
      </div>
    </div>
  );
}

export default Nav;
