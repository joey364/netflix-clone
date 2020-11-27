import React, { useState, useEffect } from 'react';
import '../styles/Nav.css';

import { signOut } from '../utils/firebase';

function Nav() {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      window.scrollY > 100 ? handleShow(true) : handleShow(false);
    });
    return () => {
      window.removeEventListener('scroll', () => {
        window.scrollY < 100 ? handleShow(false) : handleShow(true);
      });
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
      {/* <img
        src="https://lh3.googleusercontent.com/ogw/ADGmqu8lSzgrVkMbbdk8_mmqslEyOvIVbGTdCdNfYawi=s83-c-mo"
        alt=""
        className="nav__avatar"
        onClick={() => {
          signOut();
        }}
      /> */}
    </div>
  );
}

export default Nav;
