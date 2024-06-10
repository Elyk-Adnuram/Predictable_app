import "./App.css";
import CustomizedButtons from "./components/Button";
import { useState, useRef, useEffect } from "react";
import * as React from "react";
import SimpleAlert from "./components/SimpleAlert";

function App() {
  const [name, setName] = useState(""); // state created for user input

  const [ageInfo, setAgeInfo] = useState("");
  const [genderInfo, setGenderInfo] = useState("");
  const [nationalityInfo, setNationalityInfo] = useState({
    country_id: "",
    probability: "",
  });
  const inputRef = useRef(); //useRef initialized
  //useRef hook used to auto-focus on an input field
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  //regex to ensure user only enters letters before making API call
  const isNameValid = (name) => {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(name);
  };

  // Perform API calls to fetch data
  const fetchData = async () => {
    if (!name || !isNameValid(name) || name.trim().length === 0) {
      <SimpleAlert />;
      alert("Please enter a valid name");
      return;
    }
    //used Promise.all to fetch all the data at once
    try {
      const [nationalityRes, ageRes, genderRes] = await Promise.all([
        fetch(`https://api.nationalize.io?name=${encodeURIComponent(name)}`),
        fetch(`https://api.agify.io?name=${encodeURIComponent(name)}`),
        fetch(`https://api.genderize.io?name=${encodeURIComponent(name)}`),
      ]);
      //used destructuring to assign the data from the API responses to variables
      const [nationalityData, ageData, genderData] = await Promise.all([
        nationalityRes.json(),
        ageRes.json(),
        genderRes.json(),
      ]);

      setNationalityInfo(nationalityData.country[0]);
      setAgeInfo(JSON.stringify(ageData.age));
      setGenderInfo(JSON.stringify(genderData.gender));
      setName("");
    } catch (error) {
      console.error("An error has occurred: ", error.message);
    }
  };

  return (
    <div className="App">
      <h1 className="header">Predictable</h1>
      <h3>Enter your name and we will predict your nationality, age and gender.</h3>
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

      <CustomizedButtons handleClick={fetchData} buttonName="Go For It!" />
      {nationalityInfo && ageInfo && genderInfo && (
        <div className="output">
          <p>
            Based on the name entered, there is a{" "}
            {Math.round(Number(nationalityInfo.probability) * 100)} percent probability that your
            nationality is {JSON.stringify(nationalityInfo.country_id)}
          </p>
          <p>Your predicted gender is: {genderInfo}</p>
          <p>Your estimated AGE is: {ageInfo}</p>
        </div>
      )}
    </div>
  );
}

export default App;
