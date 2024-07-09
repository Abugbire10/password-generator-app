import React, { useState } from "react";
import "./App.css"; // Assuming you have a styles.css file for your CSS

const App: React.FC = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(0);
  const [uppercase, setUppercase] = useState(false);
  const [lowercase, setLowercase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const [strengthLabel, setStrengthLabel] = useState("");
  const [strengthClasses, setStrengthClasses] = useState<string[]>([
    "strip",
    "strip",
    "strip",
    "strip",
  ]);
 const handleLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLength(parseInt(e.target.value));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    switch (id) {
      case "uppercase":
        setUppercase(checked);
        break;
      case "lowercase":
        setLowercase(checked);
        break;
      case "numbers":
        setNumbers(checked);
        break;
      case "symbols":
        setSymbols(checked);
        break;
      default:
        break;
    }
  };
const generatePassword = () => {
    // Check if any checkbox is selected and length is set
    if ((!uppercase && !lowercase && !numbers && !symbols) || length === 0) {
      alert(
        "Please select at least one character type and set the password length."
      );
      return;
    }
const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+~|}{[]:;?><,./-=";

    let charPool = "";
    if (uppercase) charPool += upperChars;
    if (lowercase) charPool += lowerChars;
    if (numbers) charPool += numberChars;
    if (symbols) charPool += symbolChars;

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      newPassword += charPool.charAt(
        Math.floor(Math.random() * charPool.length)
      );
    }
    setPassword(newPassword);
    updateStrength(newPassword);
  };

const copyToClipboard = () => {
    if (password.length === 0) {
      alert("Please generate a password first.");
      return;
    }
    const textField = document.createElement("textarea");
    textField.innerText = password;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    alert("Password copied to clipboard");
  };

  const updateStrength = (password: string) => {
    let strength = 0;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    if (password.length >= 8) strength++;

    if (strength < 2) {
      setStrengthLabel("TOO WEAK!");
      setStrengthClasses([
        "strip weak",
        "strip inactive",
        "strip inactive",
        "strip inactive",
      ]);
} else if (strength < 3) {
      setStrengthLabel("WEAK");
      setStrengthClasses([
        "strip weak",
        "strip weak",
        "strip inactive",
        "strip inactive",
      ]);
    } else if (strength < 4) {
      setStrengthLabel("MEDIUM");
      setStrengthClasses([
        "strip medium",
        "strip medium",
        "strip medium",
        "strip inactive",
      ]);
    } else {
      setStrengthLabel("STRONG");
      setStrengthClasses([
        "strip strong",
        "strip strong",
        "strip strong",
        "strip strong",
      ]);
    }
  };

   return (
    <div className="container">
      <h3>Password Generator</h3>
      <div className="password-output">
        <input type="text" id="password" readOnly value={password} />
        <button id="copy" title="Copy to clipboard" onClick={copyToClipboard}>
          <svg width="21" height="24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20.341 3.091 17.909.659A2.25 2.25 0 0 0 16.319 0H8.25A2.25 2.25 0 0 0 6 2.25V4.5H2.25A2.25 2.25 0 0 0 0 6.75v15A2.25 2.25 0 0 0 2.25 24h10.5A2.25 2.25 0 0 0 15 21.75V19.5h3.75A2.25 2.25 0 0 0 21 17.25V4.682a2.25 2.25 0 0 0-.659-1.591ZM12.469 21.75H2.53a.281.281 0 0 1-.281-.281V7.03a.281.281 0 0 1 .281-.281H6v10.5a2.25 2.25 0 0 0 2.25 2.25h4.5v1.969a.282.282 0 0 1-.281.281Zm6-4.5H8.53a.281.281 0 0 1-.281-.281V2.53a.281.281 0 0 1 .281-.281H13.5v4.125c0 .621.504 1.125 1.125 1.125h4.125v9.469a.282.282 0 0 1-.281.281Zm.281-12h-3v-3h.451c.075 0 .147.03.2.082L18.667 4.6a.283.283 0 0 1 .082.199v.451Z"
              fill="#A4FFAF"
            />
          </svg>
        </button>
      </div>
      <div className="options">
        <div className="character">
          <label htmlFor="length">Character Length</label>
          <span id="length-value">{length}</span>
        </div>
        <input
          type="range"
          id="length"
          min="1"
          max="20"
          value={length}
          onChange={handleLengthChange}
        />
