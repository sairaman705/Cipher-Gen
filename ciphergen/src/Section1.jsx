import React, { useState, useEffect, useRef } from "react";
import {generateCustomSentence} from "./Utils/customSentenceGenerator";
import { toast } from "react-toastify";
import CryptoJS from "crypto-js";
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

  const [sentence, setSentence] = useState("Click Refresh to Generate");
  const [sentenceLength, setSentenceLength] = useState(4);
  const [capitalizeFirstLetter, setCapitalizeFirstLetter] = useState(false);

  // encryption decryption states :-
  const [inputText, setInputText] = useState("");
  const [keyValue, setKeyValue] = useState("");
  const [encFileName, setencFileName] = useState("");
  const [decFileName, setdecFileName] = useState("");
  const [decryptedPassword, setDecryptedPassword] = useState("");

  // Function to generate a random memorable sentence
  const generateSentence = () => {
    let newSentence = generateCustomSentence(sentenceLength);

    // Convert to array of words, remove punctuation, and join with "-"
    let formattedSentence = newSentence
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "") // remove punctuation
      .trim()
      .split(/\s+/)
      .join("-");

      if (capitalizeFirstLetter) {
        formattedSentence =
          formattedSentence.charAt(0).toUpperCase() + formattedSentence.slice(1);
      }

    setSentence(formattedSentence);
  };

  // Function to handle range change
  const handleRangeChange = (e) => {
    setSentenceLength(Number(e.target.value));
    generateSentence();
  };

  // Function to copy the sentence to clipboard
  const copySentence = () => {
    if (!sentence || sentence === "Click Refresh to Generate") {
      toast.error("Nothing To Copy", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    navigator.clipboard.writeText(sentence);
    toast.success("Password copied to clipboard!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
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
    toast.success("Password copied to clipboard!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const getStrengthColor = () => {
    if (length <= 10) return "red"; 
    if (length < 16) return "yellow";
    return "green";
  };

  const sliderRef = useRef(null);

  // generate key and save
  const generateKey = () => {
    const key = CryptoJS.lib.WordArray.random(16).toString(); // 128-bit key
    const blob = new Blob([key], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.href = URL.createObjectURL(blob);

    // Ensure filename ends with `.key`
    const fileName = encFileName.trim().endsWith(".key")
      ? encFileName.trim()
      : `${encFileName.trim()}.key`;

    link.download = fileName;
    link.click();
  };

  // load key
  const loadKey = (event) => {
    const file = event.target.files[0];
    if (file && file.name.endsWith(".key")) {
      const reader = new FileReader();
      reader.onload = (e) => setKeyValue(e.target.result.trim());
      reader.readAsText(file);
    } else {
      alert("Please select a valid .key file");
    }
  };

  // encrypt and save password
  const encryptAndSave = () => {

    if (!keyValue) {
      toast.error("Please load a key first.", { position: "top-right", theme: "colored" });
      return;
    }

    if (!keyValue) return alert("Please load a key first.");
    const encrypted = CryptoJS.AES.encrypt(inputText, keyValue).toString();
    const blob = new Blob([encrypted], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = encFileName || "encrypted.txt";
    link.click();

    toast.success("Password encrypted and saved successfully!", {
      position: "top-right",
      autoClose: 2000,
      theme: "light",
    });


  };

  // decrypt password

  const decryptFile = async (e) => {
    const file = e.target.files[0];
    if (!file || !keyValue) {
      toast.error("Encrypted file or key is missing", { position: "top-right", theme: "colored" });
      return;
    }
  
    const reader = new FileReader();
  
    reader.onload = (event) => {
      try {
        const encryptedData = event.target.result;
        const bytes = CryptoJS.AES.decrypt(encryptedData, keyValue);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  
        if (!decrypted) {
          toast.error("Decryption failed. Wrong key?", {
            position: "top-right",
            theme: "colored",
          });
        } else {
          setDecryptedPassword(decrypted);
          toast.success("Password decrypted successfully!", {
            position: "top-right",
            autoClose: 2000,
            theme: "light",
          });
        }
      } catch (error) {
        toast.error("Error while decrypting: " + error.message, {
          position: "top-right",
          theme: "colored",
        });
      }
    };
  
    reader.readAsText(file);
  };

// const decryptPassword = () => {
//   try {
//     if (!encryptAndSave || !secretKey) {
//       alert("Encrypted password or secret key is missing.");
//       return;
//     }

//     const bytes = CryptoJS.AES.decrypt(encryptAndSave, secretKey);
//     const decrypted = bytes.toString(CryptoJS.enc.Utf8);

//     if (!decrypted) {
//       alert("Decryption failed. Possible reasons: wrong key or corrupted data.");
//     } else {
//       setDecryptedPassword(decrypted);
//     }
//   } catch (error) {
//     alert("Decryption error: " + error.message);
//   }
// };
  

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
            create strong password to guard <br />
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
            <button
              className={`tab ${activeTab === "cryptify" ? "active" : ""}`}
              onClick={() => setActiveTab("cryptify")}
            >
              <i class="bx bx-hide"></i> Cryptify
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
                <button
                  className="cpy-btn"
                  onClick={copySentence}
                  disabled={
                    !sentence || sentence === "Click Refresh to Generate"
                  }
                >
                  Copy Sentence
                </button>
                <button className="rf-btn" onClick={generateSentence}>
                  Refresh Sentence
                </button>
              </div>
            </div>
          )}

          {activeTab === "cryptify" && (
            <div className="encrypt-decrypt-tab">
              <div>
                <input
                  className="crypto-input-box"
                  type="text"
                  placeholder="Paste Your Password"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
              </div>
              <div className="gen-load-key">
                <div className="generate-key">
                  <input
                    className=""
                    type="text"
                    placeholder="Filename.key"
                    value={encFileName}
                    onChange={(e) => setencFileName(e.target.value)}
                  />
                </div>
                <div className="gen-load-key-btn">
                  <button onClick={generateKey}>Generate Key</button>
                  <div className="load-file">
                    <p>Load Key</p>
                    <input className="load-inpt" type="file" accept=".key" onChange={loadKey} />
                  </div>
                </div>
              </div>
              <div className="enc-pwd">
                <input
                  type="text"
                  placeholder="Encrypted filename.txt"
                  onChange={(e) => setencFileName(e.target.value)}
                />
                <button className="enc-btn" onClick={encryptAndSave}>Encrypt</button>
              </div>

              <div className="dec-file">
                <p>Select File For Decrypt</p>
                <input className="dec-inpt" type="file" accept=".txt" onChange={decryptFile} />
              </div>
              <div className="dec-pwd">
                <input
                  className="dec-txt"
                  type="text"
                  value={decryptedPassword}
                  onChange={(e) => setdecFileName(e.target.value)}
                  placeholder="Decrypted Password"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PasswordGenerator;
