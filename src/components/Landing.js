import React from 'react';
import '../styles/Landing.css';

import { signInWithGoogle } from '../utils/firebase';

function Landing() {
  return (
    <section className="landing">
      <nav>
        <div>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="logo"
            className="landing__logo"
          />
        </div>
        <button onClick={() => signInWithGoogle()} className="landing__button">
          <span>Sign In</span>
        </button>
      </nav>

      <main>
        <section className="landing__message">
          <p id="big-text">Unlimited movies, TV shows and more.</p>
          <p id="small-text">Watch anywhere. Cancel anytime</p>
          <p id="smaller-text">
            Ready to watch? Enter your email to create or restart your
            membership.
          </p>
          <div className="landing__button-bar">
            <input
              className="landing__email"
              placeholder="Email address..."
              type="text"
            />
            <button className="landing__get-started">
              <span>GET STARTED </span>
            </button>
          </div>
        </section>
      </main>
    </section>
  );
}

export default Landing;
