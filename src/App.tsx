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
