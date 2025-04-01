import React, { useState, useEffect, useRef } from "react";
import randomSentence from "random-sentence";
import "./Section1.css";


const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [activeTab, setActiveTab] = useState("password");
  const [settings, setSettings] = useState({
    lowercase: true,
    uppercase: false,
    numbers: false,
    symbols: false,
    includeSpaces: false,
    excludeDuplicate: false,
  });

  // memorable - password states:-
  const [sentence, setSentence] = useState("Click Refresh to Generate");
  const [sentenceLength, setSentenceLength] = useState(4);
  const [capitalizeFirstLetter, setCapitalizeFirstLetter] = useState(false);

  // Function to generate a random memorable sentence
  const generateSentence = () => {
    let newSentence = randomSentence({ words: sentenceLength });
    if (capitalizeFirstLetter) {
      newSentence = newSentence.charAt(0).toUpperCase() + newSentence.slice(1);
    }
    setSentence(newSentence);
  };

  // Function to handle range change
  const handleRangeChange = (e) => {
    setSentenceLength(Number(e.target.value));
    generateSentence();
  };

  // Function to copy the sentence to clipboard
  const copySentence = () => {
    navigator.clipboard.writeText(sentence);
    alert("Sentence copied to clipboard!");
  };

  const generatePassword = () => {
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";
    const symbolChars = "!@$%^&*()_+~`|}{[]:;?><,./-=";
    let allChars = lowercaseChars;

    if (settings.uppercase) allChars += uppercaseChars;
    if (settings.numbers) allChars += numberChars;
    if (settings.symbols) allChars += symbolChars;
    if (settings.includeSpaces) allChars += " ";

    let generatedPassword = "";
    const usedChars = new Set();

    for (let i = 0; i < length; i++) {
      let randomChar = allChars.charAt(
        Math.floor(Math.random() * allChars.length)
      );

      if (settings.excludeDuplicate) {
        while (usedChars.has(randomChar)) {
          randomChar = allChars.charAt(
            Math.floor(Math.random() * allChars.length)
          );
        }
        usedChars.add(randomChar);
      }
      generatedPassword += randomChar;
    }
    console.log("Generated Password:", generatedPassword);
    setPassword(generatedPassword);
  };

  useEffect(() => {
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

  const sliderRef = useRef(null);

  useEffect(() => {
    const updateSlider = () => {
      if (sliderRef.current) {
        const activeTabButton = document.querySelector(`.tab.active`);
        if (activeTabButton) {
          sliderRef.current.style.width = `${activeTabButton.offsetWidth}px`;
          sliderRef.current.style.transform = `translateX(${activeTabButton.offsetLeft}px)`;
        }
      }
    };

    // Initial update when the component mounts
    updateSlider();

    // Update whenever the activeTab changes
    // it will prevent the default width to be too large.
    const resizeObserver = new ResizeObserver(() => {
      updateSlider();
    });

    const tabContainer = document.querySelector(".tabs");
    if (tabContainer) {
      resizeObserver.observe(tabContainer);
    }

    return () => {
      if (tabContainer) {
        resizeObserver.unobserve(tabContainer);
      }
    };
  }, [activeTab]);

  return (
    <>
      <div className="main-container">
        <div className="main-content">
          <h1>
            Encrypt. Decrypt. Secure. Generate your ultimate password now!
          </h1>
          <p>
            creaft strong password to guard <br />
            your digital world.
          </p>
        </div>
        <div className="generator-container">
          <div className="tabs">
            <button
              className={`tab ${activeTab === "password" ? "active" : ""}`}
              onClick={() => setActiveTab("password")}
            >
              <i className="bx bx-lock"></i> Random
            </button>
            <button
              className={`tab ${activeTab === "paraphrase" ? "active" : ""}`}
              onClick={() => setActiveTab("paraphrase")}
            >
              <i className="bx bx-bulb"></i> Memorable
            </button>
            <div ref={sliderRef} className="tab-slider"></div>
          </div>

          {activeTab === "password" && (
            <div className="password-generator">
              <div className="input-box">
                <input type="text" value={password} disabled />
                <span
                  className="material-symbols-rounded"
                  onClick={copyToClipboard}
                >
                  <i className="bx bx-copy"></i>
                </span>
              </div>
              <div
                className="pass-indicator"
                style={{ backgroundColor: getStrengthColor() }}
              ></div>
              <div className="pass-length">
                <label>Password Length: {length}</label>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={length}
                  onChange={(e) => setLength(Number(e.target.value))}
                />
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
                            [key]: key === "lowercase" ? true : !prev[key],
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
              <div className="range-character">
                <p>Characters</p>
                <input
                  type="range"
                  min="3"
                  max="10"
                  value={sentenceLength}
                  id="charRange"
                  onChange={handleRangeChange}
                />
                <span>{sentenceLength}</span>
              </div>

              <label>
                <input
                  type="checkbox"
                  checked={capitalizeFirstLetter}
                  onChange={() =>
                    setCapitalizeFirstLetter(!capitalizeFirstLetter)
                  }
                />
                Capitalize the first letter
              </label>

              <input
                type="text"
                readOnly
                className="generated-input"
                value={sentence}
              />
 
              <div className="memorable-btns">
                <button className="cpy-btn" onClick={copySentence}>Copy Sentence</button>
                <button className="rf-btn" onClick={generateSentence}>Refresh Sentence</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PasswordGenerator;
