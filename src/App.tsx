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
