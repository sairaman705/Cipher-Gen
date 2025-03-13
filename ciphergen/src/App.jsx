import React, { useState, useEffect} from "react";
import "./App.css";

const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [activeTab, setActiveTab] = useState("password");
  const [settings, setSettings] = useState({
    lowercase: true, // Default enabled
    uppercase: false,
    numbers: false,
    symbols: false,
    includeSpaces: false,
    excludeDuplicate: false,
  });

  const generatePassword = () => {
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";
    const symbolChars = "!@$%^&*()_+~`|}{[]:;?><,./-=";
    let allChars = lowercaseChars; // Ensure lowercase is always included

    if (settings.uppercase) allChars += uppercaseChars;
    if (settings.numbers) allChars += numberChars;
    if (settings.symbols) allChars += symbolChars;
    if (settings.includeSpaces) allChars += " ";

    let generatedPassword = "";
    const usedChars = new Set();

    for (let i = 0; i < length; i++) {
      let randomChar = allChars.charAt(Math.floor(Math.random() * allChars.length));

      if (settings.excludeDuplicate) {
        while (usedChars.has(randomChar)) {
          randomChar = allChars.charAt(Math.floor(Math.random() * allChars.length));
        }
        usedChars.add(randomChar);
      }
      generatedPassword += randomChar;
    }
    console.log("Generated Password:", generatedPassword);
    setPassword(generatedPassword);
  };

  useEffect(()=>{
    generatePassword();
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    alert("Password copied to clipboard!");
  };

  const getStrengthColor = () => {
    if (length <= 10) return "red";
    if (length <= 20) return "yellow";
    return "green";
  };

  return (
    <div className="generator-container">
      {/* Tabs */}
      <div className="tabs">
        <button className={`tab ${activeTab === "password" ? "active" : ""}`} onClick={() => setActiveTab("password")}>
          <i className="bx bx-lock"></i> Random
        </button>
        <button className={`tab ${activeTab === "paraphrase" ? "active" : ""}`} onClick={() => setActiveTab("paraphrase")}>
          <i className="bx bx-bulb"></i> Memorable
        </button>
      </div>

      {activeTab === "password" && (
        <div className="password-generator">
          <div className="input-box">
            <input type="text" value={password} disabled />
            <span className="material-symbols-rounded" onClick={copyToClipboard}>
              <i className="bx bx-copy"></i>
            </span>
          </div>

          <div className="pass-indicator" style={{ backgroundColor: getStrengthColor() }}></div>

          <div className="pass-length">
            <label>Password Length: {length}</label>
            <input type="range" min="1" max="30" value={length} onChange={(e) => setLength(Number(e.target.value))} />
          </div>

          <div className="pass-settings">
            <label>Password Settings</label>
            <ul className="options">
              {Object.keys(settings).map((key) => (
                <li key={key} className="option">
                  <input
                    type="checkbox"
                    id={key}
                    checked={settings[key]}
                    onChange={() =>
                      setSettings((prev) => ({
                        ...prev,
                        [key]: key === "lowercase" ? true : !prev[key], // Ensure lowercase is always checked
                      }))
                    }
                    disabled={key === "lowercase"}
                  />
                  <label className="options_headings" htmlFor={key}>
                    {key.replace(/([A-Z])/g, " $1")}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <br /> <br />

          <button className="generate-btn" onClick={generatePassword}>
            Generate Password
          </button>
        </div>
      )}

      {activeTab === "paraphrase" && (
        <div className="paraphrase-generator">
          <input type="range" min="3" max="10" value="4" id="charRange" />
          <span id="length-value">4</span>

          <label>
            <input type="checkbox" id="capitalize-toggle" /> Capitalize the first letter
          </label>

          <input type="text" id="generated-sentence" readOnly className="generated-input" value="Click Refresh to Generate" />

          <button id="copy-sentence">Copy Sentence</button>
          <button id="refresh-sentence">Refresh Sentence</button>
        </div>
      )}
    </div>
  );
};

export default PasswordGenerator;
