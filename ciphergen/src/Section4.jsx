import React from "react";
import "./Section4.css";

function About() {
  return (
    <div className="binary-section">
      <div class="overlay-content">
        <div class="content-box">
          <h2>About CipherGen</h2>
          <p>
            CipherGen is a secure, user-friendly password generator designed to
            help you create strong, random, and unique passwords instantly.
            Whether you're protecting personal data or securing work accounts,
            CipherGen ensures your credentials stay one step ahead of cyber
            threats.
          </p>
        </div>

        <div class="content-box">
          <h2>Our Mission</h2>
          <p>
            At CipherGen, our mission is to promote safer digital habits by
            providing tools that empower users to protect their online
            identities. Inspired by the principles of encryption and decryption,
            we believe in transforming simple inputs into secure, unpredictable
            outputs just like strong passwords.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
