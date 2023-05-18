import React from "react";
import { useState, useEffect, useRef } from "react";

const Nationality = () => {
  const [name, setName] = useState(""); // state created for user input
  // state created to display API data as an object to cater for the different properties returned from api
  const [nationalityInfo, setNationalityInfo] = useState({
    country_id: "",
    probability: "",
  });

  const inputRef = useRef(); //useRef initialized

  //useRef hook used to auto-focus on an input field
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  //function to obtain data from API
  async function fetchData() {
    const res = await fetch(`https://api.nationalize.io?name=${name}`);
    const data = await res.json();
    setNationalityInfo(data.country[0]); // setNationality will set the state for displaying the API data
  }

  return (
    <>
      <h1>Check your estimated Nationality</h1>
      <input
        ref={inputRef}
        placeholder="Please enter your name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        name={name}
      />
      {/* onclick event handler for fetchData function */}
      <button onClick={fetchData}>Submit</button>

      <p>Your estimated nationality is: {JSON.stringify(nationalityInfo.country_id)}</p>
      <p>The probability is: {JSON.stringify(nationalityInfo.probability)}</p>
    </>
  );
};

export default Nationality;
