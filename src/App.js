import "./App.css";
import Nationality from "./components/Nationality";
import Age from "./components/Age";
import Gender from "./components/Gender";

import { useState, useRef, useEffect } from "react";

function App() {
  const [name, setName] = useState(""); // state created for user input

  const inputRef = useRef(); //useRef initialized
  //useRef hook used to auto-focus on an input field
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="App">
      <h1>Check your predicted Nationality and Estimated Age</h1>
      <input
        ref={inputRef}
        placeholder="Please enter your name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        name={name}
        type="text"
        aria-required
      />
      <br />
      <br />
      <br />
      <Nationality name={name} />
      <Age name={name} />
      <Gender name={name} />
    </div>
  );
}

export default App;
