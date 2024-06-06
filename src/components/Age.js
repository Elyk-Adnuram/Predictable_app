import React from "react";
import { useState } from "react";
import CustomizedButtons from "./Button";
const Age = ({ name }) => {
  // state created to display API data as an object to cater for the different properties returned from api
  const [ageInfo, setAgeInfo] = useState("");

  //function to obtain data from API
  async function fetchAgeData() {
    try {
      if (name !== "") {
        const res = await fetch(`https://api.agify.io?name=${name}`);
        const data = await res.json();
        setAgeInfo(data); // setNationality will set the state for displaying the API data
        console.log(ageInfo);
      } else {
        alert("Please enter a surname");
      }
    } catch (err) {
      console.log("An error has occurred: " + err.message);
    }
  }

  return (
    <>
      <CustomizedButtons onClick={fetchAgeData} buttonName="Estimate Age" />

      <p>Your estimated AGE is: {}</p>
      <p>The probability is: {}</p>
    </>
  );
};

export default Age;
