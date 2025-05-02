import React from "react";
import "./Section2.css";

function Section2() {
  return (
    <div className="section2-container">
      <h1>What makes a password unbreakable?</h1>
      <div className="card-row">
        <div className="card-headings">
          <div className="card-top">
            <p>
            Length <br /> Matters 
            </p>
          </div>
          <div className="card-body">
            <p>
            Our password generator creates longer passwords that are significantly harder to crack, ensuring maximum security for your accounts.
            </p>
          </div>
        </div>
        <div className="card-headings">
          <div className="card-top">
            <p>
            Complexity is key
            </p>
          </div>
          <div className="card-body">
            <p>
            Our password generator creates complex passwords with a mix of letters, numbers, and symbols for better security.
            </p>
          </div>
        </div>
        <div className="card-headings">
          <div className="card-top">
            <p>
            Every Password is Unique
            </p>
          </div>
          <div className="card-body">
            <p>
            For maximum safety, our tool generates unique passwords for each account, ensuring no two share the same credentials.
            </p>
          </div>
        </div>
        <div className="card-headings">
          <div className="card-top">
            <p>
            Randomness Wins
            </p>
          </div>
          <div className="card-body">
            <p>
            Each password we generate is entirely random, making it nearly impossible for attackers to guess or predict.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section2;
